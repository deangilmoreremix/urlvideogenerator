import React from 'react';
import { useVideoStore } from '../../store/video-store';
import { Play, Pause, Volume2, Split } from 'lucide-react';

export const Timeline = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { videoSettings } = useVideoStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="border-t border-gray-800 bg-gray-900 p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="rounded-full p-2 hover:bg-gray-800"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>
        <Volume2 className="h-5 w-5 text-gray-400" />
        <div className="text-sm text-gray-400">00:00/00:04</div>
        <div className="flex-1 rounded-full bg-gray-800">
          <div
            className="h-1 rounded-full bg-purple-500"
            style={{ width: '30%' }}
          />
        </div>
        <button className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800">
          <Split className="h-4 w-4" />
          <span>Split</span>
        </button>
      </div>
    </div>
  );
};