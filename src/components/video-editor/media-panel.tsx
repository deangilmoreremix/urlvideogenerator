import React from 'react';
import { useVideoStore } from '../../store/video-store';
import { Upload } from 'lucide-react';

export const MediaPanel = () => {
  const { addSequence } = useVideoStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addSequence({
        type: 'video',
        startFrame: 0,
        endFrame: 150,
        content: url,
        props: {
          fit: 'cover'
        }
      });
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-sm font-medium text-gray-400">Upload Media</h3>
      <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/5 cursor-pointer">
        <Upload className="h-8 w-8 text-gray-400 mb-2" />
        <span className="text-sm text-gray-400">Upload video or image</span>
        <input
          type="file"
          accept="video/*,image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};