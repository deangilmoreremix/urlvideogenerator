import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TitleOverlayProps {
  title: string;
}

export const TitleOverlay: React.FC<TitleOverlayProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp' });

  return (
    <h1
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
      className="absolute top-[20%] w-full text-center text-5xl font-bold text-white"
    >
      {title}
    </h1>
  );
};