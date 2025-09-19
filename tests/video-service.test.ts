import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { YtDlpService } from '../src/lib/video/yt-dlp-service';
import { VideoDownloader } from '../src/lib/video/video-downloader';
import { VideoService } from '../src/lib/video/video-service';
import { FFmpegService } from '../src/lib/video/ffmpeg-service';

vi.mock('@ffmpeg/ffmpeg/dist/ffmpeg.mjs', () => ({
  createFFmpeg: () => ({
    load: async () => {},
    FS: () => {},
    run: async () => {}
  })
}));

vi.mock('@ffmpeg/util', () => ({
  fetchFile: async () => new Uint8Array()
}));

const resetSingleton = (klass: unknown) => {
  Reflect.set(klass as Record<string, unknown>, 'instance', undefined);
};

const originalFetch = globalThis.fetch;
const hadWindow = 'window' in globalThis;
const originalWindow = hadWindow ? (globalThis as Record<string, unknown>).window : undefined;

const restoreGlobals = () => {
  if (originalFetch) {
    globalThis.fetch = originalFetch;
  } else {
    delete (globalThis as Record<string, unknown>).fetch;
  }

  if (hadWindow) {
    (globalThis as Record<string, unknown>).window = originalWindow;
  } else {
    delete (globalThis as Record<string, unknown>).window;
  }
};

describe('YtDlpService.getDirectVideoUrl', () => {
  beforeEach(() => {
    restoreGlobals();
    resetSingleton(YtDlpService);
    vi.restoreAllMocks();
    delete (globalThis as Record<string, unknown>).window;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    restoreGlobals();
    resetSingleton(YtDlpService);
  });

  it('delegates to the backend downloader when running server-side', async () => {
    const mockDownloader = {
      getDirectVideoUrl: vi.fn().mockResolvedValue('https://cdn.example.com/video.mp4')
    } as unknown as VideoDownloader;

    const downloaderSpy = vi
      .spyOn(VideoDownloader, 'getInstance')
      .mockReturnValue(mockDownloader);

    const service = YtDlpService.getInstance();
    const result = await service.getDirectVideoUrl('https://example.com/watch?v=1234');

    expect(result).toBe('https://cdn.example.com/video.mp4');
    expect(mockDownloader.getDirectVideoUrl).toHaveBeenCalledWith('https://example.com/watch?v=1234');
    expect(downloaderSpy).toHaveBeenCalled();
  });

  it('calls the resolver endpoint in the browser and returns the resolved URL', async () => {
    (globalThis as Record<string, unknown>).window = {};

    const mockResponse: Partial<Response> & {
      json: ReturnType<typeof vi.fn>;
      text: ReturnType<typeof vi.fn>;
      clone: ReturnType<typeof vi.fn>;
    } = {
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, url: 'https://cdn.example.com/stream.m3u8' }),
      text: vi.fn().mockResolvedValue(''),
      clone: vi.fn()
    };
    mockResponse.clone.mockReturnValue(mockResponse as Response);

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(mockResponse as Response);

    const service = YtDlpService.getInstance();
    const result = await service.getDirectVideoUrl('https://example.com/video');

    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/video/resolve?url=https%3A%2F%2Fexample.com%2Fvideo',
      expect.objectContaining({ method: 'GET' })
    );
    expect(result).toBe('https://cdn.example.com/stream.m3u8');
  });

  it('throws a descriptive error when the resolver reports a failure', async () => {
    (globalThis as Record<string, unknown>).window = {};

    const mockResponse: Partial<Response> & {
      json: ReturnType<typeof vi.fn>;
      text: ReturnType<typeof vi.fn>;
      clone: ReturnType<typeof vi.fn>;
    } = {
      ok: false,
      status: 502,
      json: vi.fn().mockResolvedValue({ error: 'Resolver service unavailable' }),
      text: vi.fn().mockResolvedValue(''),
      clone: vi.fn()
    };
    mockResponse.clone.mockReturnValue(mockResponse as Response);

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse as Response);

    const service = YtDlpService.getInstance();

    await expect(service.getDirectVideoUrl('https://example.com/video'))
      .rejects.toThrow('Resolver service unavailable');
  });
});

describe('VideoService.processVideo', () => {
  beforeEach(() => {
    resetSingleton(VideoService);
    resetSingleton(YtDlpService);
    resetSingleton(FFmpegService);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    resetSingleton(VideoService);
    resetSingleton(YtDlpService);
    resetSingleton(FFmpegService);
    vi.restoreAllMocks();
  });

  it('returns a successful result when the downloader resolves a direct URL', async () => {
    const mockYtDlp = {
      getVideoInfo: vi.fn().mockResolvedValue({
        success: true,
        url: 'https://example.com/video',
        title: 'Test Video',
        duration: 120,
        thumbnail: 'https://example.com/thumb.jpg'
      }),
      getDirectVideoUrl: vi.fn().mockResolvedValue('https://cdn.example.com/video.mp4')
    } as unknown as YtDlpService;

    const mockFfmpeg = {
      transcodeToMp4: vi.fn().mockResolvedValue('blob:processed')
    } as unknown as FFmpegService;

    vi.spyOn(YtDlpService, 'getInstance').mockReturnValue(mockYtDlp);
    vi.spyOn(FFmpegService, 'getInstance').mockReturnValue(mockFfmpeg);

    const progressSpy = vi.fn();
    const service = VideoService.getInstance();
    const result = await service.processVideo('https://example.com/video', { onProgress: progressSpy });

    expect(result.success).toBe(true);
    expect(result.url).toBe('blob:processed');
    expect(mockYtDlp.getDirectVideoUrl).toHaveBeenCalled();
    expect(mockFfmpeg.transcodeToMp4).toHaveBeenCalledWith('https://cdn.example.com/video.mp4', expect.any(Object));
    expect(progressSpy).toHaveBeenCalled();
  });

  it('propagates downloader errors when resolution fails', async () => {
    const mockYtDlp = {
      getVideoInfo: vi.fn().mockResolvedValue({
        success: true,
        url: 'https://example.com/video',
        title: 'Test Video',
        duration: 120,
        thumbnail: 'https://example.com/thumb.jpg'
      }),
      getDirectVideoUrl: vi.fn().mockRejectedValue(new Error('Unable to resolve stream'))
    } as unknown as YtDlpService;

    const mockFfmpeg = {
      transcodeToMp4: vi.fn()
    } as unknown as FFmpegService;

    vi.spyOn(YtDlpService, 'getInstance').mockReturnValue(mockYtDlp);
    vi.spyOn(FFmpegService, 'getInstance').mockReturnValue(mockFfmpeg);

    const service = VideoService.getInstance();
    const result = await service.processVideo('https://example.com/video');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Unable to resolve stream');
    expect(mockFfmpeg.transcodeToMp4).not.toHaveBeenCalled();
  });
});
