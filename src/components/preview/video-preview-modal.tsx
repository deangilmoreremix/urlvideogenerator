import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@remotion/player';
import { X, Settings, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DownloadButton } from '../ui/download-button';
import { WebsiteComposition } from './website-composition';
import { VideoSettingsPanel } from './video-settings-panel';
import { SharePanel } from './share-panel';
import type { VideoContent } from '../../lib/url-parser/types';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: VideoContent;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  content
}) => {
  const [exportError, setExportError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [videoSettings, setVideoSettings] = useState({
    width: 1920,
    height: 1080,
    fps: 30,
    duration: 10,
    quality: 80,
    volume: 1,
  });

  const handleExportSuccess = () => {
    setExportError(null);
  };

  const handleExportError = (error: string) => {
    setExportError(error);
  };

  const handleSettingsChange = (newSettings: typeof videoSettings) => {
    setVideoSettings(newSettings);
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-6xl overflow-hidden rounded-lg bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h3 className="text-lg font-semibold text-white">Video Preview</h3>
              <div className="flex items-center gap-2">
                <DownloadButton
                  content={content}
                  settings={videoSettings}
                  onSuccess={handleExportSuccess}
                  onError={handleExportError}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowSettings(true);
                    setShowShare(false);
                  }}
                  className={`text-gray-400 hover:text-white ${showSettings ? 'bg-gray-800' : ''}`}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowShare(true);
                    setShowSettings(false);
                  }}
                  className={`text-gray-400 hover:text-white ${showShare ? 'bg-gray-800' : ''}`}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {exportError && (
              <div className="mx-4 mt-4 rounded-lg bg-red-500/10 p-3 text-red-500">
                <p className="text-sm">{exportError}</p>
              </div>
            )}

            <div className="flex">
              <div className={`flex-1 p-6 ${(showSettings || showShare) ? 'border-r border-gray-800' : ''}`}>
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                  <Player
                    component={WebsiteComposition}
                    durationInFrames={videoSettings.duration * videoSettings.fps}
                    fps={videoSettings.fps}
                    compositionWidth={videoSettings.width}
                    compositionHeight={videoSettings.height}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    controls
                    loop
                    volume={videoSettings.volume}
                    inputProps={{
                      url: content.url,
                      title: content.title,
                    }}
                  />
                </div>
              </div>

              {showSettings && (
                <div className="w-80">
                  <VideoSettingsPanel
                    settings={videoSettings}
                    onSettingsChange={handleSettingsChange}
                  />
                </div>
              )}

              {showShare && (
                <div className="w-80">
                  <SharePanel
                    url={content.url}
                    title={content.title}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};