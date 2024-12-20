import {
  AbsoluteFill,
  Audio,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  interpolateColors,
  random,
} from 'remotion';
import { createTikTokStyleCaptions } from '@remotion/captions';
import { noise2D } from '@remotion/noise';
import { AnimatedEmoji } from '@remotion/animated-emoji';
import { Circle, Rectangle } from '@remotion/shapes';
import { slide } from '@remotion/transitions';

// Animation presets
export const animations = {
  fadeIn: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
  }),
  slideUp: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(
      frame,
      [0, 30],
      [20, 0],
      { extrapolateRight: 'clamp' }
    )}px)`,
  }),
  scale: (frame: number) => ({
    opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
    transform: `scale(${interpolate(
      frame,
      [0, 30],
      [0.8, 1],
      { extrapolateRight: 'clamp' }
    )})`,
  }),
  bounce: (frame: number) => {
    const scale = spring({
      frame,
      fps: 30,
      config: {
        damping: 12,
        mass: 0.5,
      },
    });
    return {
      opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
      transform: `scale(${scale})`,
    };
  },
};

// Caption generator
export const generateCaptions = (text: string, duration: number) => {
  return createTikTokStyleCaptions({
    text,
    duration,
    style: {
      fontFamily: 'Inter, sans-serif',
      fontSize: 32,
      background: 'rgba(0, 0, 0, 0.6)',
      padding: '8px 16px',
      borderRadius: 8,
    },
  });
};

// Background effects
export const noiseBackground = (frame: number) => {
  const scale = 0.01;
  const amplitude = 100;
  return Array.from({ length: 100 }, (_, i) => {
    const x = random(i) * 100;
    const y = random(i + 1) * 100;
    const noisyX = x + noise2D(x * scale, frame * 0.01) * amplitude;
    const noisyY = y + noise2D(y * scale, frame * 0.01) * amplitude;
    return (
      <Circle
        key={i}
        x={noisyX}
        y={noisyY}
        size={4}
        color="rgba(255, 255, 255, 0.1)"
      />
    );
  });
};

// Transition effects
export const transitions = {
  slide: (children: React.ReactNode) => slide(children, { direction: 'from-left' }),
  fade: (frame: number, children: React.ReactNode) => (
    <div style={{ opacity: interpolate(frame, [0, 30], [0, 1]) }}>
      {children}
    </div>
  ),
};

// Emoji animations
export const AnimatedEmojiWithEffects = ({
  emoji,
  size = 64,
}: {
  emoji: string;
  size?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        display: 'inline-block',
      }}
    >
      <AnimatedEmoji emoji={emoji} size={size} />
    </div>
  );
};