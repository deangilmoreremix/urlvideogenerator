import React from 'react';
import { AbsoluteFill, Video, Audio, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { TitleOverlay } from './overlays/title-overlay';
import { ImageOverlay } from './overlays/image-overlay';
import { DescriptionOverlay } from './overlays/description-overlay';
import { BackgroundGradient } from './effects/background-gradient';
import { useVideoScale } from '../../../hooks/use-video-scale';

interface MyCompositionProps {
  videoUrl: string;
  content: {
    title: string;
    description: string;
    imageUrl?: string;
    textColor: string;
    textPosition: { x: number; y: number };
    transition: string;
    effect: string;
    bgMusic?: string;
  };
}

export const MyComposition: React.FC<MyCompositionProps> = ({
  videoUrl,
  content
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
      <Sequence from={30} durationInFrames={90}>
        <TitleOverlay
          title={content.title}
          color={content.textColor}
          position={content.textPosition}
          effect={content.effect}
        />
      </Sequence>

      {/* Image Overlay */}
      {content.imageUrl && (
        <Sequence from={60} durationInFrames={240}>
          <ImageOverlay
            imageUrl={content.imageUrl}
            transition={content.transition}
          />
        </Sequence>
      )}

      {/* Description Animation */}
      <Sequence from={120} durationInFrames={120}>
        <DescriptionOverlay
          description={content.description}
          color={content.textColor}
          position={content.textPosition}
          effect={content.effect}
        />
      </Sequence>

      {/* Background Music */}
      {content.bgMusic && (
        <Audio
          src={content.bgMusic}
          volume={0.5}
        />
      )}
    </AbsoluteFill>
  );
};