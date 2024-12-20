import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useVideo } from '../../hooks/use-video';
import { VideoInput } from './video-input';
import { ProcessButton } from './process-button';
import { VideoPlayer } from './video-player';

export const VideoProcessor: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const { url, loading, error, progress, processVideo } = useVideo({
    onProgress: (p) => console.log(`Processing progress: ${p}%`)
  });

  const handleProcess = async () => {
    await processVideo(inputUrl, {
      quality: 1080
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <VideoInput
          value={inputUrl}
          onChange={setInputUrl}
        />
        <ProcessButton
          onClick={handleProcess}
          loading={loading}
          progress={progress}
          disabled={!inputUrl}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {url && <VideoPlayer url={url} />}
    </div>
  );
};