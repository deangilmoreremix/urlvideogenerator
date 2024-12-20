import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { Sparkles, Wand2, Globe } from 'lucide-react';

interface DemoCompositionProps {
  title: string;
  features: string[];
}

export const DemoComposition: React.FC<DemoCompositionProps> = ({ title, features }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Title Sequence */}
      <Sequence from={0} durationInFrames={90}>
        <div
          className="flex h-full items-center justify-center p-8"
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `scale(${interpolate(frame, [0, 30], [0.8, 1])})`,
          }}
        >
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-[#E44E51]" />
              <h1 className="text-4xl font-bold text-white">{title}</h1>
            </div>
            <p className="text-xl text-gray-300">
              Transform your content into engaging videos
            </p>
          </div>
        </div>
      </Sequence>

      {/* Features Sequence */}
      <Sequence from={90} durationInFrames={120}>
        <div
          className="flex h-full items-center justify-center p-8"
          style={{
            opacity: interpolate(frame - 90, [0, 30], [0, 1]),
            transform: `scale(${interpolate(frame - 90, [0, 30], [0.8, 1])})`,
          }}
        >
          <div className="w-full max-w-3xl space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                style={{
                  opacity: interpolate(
                    frame - 90 - index * 10,
                    [0, 20],
                    [0, 1]
                  ),
                  transform: `translateY(${interpolate(
                    frame - 90 - index * 10,
                    [0, 20],
                    [20, 0]
                  )}px)`,
                }}
              >
                <div className="rounded-lg bg-[#E44E51]/10 p-2">
                  {index % 3 === 0 ? (
                    <Sparkles className="h-5 w-5 text-[#E44E51]" />
                  ) : index % 3 === 1 ? (
                    <Wand2 className="h-5 w-5 text-[#E44E51]" />
                  ) : (
                    <Globe className="h-5 w-5 text-[#E44E51]" />
                  )}
                </div>
                <span className="text-lg text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};