import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  Series,
  Still,
  Video,
  Loop,
  IFrame,
  Img,
  Freeze,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  useCurrentScale,
  useBufferState,
  interpolate,
  interpolateColors,
  spring,
  measureSpring,
  random,
  getInputProps,
  getRemotionEnvironment,
  getStaticFiles,
  staticFile,
  delayRender,
  continueRender,
  cancelRender,
  calculateMetadata,
  prefetch,
  registerRoot,
  VERSION,
} from 'remotion';

import { Player, Thumbnail } from '@remotion/player';
import { Caption, parseSrt, serializeSrt, createTikTokStyleCaptions } from '@remotion/captions';
import { Experimental } from 'remotion';

// Export all Remotion features
export {
  // Core Components
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  Series,
  Still,
  Video,
  Loop,
  IFrame,
  Img,
  Freeze,
  OffthreadVideo,
  
  // Hooks
  useCurrentFrame,
  useVideoConfig,
  useCurrentScale,
  useBufferState,
  
  // Animation Utilities
  interpolate,
  interpolateColors,
  spring,
  measureSpring,
  random,
  
  // Static & Environment
  getInputProps,
  getRemotionEnvironment,
  getStaticFiles,
  staticFile,
  
  // Render Control
  delayRender,
  continueRender,
  cancelRender,
  calculateMetadata,
  prefetch,
  registerRoot,
  VERSION,
  
  // Player Components
  Player,
  Thumbnail,
  
  // Caption Utilities
  Caption,
  parseSrt,
  serializeSrt,
  createTikTokStyleCaptions,
  
  // Experimental Features
  Experimental,
};