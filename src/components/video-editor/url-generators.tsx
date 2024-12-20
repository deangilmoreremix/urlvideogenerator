import React, { useState } from 'react';
import { Globe, Twitter, Youtube, MessageSquare } from 'lucide-react';
import { useVideoStore } from '../../store/video-store';
import { WebsitePreview } from '../preview/website-preview';
import { Button } from '../ui/button';

const generators = [
  {
    id: 'website',
    icon: Globe,
    label: 'Website Showcase',
    placeholder: 'Enter website URL',
    type: 'website'
  },
  {
    id: 'twitter',
    icon: Twitter,
    label: 'Twitter Post',
    placeholder: 'Enter tweet URL',
    type: 'twitter'
  },
  {
    id: 'youtube',
    icon: Youtube,
    label: 'YouTube Clip',
    placeholder: 'Enter YouTube URL',
    type: 'youtube'
  },
  {
    id: 'reddit',
    icon: MessageSquare,
    label: 'Reddit Post',
    placeholder: 'Enter Reddit post URL',
    type: 'reddit'
  }
];

export const UrlGenerators = () => {
  const [selectedType, setSelectedType] = useState('');
  const [url, setUrl] = useState('');
  const { addWebsiteSequence } = useVideoStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    addWebsiteSequence(url);
  };

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-2 gap-2">
        {generators.map((gen) => (
          <button
            key={gen.id}
            onClick={() => setSelectedType(gen.id)}
            className={`flex items-center gap-2 rounded-lg border p-3 transition-colors ${
              selectedType === gen.id
                ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
            }`}
          >
            <gen.icon className="h-5 w-5" />
            <span>{gen.label}</span>
          </button>
        ))}
      </div>

      {selectedType && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={generators.find(g => g.id === selectedType)?.placeholder}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500"
            required
          />
          
          {url && <WebsitePreview url={url} />}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!url}
          >
            Generate Video
          </Button>
        </form>
      )}
    </div>
  );
};