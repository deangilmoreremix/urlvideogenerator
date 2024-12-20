import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@remotion/player';
import { X, Link, ArrowRight, Play, AlertCircle, Settings, Download, Share2, Eye } from 'lucide-react';
import { DemoComposition } from './demo-composition';
import { UrlPreviewComposition } from './url-preview-composition';
import { validateUrl, sanitizeUrl } from '../../lib/website-preview';
import { Button } from '../ui/button';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    title: string;
    description: string;
    previewUrl: string;
    features: string[];
    icon: React.ElementType;
  };
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  template
}) => {
  const [url, setUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'demo' | 'url'>('demo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoConfig, setVideoConfig] = useState({
    fps: 30,
    durationInFrames: 150,
    width: 1920,
    height: 1080,
  });
  const Icon = template.icon;

  const handleWatchDemo = () => {
    setPreviewMode('demo');
    setShowPreview(true);
    setError(null);
  };

  const handleTryWithUrl = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const sanitizedUrl = sanitizeUrl(url);
      setError(null);
      setIsProcessing(true);
      setPreviewMode('url');
      setShowPreview(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTryWithUrl();
  };

  const handleDemoUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const sanitizedUrl = sanitizeUrl(url);
      setError(null);
      setIsProcessing(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  const handleConfigChange = (key: keyof typeof videoConfig, value: number) => {
    setVideoConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-6xl overflow-hidden rounded-lg bg-[#030711]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h3 className="text-lg font-semibold text-white">
                {showPreview ? 'Video Preview' : 'Generate Your Video'}
              </h3>
              <div className="flex items-center gap-2">
                {showPreview && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {}}
                      className="text-gray-400 hover:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {}}
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {}}
                      className="text-gray-400 hover:text-white"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {!showPreview ? (
              <div className="grid grid-cols-2">
                <div className="p-6">
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                    <img
                      src={template.previewUrl}
                      alt={template.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="rounded-lg bg-[#E44E51]/10 p-2">
                      <Icon className="h-5 w-5 text-[#E44E51]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{template.title}</h4>
                      <p className="text-sm text-gray-400">{template.description}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="mb-2 text-sm font-medium text-gray-400">Features</h5>
                    <ul className="space-y-2">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E44E51]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-l border-gray-800 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Enter Content URL
                  </h3>
                  <p className="mb-6 text-gray-400">
                    Enter the URL of your content and let our AI transform it into a
                    professional video using this template.
                  </p>

                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm text-gray-400">Content URL</label>
                      <div className="relative">
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                          <Link className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E44E51] px-4 py-2 font-medium text-white hover:bg-[#E44E51]/90"
                    >
                      Generate Video
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-[#030711] px-2 text-gray-400">or</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleWatchDemo}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700"
                    >
                      <Play className="h-4 w-4" />
                      Watch Demo
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {previewMode === 'demo' ? (
                  <>
                    <div className="mb-6">
                      <form onSubmit={handleDemoUrlSubmit} className="flex gap-4">
                        <div className="relative flex-1">
                          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                            <Link className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL to preview..."
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="bg-[#E44E51] hover:bg-[#E44E51]/90"
                        >
                          Preview
                          <Eye className="ml-2 h-4 w-4" />
                        </Button>
                      </form>

                      {error && (
                        <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-red-500">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            <p className="text-sm">{error}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                      <Player
                        component={url ? UrlPreviewComposition : DemoComposition}
                        durationInFrames={videoConfig.durationInFrames}
                        fps={videoConfig.fps}
                        compositionWidth={videoConfig.width}
                        compositionHeight={videoConfig.height}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        controls
                        autoPlay
                        loop
                        inputProps={
                          url
                            ? {
                                url,
                                title: template.title,
                                isProcessing,
                              }
                            : {
                                title: template.title,
                                features: template.features,
                              }
                        }
                      />
                    </div>
                  </>
                ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                    <Player
                      component={UrlPreviewComposition}
                      durationInFrames={videoConfig.durationInFrames}
                      fps={videoConfig.fps}
                      compositionWidth={videoConfig.width}
                      compositionHeight={videoConfig.height}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      controls
                      autoPlay
                      loop
                      inputProps={{
                        url,
                        title: template.title,
                        isProcessing,
                      }}
                    />
                  </div>
                )}

                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() => {
                      setShowPreview(false);
                      setError(null);
                    }}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    Back
                  </Button>
                  {previewMode === 'demo' && !url && (
                    <Button
                      onClick={() => {
                        setPreviewMode('url');
                        setShowPreview(false);
                        setError(null);
                      }}
                      className="bg-[#E44E51] hover:bg-[#E44E51]/90"
                    >
                      Try with URL
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};