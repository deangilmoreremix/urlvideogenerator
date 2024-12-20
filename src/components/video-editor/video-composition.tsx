import { AbsoluteFill, useCurrentFrame, interpolate, Video } from 'remotion';

interface VideoCompositionProps {
  videoUrl: string;
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({ videoUrl }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const scale = interpolate(frame, [0, 30], [0.8, 1]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
        className="relative h-full w-full"
      >
        <Video
          src={videoUrl}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </AbsoluteFill>
  );
};