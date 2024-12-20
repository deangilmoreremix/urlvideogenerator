import React from 'react';
import { useVideoStore } from '../../store/video-store';
import { frameTemplates } from '../../lib/frames';
import { motion } from 'framer-motion';

export const FramesPanel = () => {
  const { addSequence } = useVideoStore();

  const handleAddFrame = (frame: typeof frameTemplates[0]) => {
    addSequence({
      type: 'frame',
      startFrame: 0,
      endFrame: 150,
      content: frame.id,
      props: {
        template: frame.id,
        animation: frame.component
      }
    });
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-sm font-medium text-gray-400">Background Frames</h3>
      <div className="space-y-2">
        {frameTemplates.map((frame) => (
          <motion.button
            key={frame.id}
            onClick={() => handleAddFrame(frame)}
            className={`group relative w-full h-24 rounded-lg border border-gray-700 ${frame.preview} overflow-hidden transition-all hover:border-purple-500/50`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
            <span className="absolute bottom-2 left-2 block text-white text-sm font-medium">
              {frame.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};