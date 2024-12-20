import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@remotion/player';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Audio } from 'remotion';
import { Loader2, X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { createTikTokStyleCaptions } from '@remotion/captions';
import { noise2D } from '@remotion/noise';
import { Circle } from '@remotion/shapes';

interface VideoCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  templateId: string;
}

// Dynamic Video Composition
const DynamicVideoComposition: React.FC<{
  content: {
    title: string;
    description: string;
    images: string[];
    text: string[];
  };
}> = ({ content }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const scale = interpolate(frame, [0, 30], [0.8, 1]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Animation */}
      <Sequence from={0}>
        <AbsoluteFill className="overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => {
            const x = noise2D('x' + i, frame / 100, 0) * 100;
            const y = noise2D('y' + i, frame / 100, 0) * 100;
            return (
              <Circle
                key={i}
                x={x + 50}
                y={y + 50}
                size={4}
                color="rgba(228, 78, 81, 0.2)"
              />
            );
          })}
        </AbsoluteFill>
      </Sequence>

      {/* Title Sequence */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{ opacity, transform: `scale(${scale})` }}
          className="flex h-full items-center justify-center p-8"
        >
          <div className="text-center">
            <h1
              className="mb-4 text-4xl font-bold text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {content.title}
            </h1>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
              {content.description}
            </p>
          </div>
        </div>
      </Sequence>

      {/* Image Sequences */}
      {content.images.map((image, index) => (
        <Sequence
          from={90 + index * 60}
          durationInFrames={60}
          key={index}
        >
          <div
            style={{
              opacity: interpolate(
                frame - (90 + index * 60),
                [0, 15, 45, 60],
                [0, 1, 1, 0]
              ),
              transform: `scale(${interpolate(
                frame - (90 + index * 60),
                [0, 15],
                [0.9, 1]
              )})`,
            }}
            className="flex h-full items-center justify-center p-8"
          >
            <img
              src={image}
              alt=""
              className="max-h-[80%] max-w-[80%] rounded-lg object-contain shadow-2xl"
            />
          </div>
        </Sequence>
      ))}

      {/* Text Sequences */}
      {content.text.map((text, index) => (
        <Sequence
          from={90 + (content.images.length * 60) + (index * 60)}
          durationInFrames={60}
          key={index}
        >
          <div
            style={{
              opacity: interpolate(
                frame - (90 + (content.images.length * 60) + (index * 60)),
                [0, 15, 45, 60],
                [0, 1, 1, 0]
              ),
            }}
            className="flex h-full items-center justify-center p-8"
          >
            <div className="max-w-2xl rounded-lg bg-white/10 p-6 backdrop-blur-lg">
              <p
                className="text-2xl text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {text}
              </p>
            </div>
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const RemotionVideoCreationModal: React.FC<VideoCreationModalProps> = ({
  isOpen,
  onClose,
  url,
  templateId,
}) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState<string>('extracting');

  useEffect(() => {
    if (isOpen && url) {
      processUrl();
    }
  }, [isOpen, url]);

  const processUrl = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Simulate content extraction
      setProcessingStep('extracting');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate AI processing
      setProcessingStep('processing');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate video generation
      setProcessingStep('generating');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock content (replace with actual API calls)
      setContent({
        title: 'Dynamic Video Creation',
        description: 'Generated from ' + url,
        images: [
          'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
        ],
        text: [
          'Transform your content into engaging videos',
          'Powered by AI and Remotion',
        ],
      });

      setIsProcessing(false);
    } catch (err) {
      setError('Failed to process URL');
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl overflow-hidden rounded-lg bg-gray-900 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h3 className="text-lg font-semibold text-white">
                Video Generation
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                {isProcessing ? (
                  <div className="aspect-video w-full rounded-lg border border-gray-800 bg-gray-950 p-8">
                    <div className="flex h-full flex-col items-center justify-center">
                      <Loader2 className="mb-4 h-8 w-8 animate-spin text-[#E44E51]" />
                      <p className="text-lg font-medium text-white">
                        {processingStep === 'extracting' && 'Extracting content...'}
                        {processingStep === 'processing' && 'Processing with AI...'}
                        {processingStep === 'generating' && 'Generating video...'}
                      </p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="aspect-video w-full rounded-lg border border-red-500/20 bg-red-500/10 p-8">
                    <div className="flex h-full flex-col items-center justify-center">
                      <AlertCircle className="mb-4 h-8 w-8 text-red-500" />
                      <p className="text-lg font-medium text-red-500">{error}</p>
                      <button
                        onClick={processUrl}
                        className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Retry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
                    <Player
                      component={DynamicVideoComposition}
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
                      inputProps={{ content }}
                    />
                  </div>
                )}

                {!isProcessing && !error && (
                  <div className="rounded-lg border border-[#E44E51]/20 bg-[#E44E51]/10 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#E44E51]" />
                      <p className="text-sm font-medium text-[#E44E51]">
                        Video generated successfully
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6">
                  <h4 className="mb-4 text-lg font-semibold text-white">
                    Generation Details
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-800/50 p-4">
                      <div className={`h-2 w-2 rounded-full ${
                        processingStep === 'extracting' 
                          ? 'bg-[#E44E51]' 
                          : 'bg-gray-600'
                      }`} />
                      <span className="text-gray-300">Content Extraction</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-gray-800/50 p-4">
                      <div className={`h-2 w-2 rounded-full ${
                        processingStep === 'processing'
                          ? 'bg-[#E44E51]'
                          : 'bg-gray-600'
                      }`} />
                      <span className="text-gray-300">AI Processing</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-gray-800/50 p-4">
                      <div className={`h-2 w-2 rounded-full ${
                        processingStep === 'generating'
                          ? 'bg-[#E44E51]'
                          : 'bg-gray-600'
                      }`} />
                      <span className="text-gray-300">Video Generation</span>
                    </div>
                  </div>
                </div>

                {!isProcessing && !error && content && (
                  <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6">
                    <h4 className="mb-4 text-lg font-semibold text-white">
                      Generated Content
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="mb-1 text-sm font-medium text-gray-400">
                          Title
                        </h5>
                        <p className="text-white">{content.title}</p>
                      </div>
                      <div>
                        <h5 className="mb-1 text-sm font-medium text-gray-400">
                          Description
                        </h5>
                        <p className="text-white">{content.description}</p>
                      </div>
                      <div>
                        <h5 className="mb-1 text-sm font-medium text-gray-400">
                          Assets
                        </h5>
                        <p className="text-white">
                          {content.images.length} images
                          {content.text.length > 0 && `, ${content.text.length} text segments`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};