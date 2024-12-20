import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { MyComposition } from './compositions/my-composition';
import { Toolbar } from './toolbar';
import { Timeline } from './timeline';
import { Sidebar } from './sidebar';
import { SequenceTimeline } from './sequence-timeline';
import { PropertiesPanel } from './properties-panel';
import { HeaderControls } from './header-controls';
import { AIAssistant } from '../ai-assistant/ai-assistant';
import { Brain, Maximize2, Minimize2, Layout, PanelLeft, PanelRight } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoProcessor } from '../../hooks/use-video-processor';

export const VideoEditor = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [inputUrl, setInputUrl] = useState('');
  const [content, setContent] = useState({
    title: 'Default Title',
    description: 'Default Description',
    imageUrl: '',
    textColor: '#FFFFFF',
    bgMusic: '',
    textPosition: { x: 50, y: 20 },
    transition: 'fade',
    effect: 'zoom',
  });

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

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextPosition = (axis: 'x' | 'y', value: number) => {
    setContent((prev) => ({
      ...prev,
      textPosition: {
        ...prev.textPosition,
        [axis]: value,
      },
    }));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-900">
      <HeaderControls />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <AnimatePresence mode="wait">
          {showLeftPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-gray-800"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/50 px-4 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              className="text-gray-400 hover:text-white"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-gray-400 hover:text-white"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRightPanel(!showRightPanel)}
                className="text-gray-400 hover:text-white"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Toolbar />

          <div className="relative flex-1 overflow-hidden bg-gray-950 p-6 space-y-6">
            <motion.div
              layout
              className={`mx-auto aspect-[9/16] ${
                isFullscreen ? 'h-full' : 'h-[80vh]'
              }`}
            >
              <div className="h-full overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-2xl">
                <Player
                  component={MyComposition}
                  durationInFrames={300}
                  fps={30}
                  compositionWidth={1080}
                  compositionHeight={1920}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  controls
                  inputProps={{
                    videoUrl: url,
                    content
                  }}
                />
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Content Settings</h3>
                <input
                  type="text"
                  name="title"
                  value={content.title}
                  onChange={handleContentChange}
                  placeholder="Title"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                />
                <input
                  type="text"
                  name="description"
                  value={content.description}
                  onChange={handleContentChange}
                  placeholder="Description"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={content.imageUrl}
                  onChange={handleContentChange}
                  placeholder="Overlay Image URL"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Style Settings</h3>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Text Color</label>
                  <input
                    type="color"
                    name="textColor"
                    value={content.textColor}
                    onChange={handleContentChange}
                    className="h-10 w-full rounded-lg border border-gray-700 bg-gray-800"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Text Position X</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={content.textPosition.x}
                    onChange={(e) => handleTextPosition('x', Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Text Position Y</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={content.textPosition.y}
                    onChange={(e) => handleTextPosition('y', Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800">
            <Timeline />
            <SequenceTimeline />
          </div>
        </div>

        {/* Right Properties Panel */}
        <AnimatePresence mode="wait">
          {showRightPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l border-gray-800"
            >
              <PropertiesPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Assistant Toggle Button */}
      <Button
        onClick={() => setShowAIAssistant(!showAIAssistant)}
        className="fixed bottom-4 right-4 z-50 bg-[#E44E51] hover:bg-[#E44E51]/90"
      >
        <Brain className="mr-2 h-4 w-4" />
        AI Assistant
      </Button>

      {/* AI Assistant Panel */}
      {showAIAssistant && <AIAssistant />}
    </div>
  );
};