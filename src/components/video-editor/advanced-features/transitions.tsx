import React from 'react';
import { useVideoConfig, useCurrentFrame } from 'remotion';
import { interpolate } from 'remotion';

interface TransitionProps {
  children: React.ReactNode;
  type: 'slide' | 'fade' | 'zoom' | 'rotate';
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const Transition: React.FC<TransitionProps> = ({
  children,
  type,
  direction = 'left',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getTransform = () => {
    switch (type) {
      case 'slide':
        const offset = direction === 'left' || direction === 'right' ? 100 : 50;
        const sign = direction === 'left' || direction === 'up' ? 1 : -1;
        const prop = direction === 'left' || direction === 'right' ? 'X' : 'Y';
        return {
          transform: `translate${prop}(${interpolate(
            frame,
            [0, 30],
            [offset * sign, 0]
          )}%)`,
        };
      case 'fade':
        return {
          opacity: interpolate(frame, [0, 30], [0, 1]),
        };
      case 'zoom':
        return {
          transform: `scale(${interpolate(frame, [0, 30], [0.5, 1])})`,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        };
      case 'rotate':
        return {
          transform: `rotate(${interpolate(frame, [0, 30], [90, 0])}deg)`,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        ...getTransform(),
        transition: `all ${1/fps}s ease-out`,
      }}
    >
      {children}
    </div>
  );
};