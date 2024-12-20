import { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { Globe, Play, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { VideoComposition } from './video-composition';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export const VideoPreview = () => {
  const [url, setUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ffmpeg] = useState(() => createFFmpeg({ log: true }));

  useEffect(() => {
    ffmpeg.load();
  }, [ffmpeg]);

  const transcodeVideo = async (videoUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      const inputName = 'input';
      const outputName = 'output.mp4';

      // Fetch the video and load it into FFmpeg
      const videoData = await fetch(videoUrl).then((res) => res.blob());
      ffmpeg.FS('writeFile', inputName, await fetchFile(videoData));

      // Transcode to MP4
      await ffmpeg.run('-i', inputName, outputName);

      // Read and convert the output file into a Blob URL
      const data = ffmpeg.FS('readFile', outputName);
      const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
      const newUrl = URL.createObjectURL(mp4Blob);
      setUrl(newUrl);
    } catch (err) {
      console.error('Transcoding Error:', err);
      setError('Failed to transcode video. Please try another URL.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    if (inputUrl) {
      await transcodeVideo(inputUrl);
    } else {
      setError('Please enter a valid video URL');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-white">Video Preview</h1>
        <p className="text-gray-400">Enter a URL to generate a video preview</p>
      </div>

      <div className="mx-auto mb-8 max-w-xl">
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
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
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
                Transcoding...
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
          <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-red-500">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>

      {url && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Video Preview</h2>
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
        </div>
      )}
    </div>
  );
};