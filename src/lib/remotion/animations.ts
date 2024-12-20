import { spring } from 'remotion';

export const animations = {
  bounce: (frame: number, fps: number = 30) => ({
    transform: `scale(${spring({
      frame,
      fps,
      config: { mass: 0.5, damping: 12 }
    })})`,
  }),

  elastic: (frame: number, fps: number = 30) => ({
    transform: `translateY(${spring({
      frame,
      fps,
      config: { mass: 0.8, damping: 8 }
    }) * 50}px)`,
  }),

  wobble: (frame: number, fps: number = 30) => ({
    transform: `rotate(${spring({
      frame,
      fps,
      config: { mass: 0.3, damping: 5 }
    }) * 10}deg)`,
  }),

  pulse: (frame: number, fps: number = 30) => ({
    transform: `scale(${1 + Math.sin(frame / fps * Math.PI) * 0.1})`,
  }),

  shake: (frame: number, fps: number = 30) => ({
    transform: `translateX(${Math.sin(frame / fps * Math.PI * 2) * 5}px)`,
  }),
};

export type AnimationType = keyof typeof animations;