import React from 'react';
import { Player } from '@remotion/player';
import { useVideoPreview } from '../../lib/remotion/hooks/use-video-preview';
import { LoadingSpinner } from '../ui/loading-spinner';
import { ErrorMessage } from '../ui/error-message';
import { useAnimation } from '../../lib/remotion/hooks/use-animation';

interface VideoPreviewProps {
  url: string;
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  url,
  width = 1920,
  height = 1080,
  fps = 30,
  durationInFrames = 300,
}) => {
  const { isLoading, error, preview } = useVideoPreview(url, {
    width,
    height,
    fps,
    durationInFrames,
  });

  const animation = useAnimation({
    type: 'bounce',
    transition: 'fade',
    effect: 'scale',
    delay: 0,
    duration: 30
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!preview) {
    return null;
  }

  const { content, composition } = preview;

  return (
    <div 
      className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800"
      style={animation}
    >
      <Player
        component={composition.Component}
        durationInFrames={composition.durationInFrames}
        fps={composition.fps}
        compositionWidth={composition.width}
        compositionHeight={composition.height}
        style={{
          width: '100%',
          height: '100%',
        }}
        controls
        loop
        autoPlay
        inputProps={{
          content,
          effects: {
            animation: 'bounce',
            transition: 'fade',
            videoEffect: 'scale'
          }
        }}
      />
    </div>
  );
};