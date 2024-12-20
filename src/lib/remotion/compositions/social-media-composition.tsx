import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { VideoContent } from '../../url-parser/types';
import { SocialMediaHeader } from './components/social-media-header';
import { SocialMediaContent } from './components/social-media-content';
import { SocialMediaEngagement } from './components/social-media-engagement';

interface SocialMediaCompositionProps {
  content: VideoContent;
}

export const SocialMediaComposition: React.FC<SocialMediaCompositionProps> = ({
  content
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header with platform info and metadata */}
      <Sequence from={0} durationInFrames={30}>
        <SocialMediaHeader 
          content={content} 
          frame={frame}
        />
      </Sequence>

      {/* Main content (text, media, etc) */}
      <Sequence from={30} durationInFrames={180}>
        <SocialMediaContent 
          content={content} 
          frame={frame}
        />
      </Sequence>

      {/* Engagement metrics */}
      <Sequence from={210}>
        <SocialMediaEngagement 
          content={content} 
          frame={frame}
        />
      </Sequence>
    </AbsoluteFill>
  );
};