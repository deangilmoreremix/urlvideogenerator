import { useCurrentFrame, useVideoConfig } from 'remotion';
import { animations, AnimationType } from '../animations';
import { transitions, TransitionType } from '../transitions';
import { videoEffects, VideoEffect } from '../video-effects';

interface UseAnimationOptions {
  type?: AnimationType;
  transition?: TransitionType;
  effect?: VideoEffect;
  delay?: number;
  duration?: number;
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const {
    type,
    transition,
    effect,
    delay = 0,
    duration = 30
  } = options;

  const adjustedFrame = frame - delay;

  const styles = {
    ...(type && animations[type](adjustedFrame, fps)),
    ...(transition && transitions[transition](adjustedFrame, duration)),
    ...(effect && videoEffects[effect](adjustedFrame)),
  };

  return styles;
}