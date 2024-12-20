import React from 'react';
import { useVideoConfig, useCurrentFrame } from 'remotion';
import { spring, interpolate } from 'remotion';

interface MotionEffectsProps {
  children: React.ReactNode;
  effect: 'spring' | 'bounce' | 'elastic' | 'smooth';
}

export const MotionEffects: React.FC<MotionEffectsProps> = ({ children, effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getTransform = () => {
    switch (effect) {
      case 'spring':
        return {
          scale: spring({
            frame,
            fps,
            config: { damping: 12, mass: 0.5 },
          }),
        };
      case 'bounce':
        return {
          translateY: spring({
            frame,
            fps,
            config: { damping: 5, mass: 0.8 },
          }) * 50,
        };
      case 'elastic':
        return {
          rotate: spring({
            frame,
            fps,
            config: { damping: 3, mass: 0.3 },
          }) * 360,
        };
      case 'smooth':
        return {
          opacity: interpolate(frame, [0, 30], [0, 1]),
          scale: interpolate(frame, [0, 30], [0.8, 1]),
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        transform: `
          scale(${getTransform().scale || 1})
          translateY(${getTransform().translateY || 0}px)
          rotate(${getTransform().rotate || 0}deg)
        `,
        opacity: getTransform().opacity ?? 1,
      }}
    >
      {children}
    </div>
  );
};