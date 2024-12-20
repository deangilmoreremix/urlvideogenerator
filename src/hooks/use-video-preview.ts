import { useState, useCallback } from 'react';
import { VideoProcessor } from '../lib/video/video-processor';

interface UseVideoPreviewOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

export function useVideoPreview(options: UseVideoPreviewOptions = {}) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const processVideo = useCallback(async (inputUrl: string) => {
    if (!inputUrl) {
      setError('Please enter a valid video URL');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const processor = VideoProcessor.getInstance();
      const processedUrl = await processor.processVideo(inputUrl);
      
      setProgress(100);
      setUrl(processedUrl);
      options.onSuccess?.(processedUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process video';
      setError(errorMessage);
      options.onError?.(err as Error);
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