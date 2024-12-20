import React from 'react';
import { Player } from '@remotion/player';
import { VideoComposition } from './video-composition';

interface VideoPlayerProps {
  url: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, className }) => {
  return (
    <div className={`aspect-video w-full overflow-hidden rounded-lg border border-gray-800 ${className}`}>
      <Player
        component={VideoComposition}
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
        autoPlay
        inputProps={{ videoUrl: url }}
      />
    </div>
  );
};