import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { motion } from 'framer-motion';
import type { Sequence as SequenceType } from '../../store/video-store';
import { frameTemplates } from '../../lib/frames';

interface TikTokTemplateProps {
  sequences: SequenceType[];
}

export const TikTokTemplate: React.FC<TikTokTemplateProps> = ({ sequences }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {sequences.map((sequence) => (
        <Sequence
          key={sequence.id}
          from={sequence.startFrame}
          durationInFrames={sequence.endFrame - sequence.startFrame}
        >
          {sequence.type === 'frame' && (
            <AbsoluteFill
              style={
                sequence.props?.animation
                  ? sequence.props.animation({ frame })
                  : undefined
              }
            />
          )}

          {sequence.type === 'text' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full items-center justify-center p-8"
            >
              <div className="max-w-2xl rounded-lg bg-white/10 p-6 backdrop-blur-lg">
                <p
                  className="text-white"
                  style={{ fontSize: sequence.props?.fontSize ?? 32 }}
                >
                  {sequence.content}
                </p>
              </div>
            </motion.div>
          )}

          {sequence.type === 'audio' && (
            <audio
              src={sequence.content}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}

          {sequence.type === 'video' && (
            <video
              src={sequence.content}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </Sequence>
      ))}

      <svg width="0" height="0">
        <defs>
          <filter id="noise-0">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
          <filter id="noise-1">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              seed="1"
            />
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
          <filter id="noise-2">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              seed="2"
            />
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};