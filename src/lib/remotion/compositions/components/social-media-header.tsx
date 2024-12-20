import React from 'react';
import { interpolate } from 'remotion';
import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import { VideoContent } from '../../../url-parser/types';

interface SocialMediaHeaderProps {
  content: VideoContent;
  frame: number;
}

const PlatformIcons = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin
};

export const SocialMediaHeader: React.FC<SocialMediaHeaderProps> = ({
  content,
  frame
}) => {
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const y = interpolate(frame, [0, 30], [-20, 0]);
  const Icon = PlatformIcons[content.type as keyof typeof PlatformIcons];

  return (
    <div
      className="absolute top-0 left-0 right-0 p-8"
      style={{ opacity, transform: `translateY(${y}px)` }}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-8 w-8 text-[#E44E51]" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            {content.metadata.author || 'Social Media Post'}
          </h2>
          {content.metadata.date && (
            <p className="text-gray-400">
              {new Date(content.metadata.date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};