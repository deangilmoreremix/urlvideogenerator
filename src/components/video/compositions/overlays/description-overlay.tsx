import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface DescriptionOverlayProps {
  description: string;
}

export const DescriptionOverlay: React.FC<DescriptionOverlayProps> = ({ description }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 30], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <h2
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
      className="absolute bottom-[10%] w-full text-center text-2xl font-medium text-gray-200"
    >
      {description}
    </h2>
  );
};