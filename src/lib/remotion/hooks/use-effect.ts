import { useCurrentFrame } from 'remotion';
import { videoEffects, VideoEffect } from '../effects/video-effects';
import type { EffectConfig } from '../effects/types';

export function useEffect(type: VideoEffect, config: Partial<EffectConfig> = {}) {
  const frame = useCurrentFrame();
  const { intensity = 1, duration = 30 } = config;

  return videoEffects[type](frame, { intensity, duration });
}