import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { Globe } from 'lucide-react';
import type { VideoContent } from '../../lib/url-parser/types';
import { useContentFetcher } from '../../lib/remotion/hooks/use-content-fetcher';
import { LoadingSpinner } from '../ui/loading-spinner';
import { ErrorMessage } from '../ui/error-message';

interface WebsiteCompositionProps {
  url: string;
  title: string;
  isProcessing?: boolean;
}

export const WebsiteComposition: React.FC<WebsiteCompositionProps> = ({
  url,
  title,
  isProcessing = false,
}) => {
  const frame = useCurrentFrame();
  const { content, isLoading, error } = useContentFetcher(url, {
    autoFetch: !isProcessing,
    timeout: 30000,
    retries: 3,
  });

  if (isProcessing || isLoading) {
    return (
      <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <LoadingSpinner />
      </AbsoluteFill>
    );
  }

  if (error) {
    return (
      <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <ErrorMessage message={error.message} />
      </AbsoluteFill>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <Sequence from={0} durationInFrames={30}>
        <div
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `scale(${interpolate(frame, [0, 30], [0.8, 1])})`,
          }}
          className="absolute top-0 left-0 right-0 p-8"
        >
          <div className="flex items-center gap-4">
            {content.metadata.favicon ? (
              <img
                src={content.metadata.favicon}
                alt=""
                className="h-10 w-10 rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`;
                }}
              />
            ) : (
              <Globe className="h-10 w-10 text-[#E44E51]" />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {content.metadata.title || title}
              </h2>
              {(content.metadata.description || content.metadata.author) && (
                <p className="text-gray-400">
                  {content.metadata.author && (
                    <span className="text-[#E44E51]">{content.metadata.author} · </span>
                  )}
                  {content.metadata.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Sequence>

      {/* Website Preview */}
      <Sequence from={30}>
        <div
          style={{
            opacity: interpolate(frame - 30, [0, 30], [0, 1]),
            transform: `scale(${interpolate(frame - 30, [0, 30], [0.95, 1])})`,
          }}
          className="absolute top-32 bottom-8 left-8 right-8 rounded-lg border border-gray-800 bg-white overflow-hidden"
        >
          {content.content.media?.[0] ? (
            <img
              src={content.content.media[0]}
              alt={content.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: content.content.html || '' }}
            />
          )}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};