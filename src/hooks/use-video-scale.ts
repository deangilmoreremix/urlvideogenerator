import { interpolate } from 'remotion';

export function useVideoScale(frame: number) {
  return interpolate(
    frame,
    [0, 300],
    [1, 1.1],
    {
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out
    }
  );
}