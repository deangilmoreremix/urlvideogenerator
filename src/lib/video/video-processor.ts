import { FFmpegService } from './ffmpeg-service';
import { YtDlpService } from './yt-dlp-service';
import { validateUrl } from '../utils';
import type { ProcessingOptions } from './types';

export class VideoProcessor {
  private static instance: VideoProcessor;
  private ffmpeg = FFmpegService.getInstance();
  private ytdlp = YtDlpService.getInstance();
  private processingCallbacks = new Map<string, (progress: number) => void>();

  private constructor() {}

  static getInstance(): VideoProcessor {
    if (!this.instance) {
      this.instance = new VideoProcessor();
    }
    return this.instance;
  }

  async processVideo(url: string, options?: ProcessingOptions): Promise<string> {
    if (!validateUrl(url)) {
      throw new Error('Invalid URL provided');
    }

    try {
      const processId = Math.random().toString(36).slice(2);
      if (options?.onProgress) {
        this.processingCallbacks.set(processId, options.onProgress);
      }

      options?.onProgress?.(10);

      // Get video info and direct URL
      const info = await this.ytdlp.getVideoInfo(url);
      if (!info.success) {
        throw new Error(info.error || 'Failed to get video info');
      }

      options?.onProgress?.(30);

      const directUrl = await this.ytdlp.getDirectVideoUrl(url);
      options?.onProgress?.(50);
      
      // Transcode video
      const result = await this.ffmpeg.transcodeToMp4(directUrl, {
        format: options?.format || 'mp4',
        quality: options?.quality || 720,
        onProgress: (progress) => {
          options?.onProgress?.(50 + (progress * 0.5));
        }
      });

      options?.onProgress?.(100);
      return result;
    } catch (error) {
      console.error('Video processing error:', error);
      throw error;
    } finally {
      this.processingCallbacks.delete(processId);
    }
  }
}