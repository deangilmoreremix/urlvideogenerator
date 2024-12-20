import React, { useState, useEffect, useRef } from 'react';
import { interpolate } from 'remotion';
import { Loader2, AlertCircle } from 'lucide-react';

interface WebsiteFrameProps {
  url: string;
  html: string;
  screenshot: string | null;
  metadata: {
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
  };
  frame: number;
}

export const WebsiteFrame: React.FC<WebsiteFrameProps> = ({
  url,
  html,
  screenshot,
  metadata,
  frame
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 p-8">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Unavailable</h3>
          <p className="text-gray-600 text-center">
            Unable to load content from this URL. Please try again later.
          </p>
        </div>
      );
    }

    if (screenshot) {
      return (
        <img
          src={screenshot}
          alt="Website Preview"
          className="h-full w-full object-cover"
          onError={handleError}
        />
      );
    }

    return (
      <div
        className="h-full w-full overflow-auto bg-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-gray-700 bg-white">
      {/* Browser Chrome */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 ml-4 bg-gray-700 rounded px-2 py-1">
          {metadata.favicon && (
            <img 
              src={metadata.favicon}
              alt=""
              className="w-4 h-4 rounded"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          )}
          <span className="text-xs text-white truncate max-w-[300px]">{url}</span>
        </div>
      </div>
      
      {/* Website Content */}
      <div 
        className="absolute top-8 left-0 right-0 bottom-0"
        style={{
          opacity: interpolate(frame - 45, [0, 30], [0, 1]),
          transform: `scale(${interpolate(frame - 45, [0, 30], [0.98, 1])})`,
        }}
      >
        {renderContent()}

        {/* Loading Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300"
          style={{
            opacity: interpolate(frame - 45, [0, 15], [1, 0]),
            pointerEvents: 'none',
          }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      </div>
    </div>
  );
};