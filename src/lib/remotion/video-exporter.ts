import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import type { VideoContent } from '../url-parser/types';
import path from 'path';

interface ExportOptions {
  outputPath: string;
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
  quality?: number;
}

export class VideoExporter {
  private static instance: VideoExporter;

  static getInstance(): VideoExporter {
    if (!this.instance) {
      this.instance = new VideoExporter();
    }
    return this.instance;
  }

  async exportVideo(content: VideoContent, options: ExportOptions) {
    try {
      // Bundle the video template
      const bundled = await bundle(path.join(process.cwd(), './src/components/preview/website-composition.tsx'));

      // Select composition
      const composition = await selectComposition({
        serveUrl: bundled,
        id: 'website-video',
        inputProps: {
          content,
        },
      });

      // Render the video
      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: 'h264',
        outputLocation: options.outputPath,
        inputProps: {
          content,
        },
        imageFormat: 'jpeg',
        pixelFormat: 'yuv420p',
        fps: options.fps || 30,
        width: options.width || 1920,
        height: options.height || 1080,
        quality: options.quality || 80,
      });

      return {
        success: true,
        outputPath: options.outputPath
      };
    } catch (error) {
      console.error('Video export error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to export video'
      };
    }
  }
}