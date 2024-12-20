import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { Globe, Play, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { VideoComposition } from './video-composition';
import { useVideoProcessor } from '../../hooks/use-video-processor';

export const VideoPreviewPanel = () => {
  const [inputUrl, setInputUrl] = useState('');
  const { url, loading, error, progress, processVideo } = useVideoProcessor({
    onSuccess: (processedUrl) => {
      console.log('Video processed successfully:', processedUrl);
    },
    onError: (err) => {
      console.error('Video processing error:', err);
    },
    onProgress: (p) => {
      console.log(`Processing progress: ${p}%`);
    }
  });

  const handlePreview = async () => {
    await processVideo(inputUrl);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Globe className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="Enter video URL..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="url-input w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
          />
        </div>
        <Button
          onClick={handlePreview}
          disabled={!inputUrl || loading}
          className="bg-[#E44E51] hover:bg-[#E44E51]/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing... {progress ? `${Math.round(progress)}%` : ''}
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Preview
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {url && (
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
          <Player
            component={VideoComposition}
            durationInFrames={300}
            fps={30}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls
            loop
            autoPlay
            inputProps={{ videoUrl: url }}
          />
        </div>
      )}
    </div>
  );
}