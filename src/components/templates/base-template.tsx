import { AbsoluteFill, Audio, Sequence, useVideoConfig } from 'remotion';
import { animations, noiseBackground } from '../../lib/remotion-utils';
import type { Sequence as SequenceType } from '../../store/video-store';

interface BaseTemplateProps {
  sequences: SequenceType[];
  backgroundAudio?: string;
}

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  sequences,
  backgroundAudio,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-gray-900">
      {/* Dynamic background */}
      <Sequence from={0}>
        <AbsoluteFill className="overflow-hidden">
          {noiseBackground(fps)}
        </AbsoluteFill>
      </Sequence>

      {/* Background audio */}
      {backgroundAudio && (
        <Audio src={backgroundAudio} volume={0.3} />
      )}

      {/* Content sequences */}
      {sequences.map((sequence) => (
        <Sequence
          key={sequence.id}
          from={sequence.startFrame}
          durationInFrames={sequence.endFrame - sequence.startFrame}
        >
          {sequence.type === 'text' && (
            <div
              style={animations[sequence.props?.animation || 'fadeIn'](fps)}
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
            </div>
          )}

          {sequence.type === 'audio' && (
            <Audio
              src={sequence.content}
              volume={sequence.props?.volume ?? 1}
            />
          )}

          {sequence.type === 'video' && (
            <video
              src={sequence.content}
              style={{
                width: '100%',
                height: '100%',
                objectFit: sequence.props?.fit ?? 'cover',
              }}
            />
          )}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};