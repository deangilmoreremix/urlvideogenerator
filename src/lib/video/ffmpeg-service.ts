import { createFFmpeg } from '@ffmpeg/ffmpeg/dist/ffmpeg.mjs';
import { fetchFile } from '@ffmpeg/util';
import { validateUrl } from '../utils';
import type { TranscodeOptions } from './types';

export class FFmpegService {
  private static instance: FFmpegService;
  private ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js'
  });
  private isInitialized = false;

  private constructor() {}

  static getInstance(): FFmpegService {
    if (!this.instance) {
      this.instance = new FFmpegService();
    }
    return this.instance;
  }

  async init() {
    if (!this.isInitialized) {
      console.log('Loading FFmpeg...');
      await this.ffmpeg.load();
      console.log('FFmpeg loaded successfully');
      this.isInitialized = true;
    }
  }

  async transcodeToMp4(videoUrl: string, options?: TranscodeOptions): Promise<string> {
    if (!validateUrl(videoUrl)) {
      throw new Error('Invalid video URL');
    }

    try {
      await this.init();

      const inputName = 'input';
      const outputName = 'output.mp4';

      options?.onProgress?.(10);

      // Fetch and write input file
      const videoData = await fetch(videoUrl, {
        mode: 'cors'
      }).then((res) => res.blob());
      this.ffmpeg.FS('writeFile', inputName, await fetchFile(videoData));

      options?.onProgress?.(30);

      // Transcode to MP4
      const args = [
        '-i', inputName,
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-crf', `${Math.floor(28 - (options?.quality || 720) / 100)}`,
        '-movflags', '+faststart',
        outputName
      ];

      await this.ffmpeg.run(...args);
      options?.onProgress?.(80);

      // Read output and create blob URL
      const data = this.ffmpeg.FS('readFile', outputName);
      const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
      
      options?.onProgress?.(100);
      return URL.createObjectURL(mp4Blob);
    } catch (error) {
      console.error('FFmpeg transcoding error:', error);
      throw new Error('Failed to transcode video');
    }
  }
}