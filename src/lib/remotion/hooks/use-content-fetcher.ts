import { useState, useEffect, useCallback } from 'react';
import { RemotionContentFetcher } from '../content-fetcher';
import type { VideoContent } from '../../url-parser/types';
import { validateUrl } from '../../website-preview/utils';

interface UseFetchContentOptions {
  timeout?: number;
  retries?: number;
  autoFetch?: boolean;
  useCache?: boolean;
  onProgress?: (progress: number) => void;
}

export function useContentFetcher(url: string | null, options: UseFetchContentOptions = {}) {
  const [content, setContent] = useState<VideoContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  const fetchContent = useCallback(async () => {
    if (!url || !validateUrl(url)) {
      setError(new Error('Invalid URL'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const fetcher = RemotionContentFetcher.getInstance();
      const result = await fetcher.fetchContent(url, {
        timeout: options.timeout,
        retries: options.retries,
        useCache: options.useCache,
        onProgress: (p) => {
          setProgress(p);
          options.onProgress?.(p);
        }
      });
      setContent(result);
    } catch (err) {
      console.error('Content fetch error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch content'));
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  }, [url, options]);

  useEffect(() => {
    if (options.autoFetch && url) {
      fetchContent();
    }

    return () => {
      RemotionContentFetcher.getInstance().cancelAllFetches();
    };
  }, [url, options.autoFetch, fetchContent]);

  return {
    content,
    isLoading,
    error,
    progress,
    fetchContent,
  };
}