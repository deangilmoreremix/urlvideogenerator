import React from 'react';
import { 
  Play, Pause, Undo, Redo, Download, Share2, 
  Settings, ZoomIn, ZoomOut, Copy, Eye, ArrowLeft
} from 'lucide-react';
import { useVideoStore } from '../../store/video-store';
import { useEditorStore } from './editor-store';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export const HeaderControls = () => {
  const navigate = useNavigate();
  const { videoSettings, sequences } = useVideoStore();
  const { isPlaying, setIsPlaying, zoom, setZoom } = useEditorStore();
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handleExport = () => {
    // Implement video export functionality
  };

  const handleShare = () => {
    // Implement share functionality
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>

        <div className="h-4 w-px bg-gray-800" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlayPause}
            className="text-gray-400 hover:text-white"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            className="text-gray-400 hover:text-white"
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}}
            className="text-gray-400 hover:text-white"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <div className="h-4 w-px bg-gray-800" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="text-gray-400 hover:text-white"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <span className="text-sm text-gray-400">{Math.round(zoom * 100)}%</span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="text-gray-400 hover:text-white"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePreview}
          className="text-gray-400 hover:text-white"
        >
          <Eye className="h-4 w-4" />
          <span className="ml-2">Preview</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          className="text-gray-400 hover:text-white"
        >
          <Copy className="h-4 w-4" />
          <span className="ml-2">Duplicate</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="text-gray-400 hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          <span className="ml-2">Share</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          className="text-gray-400 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          <span className="ml-2">Settings</span>
        </Button>

        <Button
          onClick={handleExport}
          size="sm"
          className="bg-[#E44E51] text-white hover:bg-[#E44E51]/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};