import React, { useEffect, useState } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, IFrame, staticFile, delayRender, continueRender } from 'remotion';
import { Globe, Loader2, AlertCircle } from 'lucide-react';
import { WebsiteFrame } from './website-frame';

interface UrlPreviewCompositionProps {
  url: string;
  title: string;
  isProcessing: boolean;
}

export const UrlPreviewComposition: React.FC<UrlPreviewCompositionProps> = ({
  url,
  title,
  isProcessing
}) => {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender());
  const [websiteContent, setWebsiteContent] = useState<{
    html: string;
    screenshot: string | null;
    metadata: {
      title?: string;
      description?: string;
      image?: string;
      favicon?: string;
    };
  }>({
    html: '',
    screenshot: null,
    metadata: {}
  });

  useEffect(() => {
    const fetchWebsiteContent = async () => {
      try {
        // Fetch metadata
        const metadataResponse = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const metadataData = await metadataResponse.json();

        // Fetch screenshot as fallback
        const screenshotUrl = `https://api.microlink.io/v1/screenshot?url=${encodeURIComponent(url)}&waitUntil=networkidle0&overlay.browser=true&element=body`;

        // Fetch HTML content
        const htmlResponse = await fetch(url);
        const html = await htmlResponse.text();

        setWebsiteContent({
          html,
          screenshot: screenshotUrl,
          metadata: {
            title: metadataData.data.title,
            description: metadataData.data.description,
            image: metadataData.data.image?.url,
            favicon: metadataData.data.logo?.url,
          }
        });
      } catch (error) {
        console.error('Failed to fetch website content:', error);
      } finally {
        continueRender(handle);
      }
    };

    if (url && !isProcessing) {
      fetchWebsiteContent();
    }
  }, [url, handle, isProcessing]);

  if (isProcessing) {
    return (
      <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Loader2 
            className="h-12 w-12 text-[#E44E51]"
            style={{
              animation: 'spin 1s linear infinite',
              transform: `rotate(${frame * 12}deg)`,
            }}
          />
          <p className="text-xl font-medium text-white">Processing your URL...</p>
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header Section */}
      <Sequence from={0} durationInFrames={30}>
        <div
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `scale(${interpolate(frame, [0, 30], [0.8, 1])})`,
          }}
          className="absolute top-0 left-0 right-0 p-8"
        >
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-[#E44E51]" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {websiteContent.metadata.title || title}
              </h2>
              {websiteContent.metadata.description && (
                <p className="text-gray-400">{websiteContent.metadata.description}</p>
              )}
            </div>
          </div>
        </div>
      </Sequence>

      {/* Website Preview Section */}
      <Sequence from={30}>
        <div
          style={{
            opacity: interpolate(frame - 30, [0, 30], [0, 1]),
            transform: `scale(${interpolate(frame - 30, [0, 30], [0.95, 1])})`,
          }}
          className="absolute top-24 bottom-8 left-8 right-8"
        >
          <WebsiteFrame
            url={url}
            html={websiteContent.html}
            screenshot={websiteContent.screenshot}
            metadata={websiteContent.metadata}
            frame={frame}
          />
        </div>
      </Sequence>

      {/* Overlay Effects */}
      <Sequence from={60}>
        <div
          style={{
            opacity: interpolate(frame - 60, [0, 15], [0, 0.1]),
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"
        />
      </Sequence>
    </AbsoluteFill>
  );
};