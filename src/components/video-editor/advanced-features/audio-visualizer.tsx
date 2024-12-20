import React from 'react';
import { useVideoConfig, useCurrentFrame, Audio } from 'remotion';
import { interpolate } from 'remotion';

interface AudioVisualizerProps {
  audioUrl: string;
  color?: string;
  barCount?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioUrl,
  color = '#E44E51',
  barCount = 50,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Simulate audio frequency data
  const getFrequencyData = (frame: number) => {
    return Array.from({ length: barCount }, (_, i) => {
      const frequency = (Math.sin(frame / fps + i * 0.5) + 1) * 50;
      return frequency;
    });
  };

  const frequencyData = getFrequencyData(frame);

  return (
    <div className="flex h-20 items-end justify-center gap-1">
      {frequencyData.map((frequency, index) => (
        <div
          key={index}
          className="w-1 rounded-t"
          style={{
            height: `${frequency}%`,
            backgroundColor: color,
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `scaleY(${interpolate(
              frame - index * 2,
              [0, 20],
              [0, 1]
            )})`,
          }}
        />
      ))}
      <Audio src={audioUrl} />
    </div>
  );
};