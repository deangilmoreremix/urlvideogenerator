import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface BackgroundGradientProps {
  opacity?: number;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ opacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const gradientOpacity = interpolate(frame, [0, 30], [0, opacity], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
      style={{ opacity: gradientOpacity }}
    />
  );
};