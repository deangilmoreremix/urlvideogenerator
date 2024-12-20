import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface DescriptionOverlayProps {
  description: string;
  color: string;
  position: { x: number; y: number };
  effect: string;
}

export const DescriptionOverlay: React.FC<DescriptionOverlayProps> = ({
  description,
  color,
  position,
  effect
}) => {
  const frame = useCurrentFrame();

  const getEffectStyles = () => {
    switch (effect) {
      case 'zoom':
        return {
          transform: `scale(${interpolate(frame, [0, 30], [0.8, 1])})`,
        };
      case 'bounce':
        return {
          transform: `translateY(${Math.sin(frame / 10) * 5}px)`,
        };
      case 'spin':
        return {
          transform: `rotate(${interpolate(frame, [0, 30], [0, 360])}deg)`,
        };
      default:
        return {};
    }
  };

  return (
    <h2
      style={{
        color,
        opacity: interpolate(frame, [0, 30], [0, 1]),
        transform: `translateY(${interpolate(frame, [0, 30], [20, 0])}px)`,
        left: `${position.x}%`,
        top: `${position.y + 10}%`,
        ...getEffectStyles(),
      }}
      className="absolute w-full text-center text-2xl font-medium"
    >
      {description}
    </h2>
  );
};