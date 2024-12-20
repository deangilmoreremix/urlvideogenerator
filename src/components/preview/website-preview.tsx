import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { WebsiteComposition } from './website-composition';
import { LoadingSpinner } from '../ui/loading-spinner';
import { ErrorMessage } from '../ui/error-message';
import { parseUrl } from '../../lib/url-parser';
import type { VideoContent } from '../../lib/url-parser/types';

interface WebsitePreviewProps {
  url: string;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<VideoContent | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await parseUrl(url);
        
        if (!isMounted) return;

        if (!result.success || !result.content) {
          throw new Error(result.error || 'Failed to load content');
        }

        setContent(result.content);
      } catch (err) {
        if (!isMounted) return;
        console.error('Preview error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load preview');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (url) {
      loadContent();
    }

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!content) {
    return null;
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
      <Player
        component={WebsiteComposition}
        durationInFrames={300}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{
          width: '100%',
          height: '100%',
        }}
        controls
        loop
        inputProps={{ content }}
      />
    </div>
  );
};