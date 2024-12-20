import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { useVideoStore } from '../../store/video-store';
import type { Sequence } from '../../store/video-store';
import { cn } from '../../lib/utils';

const FRAME_WIDTH = 10;
const SEQUENCE_HEIGHT = 40;

export const SequenceTimeline = () => {
  const { sequences, videoSettings, selectedSequence, setSelectedSequence } = useVideoStore();

  const totalFrames = videoSettings.duration * videoSettings.fps;
  const timelineWidth = totalFrames * FRAME_WIDTH;

  const getSequenceStyle = (sequence: Sequence) => ({
    left: `${sequence.startFrame * FRAME_WIDTH}px`,
    width: `${(sequence.endFrame - sequence.startFrame) * FRAME_WIDTH}px`,
    height: `${SEQUENCE_HEIGHT}px`,
  });

  return (
    <div className="flex-1 overflow-x-auto">
      <div
        className="relative h-[200px]"
        style={{ width: `${timelineWidth}px` }}
      >
        {sequences.map((sequence) => (
          <motion.div
            key={sequence.id}
            className={cn(
              'absolute cursor-pointer rounded-md p-2 text-xs',
              'border border-gray-700 bg-gray-800',
              selectedSequence === sequence.id && 'ring-2 ring-purple-500'
            )}
            style={getSequenceStyle(sequence)}
            onClick={() => setSelectedSequence(sequence.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {sequence.type}
          </motion.div>
        ))}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: Math.ceil(totalFrames / 30) }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-gray-700"
              style={{ left: `${i * 30 * FRAME_WIDTH}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};