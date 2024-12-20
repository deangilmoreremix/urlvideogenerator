import { useState, useCallback } from 'react';
import { VideoService } from '../lib/video/video-service';
import type { ProcessingOptions } from '../lib/video/types';

interface UseVideoProcessorOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
  onProgress?: (progress: number) => void;
}

export function useVideoProcessor(options: UseVideoProcessorOptions = {}) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const processVideo = useCallback(async (inputUrl: string, processingOptions?: ProcessingOptions) => {
    if (!inputUrl) {
      setError('Please enter a valid video URL');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      // Initialize FFmpeg service
      const ffmpeg = FFmpegService.getInstance();
      await ffmpeg.init();

      const videoService = VideoService.getInstance();
      const result = await videoService.processVideo(inputUrl, {
        ...processingOptions,
        onProgress: (p) => {
          setProgress(p);
          options.onProgress?.(p);
        }
      });

      if (!result.success || !result.url) {
        throw new Error(result.error || 'Failed to process video');
      }

      setUrl(result.url);
      options.onSuccess?.(result.url);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Video processing failed: ${err.message}`
        : 'Failed to process video';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [options]);

  return {
    url,
    loading,
    error,
    progress,
    processVideo
  };
}