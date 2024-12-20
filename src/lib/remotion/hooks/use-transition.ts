import { useCurrentFrame } from 'remotion';
import { transitions, TransitionType } from '../effects/transitions';
import type { TransitionConfig } from '../effects/types';

export function useTransition(type: TransitionType, config: Partial<TransitionConfig> = {}) {
  const frame = useCurrentFrame();
  const { duration = 30, direction } = config;

  return transitions[type](frame, { duration, direction });
}