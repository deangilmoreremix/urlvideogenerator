import { interpolate } from 'remotion';

export function getFrameRange(start: number, duration: number) {
  return {
    start,
    end: start + duration,
  };
}

export function getProgress(frame: number, { start, duration }: { start: number; duration: number }) {
  return interpolate(
    frame - start,
    [0, duration],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
}