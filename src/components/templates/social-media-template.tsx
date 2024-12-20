import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { motion } from 'framer-motion';
import { SocialMediaContent } from '../../lib/social-media/types';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import { animations } from '../../lib/remotion-utils';

interface SocialMediaTemplateProps {
  content: SocialMediaContent;
}

const PlatformIcons = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
};

export const SocialMediaTemplate: React.FC<SocialMediaTemplateProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const Icon = PlatformIcons[content.type];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header Section */}
      <Sequence from={0} durationInFrames={30}>
        <div
          style={animations.fadeIn(frame)}
          className="absolute top-0 left-0 right-0 p-8"
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
      </Sequence>

      {/* Content Section */}
      <Sequence from={30}>
        <div
          style={animations.slideUp(frame - 30)}
          className="absolute top-24 bottom-8 left-8 right-8 rounded-lg border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm"
        >
          {/* Text Content */}
          <div className="mb-6">
            <p className="text-xl text-white">{content.content}</p>
          </div>

          {/* Media Content */}
          {content.metadata.media && content.metadata.media.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {content.metadata.media.map((url, index) => (
                <div
                  key={index}
                  style={animations.scale(frame - 60 - index * 10)}
                  className="aspect-square overflow-hidden rounded-lg"
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

          {/* Engagement Metrics */}
          {(content.metadata.likes || content.metadata.shares || content.metadata.comments) && (
            <div
              style={animations.fadeIn(frame - 90)}
              className="mt-6 flex items-center gap-6"
            >
              {content.metadata.likes && (
                <div className="flex items-center gap-2">
                  <span className="text-[#E44E51]">❤</span>
                  <span className="text-white">{content.metadata.likes}</span>
                </div>
              )}
              {content.metadata.shares && (
                <div className="flex items-center gap-2">
                  <span className="text-[#E44E51]">↗</span>
                  <span className="text-white">{content.metadata.shares}</span>
                </div>
              )}
              {content.metadata.comments && (
                <div className="flex items-center gap-2">
                  <span className="text-[#E44E51]">💬</span>
                  <span className="text-white">{content.metadata.comments}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};