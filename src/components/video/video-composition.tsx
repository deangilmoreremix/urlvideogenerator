import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Globe } from 'lucide-react';

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
        className="flex h-full flex-col items-center justify-center p-8"
      >
        <div className="mb-4 rounded-full bg-[#E44E51]/10 p-4">
          <Globe className="h-12 w-12 text-[#E44E51]" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">Video Preview</h2>
        <p className="text-center text-gray-400">{videoUrl}</p>
      </div>
    </AbsoluteFill>
  );
};