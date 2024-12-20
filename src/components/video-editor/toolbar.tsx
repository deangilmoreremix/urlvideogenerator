import React from 'react';
import { Frame, Type, Video, Sticker, Wand2, Music, Layers, Globe, ArrowLeft } from 'lucide-react';
import { useVideoStore } from '../../store/video-store';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export const Toolbar = () => {
  const { addSequence } = useVideoStore();
  const navigate = useNavigate();

  const handleAddText = () => {
    addSequence({
      type: 'text',
      startFrame: 0,
      endFrame: 90,
      content: 'New Text',
      props: {
        fontSize: 32,
        textAlign: 'center',
        animation: 'fadeIn'
      }
    });
  };

  const handleAddVideo = () => {
    addSequence({
      type: 'video',
      startFrame: 0,
      endFrame: 150,
      content: '',
      props: {
        fit: 'cover'
      }
    });
  };

  const handleAddSticker = () => {
    addSequence({
      type: 'sticker',
      startFrame: 0,
      endFrame: 60,
      content: 'https://images.unsplash.com/photo-1549886607-22f7b25d7f14?w=64&h=64&fit=crop&auto=format',
      props: {
        width: 100,
        height: 100,
        animation: 'scale'
      }
    });
  };

  const handleAddAnimation = () => {
    addSequence({
      type: 'animation',
      startFrame: 0,
      endFrame: 60,
      content: 'fadeIn',
      props: {
        duration: 1,
        ease: 'easeOut'
      }
    });
  };

  const handleAddAudio = () => {
    addSequence({
      type: 'audio',
      startFrame: 0,
      endFrame: 90,
      content: '',
      props: {
        volume: 1
      }
    });
  };

  const handleAddOverlay = () => {
    addSequence({
      type: 'overlay',
      startFrame: 0,
      endFrame: 150,
      content: 'gradient',
      props: {
        opacity: 0.5
      }
    });
  };

  const tools = [
    { icon: Frame, label: 'Frame', onClick: () => {} },
    { icon: Type, label: 'Text', onClick: handleAddText },
    { icon: Video, label: 'Video', onClick: handleAddVideo },
    { icon: Globe, label: 'Website', onClick: () => {} },
    { icon: Sticker, label: 'Sticker', onClick: handleAddSticker },
    { icon: Wand2, label: 'Animation', onClick: handleAddAnimation },
    { icon: Music, label: 'Sound', onClick: handleAddAudio },
    { icon: Layers, label: 'Overlays', onClick: handleAddOverlay },
  ];

  return (
    <div className="flex items-center gap-4 border-b border-gray-800 bg-gray-900 p-4">
      <Button
        onClick={() => navigate('/')}
        variant="ghost"
        className="mr-4 flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Templates
      </Button>
      
      <div className="h-6 w-px bg-gray-800" />
      
      <div className="text-sm font-medium text-gray-400">Add New</div>
      {tools.map((Tool, index) => (
        <button
          key={index}
          onClick={Tool.onClick}
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Tool.icon className="h-4 w-4" />
          <span>{Tool.label}</span>
        </button>
      ))}
    </div>
  );
};