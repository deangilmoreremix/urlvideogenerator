import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TitleOverlayProps {
  title: string;
  color: string;
  position: { x: number; y: number };
  effect: string;
}

export const TitleOverlay: React.FC<TitleOverlayProps> = ({
  title,
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
          transform: `translateY(${Math.sin(frame / 10) * 10}px)`,
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
    <h1
      style={{
        color,
        opacity: interpolate(frame, [0, 30], [0, 1]),
        transform: `translateY(${interpolate(frame, [0, 30], [50, 0])}px)`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        ...getEffectStyles(),
      }}
      className="absolute w-full text-center text-5xl font-bold"
    >
      {title}
    </h1>
  );
};