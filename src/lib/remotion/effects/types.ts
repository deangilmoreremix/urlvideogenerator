export interface AnimationConfig {
  frame: number;
  fps?: number;
  duration?: number;
  delay?: number;
}

export interface TransitionConfig {
  frame: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export interface EffectConfig {
  frame: number;
  intensity?: number;
  duration?: number;
}

export type StyleObject = {
  [key: string]: string | number;
};