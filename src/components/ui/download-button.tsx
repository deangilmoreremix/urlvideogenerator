import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from './button';
import { VideoExporter } from '../../lib/remotion/video-exporter';
import type { VideoContent } from '../../lib/url-parser/types';

interface DownloadButtonProps {
  content: VideoContent;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  onSuccess,
  onError
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const exporter = VideoExporter.getInstance();
      const result = await exporter.exportVideo(content, {
        outputPath: `${content.title.toLowerCase().replace(/\s+/g, '-')}.mp4`,
        width: 1920,
        height: 1080,
        fps: 30,
        quality: 80
      });

      if (result.success) {
        onSuccess?.();
        // Trigger download
        const link = document.createElement('a');
        link.href = result.outputPath;
        link.download = `${content.title.toLowerCase().replace(/\s+/g, '-')}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Export error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to export video');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="bg-[#E44E51] text-white hover:bg-[#E44E51]/90"
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Video
        </>
      )}
    </Button>
  );
};