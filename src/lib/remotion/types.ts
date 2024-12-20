import type { VideoContent } from '../url-parser/types';
import type { AnimationType } from './effects/animations';
import type { TransitionType } from './effects/transitions';
import type { VideoEffect } from './effects/video-effects';

export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}

export interface VideoEffects {
  animation?: AnimationType;
  transition?: TransitionType;
  videoEffect?: VideoEffect;
}

export interface CompositionConfig extends VideoConfig {
  id: string;
  Component: React.ComponentType<any>;
  defaultProps: {
    content: VideoContent;
    effects?: VideoEffects;
  };
}

export interface GenerateVideoResult {
  success: boolean;
  composition?: CompositionConfig;
  error?: string;
}

export * from './effects/types';