import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { motion } from 'framer-motion';
import { X, Globe, Play, Sparkles, Wand2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { parseUrl } from '../../lib/url-parser';
import { WebsiteComposition } from '../preview/website-composition';
import { VideoPreview } from '../preview/video-preview';
import type { VideoContent } from '../../lib/url-parser/types';

export const DemoComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const scale = interpolate(frame, [0, 30], [0.8, 1]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800 items-center justify-center">
      <div style={{ opacity, transform: `scale(${scale})` }} className="w-full max-w-4xl p-8">
        <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-[#E44E51]" />
            <h2 className="text-3xl font-bold text-white">AI Video Generation</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg bg-gray-900/50 p-4">
              <Wand2 className="h-6 w-6 text-[#E44E51]" />
              <div>
                <h3 className="text-xl font-semibold text-white">Transform Any URL</h3>
                <p className="text-gray-400">Into engaging video content with AI</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-gradient-to-br from-[#E44E51]/20 to-purple-500/20"
                  style={{
                    transform: `scale(${interpolate(
                      frame - i * 10,
                      [0, 30],
                      [0.8, 1]
                    )})`,
                    opacity: interpolate(frame - i * 10, [0, 30], [0, 1]),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DemoVideo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<VideoContent | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      setIsProcessing(true);
      setError(null);

      const result = await parseUrl(url);
      
      if (!result.success || !result.content) {
        throw new Error(result.error || 'Failed to process URL');
      }

      setContent(result.content);
    } catch (err) {
      console.error('URL processing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process URL');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 font-medium text-white hover:bg-gray-800"
      >
        <Play className="h-4 w-4" />
        Watch Demo
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-full max-w-6xl rounded-lg bg-gray-900 p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Video Preview</h2>
              <p className="mt-2 text-gray-400">
                Enter a URL to generate a video preview using our AI technology
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to generate video..."
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isProcessing || !url}
                  className="bg-[#E44E51] hover:bg-[#E44E51]/90"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Generate Video'
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
            </form>

            <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
              {url ? (
                <VideoPreview url={url} />
              ) : (
                <Player
                  component={DemoComposition}
                  durationInFrames={300}
                  fps={30}
                  compositionWidth={1920}
                  compositionHeight={1080}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  controls
                  autoPlay
                  loop
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};