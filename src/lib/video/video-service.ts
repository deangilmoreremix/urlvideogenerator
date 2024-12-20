import { VideoProcessor } from './video-processor';
import { FFmpegService } from './ffmpeg-service';
import { YtDlpService } from './yt-dlp-service';
import { validateUrl } from '../utils';
import type { ProcessingOptions, VideoResult } from './types';

export class VideoService {
  private static instance: VideoService;
  private processor: VideoProcessor;
  private ffmpeg: FFmpegService;
  private ytdlp: YtDlpService;

  private constructor() {
    this.processor = VideoProcessor.getInstance();
    this.ffmpeg = FFmpegService.getInstance();
    this.ytdlp = YtDlpService.getInstance();
  }

  static getInstance(): VideoService {
    if (!this.instance) {
      this.instance = new VideoService();
    }
    return this.instance;
  }

  async processVideo(url: string, options?: ProcessingOptions): Promise<VideoResult> {
    if (!validateUrl(url)) {
      return {
        success: false,
        error: 'Invalid URL provided'
      };
    }

    try {
      options?.onProgress?.(10);

      // Get video info and direct URL
      const info = await this.ytdlp.getVideoInfo(url);
      if (!info.success) {
        throw new Error(info.error || 'Failed to get video info');
      }

      options?.onProgress?.(30);

      const directUrl = await this.ytdlp.getDirectVideoUrl(url);
      options?.onProgress?.(50);

      // Process video with FFmpeg
      const processedUrl = await this.ffmpeg.transcodeToMp4(directUrl, {
        quality: options?.quality,
        onProgress: (progress) => {
          options?.onProgress?.(50 + progress * 0.5);
        }
      });

      options?.onProgress?.(100);

      return {
        success: true,
        url: processedUrl,
        info
      };
    } catch (error) {
      console.error('Video processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process video'
      };
    }
  }
}