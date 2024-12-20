import React from 'react';
import { useVideoStore } from '../../store/video-store';
import { soundEffects } from '../../lib/assets';
import { Upload, Volume2 } from 'lucide-react';

export const AudioPanel = () => {
  const { addSequence } = useVideoStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addSequence({
        type: 'audio',
        startFrame: 0,
        endFrame: 90,
        content: url,
        props: {
          volume: 1
        }
      });
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-sm font-medium text-gray-400">Upload Audio</h3>
      <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/5 cursor-pointer mb-6">
        <Upload className="h-8 w-8 text-gray-400 mb-2" />
        <span className="text-sm text-gray-400">Upload audio file</span>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      <h3 className="mb-4 text-sm font-medium text-gray-400">Sound Effects</h3>
      <div className="space-y-2">
        {soundEffects.map((sound) => (
          <button
            key={sound.id}
            onClick={() => {
              addSequence({
                type: 'audio',
                startFrame: 0,
                endFrame: 30,
                content: sound.url,
                props: {
                  volume: 1
                }
              });
            }}
            className="w-full flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/5"
          >
            <Volume2 className="h-4 w-4" />
            <span>{sound.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};