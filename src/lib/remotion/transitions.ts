import { interpolate } from 'remotion';

export const transitions = {
  fade: (frame: number, duration: number = 30) => ({
    opacity: interpolate(frame, [0, duration], [0, 1]),
  }),

  slideLeft: (frame: number, duration: number = 30) => ({
    transform: `translateX(${interpolate(frame, [0, duration], [100, 0])}%)`,
  }),

  slideRight: (frame: number, duration: number = 30) => ({
    transform: `translateX(${interpolate(frame, [0, duration], [-100, 0])}%)`,
  }),

  slideUp: (frame: number, duration: number = 30) => ({
    transform: `translateY(${interpolate(frame, [0, duration], [100, 0])}%)`,
  }),

  slideDown: (frame: number, duration: number = 30) => ({
    transform: `translateY(${interpolate(frame, [0, duration], [-100, 0])}%)`,
  }),

  zoom: (frame: number, duration: number = 30) => ({
    transform: `scale(${interpolate(frame, [0, duration], [0, 1])})`,
  }),

  rotate: (frame: number, duration: number = 30) => ({
    transform: `rotate(${interpolate(frame, [0, duration], [90, 0])}deg)`,
  }),
};

export type TransitionType = keyof typeof transitions;