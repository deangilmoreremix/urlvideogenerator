import React, { useState } from 'react';
import { Share2, Copy, Link, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '../ui/button';

interface SharePanelProps {
  url: string;
  title: string;
}

export const SharePanel: React.FC<SharePanelProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
        <Share2 className="h-5 w-5" />
        Share Video
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white">
            {url}
          </div>
          <Button
            onClick={handleCopy}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            {copied ? (
              'Copied!'
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              onClick={() => window.open(link.url, '_blank')}
              className="flex-1 gap-2"
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};