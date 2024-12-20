import { useState, useEffect } from 'react';
import { parseUrl } from '../../url-parser';
import { renderVideo } from '../video-generator';
import type { VideoContent } from '../../url-parser/types';

interface UseVideoPreviewOptions {
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
}

export function useVideoPreview(url: string, options: UseVideoPreviewOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{
    content: VideoContent;
    composition: any;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function generatePreview() {
      try {
        setIsLoading(true);
        setError(null);

        // Parse URL content
        const parseResult = await parseUrl(url);
        if (!parseResult.success || !parseResult.content) {
          throw new Error(parseResult.error || 'Failed to parse URL');
        }

        // Generate video preview
        const renderResult = await renderVideo(parseResult.content, {
          width: options.width || 1920,
          height: options.height || 1080,
          fps: options.fps || 30,
          durationInFrames: options.durationInFrames || 300,
          outputPath: '', // Not needed for preview
        });

        if (!renderResult.success) {
          throw new Error(renderResult.error);
        }

        if (isMounted) {
          setPreview({
            content: parseResult.content,
            composition: renderResult.composition,
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error('Preview generation error:', err);
          setError(err instanceof Error ? err.message : 'Failed to generate preview');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (url) {
      generatePreview();
    }

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { isLoading, error, preview };
}