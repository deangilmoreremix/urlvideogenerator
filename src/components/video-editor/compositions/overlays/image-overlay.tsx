import React from 'react';
import { useCurrentFrame, interpolate, Img } from 'remotion';

interface ImageOverlayProps {
  imageUrl: string;
  transition: string;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  imageUrl,
  transition
}) => {
  const frame = useCurrentFrame();

  const getTransitionStyles = () => {
    switch (transition) {
      case 'fade':
        return {
          opacity: interpolate(frame, [0, 30], [0, 1]),
        };
      case 'slide':
        return {
          transform: `translateX(${interpolate(frame, [0, 30], [100, 0])}%)`,
        };
      case 'zoom':
        return {
          transform: `scale(${interpolate(frame, [0, 30], [0.5, 1])})`,
        };
      default:
        return {
          opacity: interpolate(frame, [0, 30], [0, 1]),
        };
    }
  };

  return (
    <div
      style={getTransitionStyles()}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Img
        src={imageUrl}
        className="h-[300px] w-[300px] rounded-2xl object-cover shadow-2xl"
      />
    </div>
  );
};