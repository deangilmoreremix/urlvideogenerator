import React from 'react';
import { interpolate } from 'remotion';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import { VideoContent } from '../../../url-parser/types';

interface SocialMediaEngagementProps {
  content: VideoContent;
  frame: number;
}

export const SocialMediaEngagement: React.FC<SocialMediaEngagementProps> = ({
  content,
  frame
}) => {
  const opacity = interpolate(frame - 210, [0, 30], [0, 1]);
  const y = interpolate(frame - 210, [0, 30], [20, 0]);

  return (
    <div
      className="absolute bottom-8 left-8 right-8 flex items-center justify-around rounded-lg border border-gray-700 bg-gray-800/50 p-4 backdrop-blur-sm"
      style={{ opacity, transform: `translateY(${y}px)` }}
    >
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-[#E44E51]" />
        <span className="text-white">
          {content.metadata.likes?.toLocaleString() || '0'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-[#E44E51]" />
        <span className="text-white">
          {content.metadata.comments?.toLocaleString() || '0'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Share2 className="h-5 w-5 text-[#E44E51]" />
        <span className="text-white">
          {content.metadata.shares?.toLocaleString() || '0'}
        </span>
      </div>
    </div>
  );
};