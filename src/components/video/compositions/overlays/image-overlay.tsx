import React from 'react';
import { useCurrentFrame, interpolate, Img } from 'remotion';

interface ImageOverlayProps {
  imageUrl: string;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Img
        src={imageUrl}
        className="h-[300px] w-[300px] rounded-2xl object-cover shadow-2xl"
      />
    </div>
  );
};