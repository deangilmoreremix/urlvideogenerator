import { interpolate, spring } from 'remotion';

export const videoEffects = {
  fadeIn: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1]),
  }),

  slideUp: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1]),
    transform: `translateY(${interpolate(frame, [0, 30], [20, 0])}px)`,
  }),

  scale: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1]),
    transform: `scale(${interpolate(frame, [0, 30], [0.8, 1])})`,
  }),

  bounce: (frame: number) => {
    const scale = spring({
      frame,
      fps: 30,
      config: {
        damping: 12,
        mass: 0.5,
      },
    });
    return {
      opacity: interpolate(frame, [0, 15], [0, 1]),
      transform: `scale(${scale})`,
    };
  },

  rotate: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1]),
    transform: `rotate(${interpolate(frame, [0, 30], [-180, 0])}deg)`,
  }),

  blur: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1]),
    filter: `blur(${interpolate(frame, [0, 30], [10, 0])}px)`,
  }),
};

export type VideoEffect = keyof typeof videoEffects;