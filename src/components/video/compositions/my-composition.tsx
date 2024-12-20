import React from 'react';
import { AbsoluteFill, Video, Audio, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { TitleOverlay } from './overlays/title-overlay';
import { ImageOverlay } from './overlays/image-overlay';
import { DescriptionOverlay } from './overlays/description-overlay';
import { BackgroundGradient } from './effects/background-gradient';
import { useVideoScale } from '../../hooks/use-video-scale';

interface MyCompositionProps {
  videoUrl: string;
  content: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  audio?: {
    src: string;
    volume?: number;
  };
}

export const MyComposition: React.FC<MyCompositionProps> = ({
  videoUrl,
  content,
  audio
}) => {
  const frame = useCurrentFrame();
  const scale = useVideoScale(frame);

  return (
    <AbsoluteFill className="bg-black">
      {/* Background Video */}
      <Sequence from={0}>
        <Video
          src={videoUrl}
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale})`,
          }}
        />
        <BackgroundGradient opacity={0.6} />
      </Sequence>

      {/* Title Animation */}
      {content.title && (
        <Sequence from={30} durationInFrames={90}>
          <TitleOverlay title={content.title} />
        </Sequence>
      )}

      {/* Image Overlay */}
      {content.imageUrl && (
        <Sequence from={60} durationInFrames={240}>
          <ImageOverlay imageUrl={content.imageUrl} />
        </Sequence>
      )}

      {/* Description Animation */}
      {content.description && (
        <Sequence from={120} durationInFrames={120}>
          <DescriptionOverlay description={content.description} />
        </Sequence>
      )}

      {/* Background Music */}
      {audio?.src && (
        <Audio
          src={audio.src}
          volume={audio.volume ?? 0.5}
        />
      )}
    </AbsoluteFill>
  );
};