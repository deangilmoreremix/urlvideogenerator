import React from 'react';
import { interpolate } from 'remotion';
import { VideoContent } from '../../../url-parser/types';

interface SocialMediaContentProps {
  content: VideoContent;
  frame: number;
}

export const SocialMediaContent: React.FC<SocialMediaContentProps> = ({
  content,
  frame
}) => {
  const opacity = interpolate(frame - 30, [0, 30], [0, 1]);
  const scale = interpolate(frame - 30, [0, 30], [0.95, 1]);

  return (
    <div
      className="absolute top-32 bottom-32 left-8 right-8 overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm"
      style={{ opacity, transform: `scale(${scale})` }}
    >
      {/* Text Content */}
      {content.content.text && (
        <p className="mb-6 text-xl text-white">{content.content.text}</p>
      )}

      {/* Media Grid */}
      {content.content.media && content.content.media.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {content.content.media.map((url, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
              style={{
                opacity: interpolate(
                  frame - 60 - index * 10,
                  [0, 30],
                  [0, 1]
                ),
                transform: `scale(${interpolate(
                  frame - 60 - index * 10,
                  [0, 30],
                  [0.8, 1]
                )})`,
              }}
            >
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};