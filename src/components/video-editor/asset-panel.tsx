import React from 'react';
import { textAnimations, stickers, soundEffects, overlays } from '../../lib/assets';
import { useVideoStore } from '../../store/video-store';
import { motion } from 'framer-motion';

export const AssetPanel = () => {
  const { addSequence } = useVideoStore();

  const addSticker = (sticker: typeof stickers[0]) => {
    addSequence({
      type: 'sticker',
      startFrame: 0,
      endFrame: 60,
      content: sticker.url,
      props: {
        animation: 'scale',
        width: 100,
        height: 100
      }
    });
  };

  const addSoundEffect = (sound: typeof soundEffects[0]) => {
    addSequence({
      type: 'audio',
      startFrame: 0,
      endFrame: 30,
      content: sound.url,
      props: {
        volume: 1
      }
    });
  };

  const addOverlay = (overlay: typeof overlays[0]) => {
    addSequence({
      type: 'overlay',
      startFrame: 0,
      endFrame: 150,
      content: overlay.id,
      props: {
        className: overlay.className
      }
    });
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-400">Stickers</h3>
        <div className="grid grid-cols-3 gap-2">
          {stickers.map((sticker) => (
            <motion.button
              key={sticker.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square rounded-lg border border-gray-700 bg-gray-800 p-2"
              onClick={() => addSticker(sticker)}
            >
              <img
                src={sticker.url}
                alt={sticker.label}
                className="h-full w-full object-cover rounded"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-400">Sound Effects</h3>
        <div className="space-y-2">
          {soundEffects.map((sound) => (
            <button
              key={sound.id}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
              onClick={() => addSoundEffect(sound)}
            >
              {sound.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-400">Overlays</h3>
        <div className="space-y-2">
          {overlays.map((overlay) => (
            <button
              key={overlay.id}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
              onClick={() => addOverlay(overlay)}
            >
              {overlay.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};