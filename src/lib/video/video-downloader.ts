import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class VideoDownloader {
  private static instance: VideoDownloader;

  private constructor() {}

  static getInstance(): VideoDownloader {
    if (!this.instance) {
      this.instance = new VideoDownloader();
    }
    return this.instance;
  }

  async getDirectVideoUrl(url: string): Promise<string> {
    try {
      const { stdout } = await execAsync(`yt-dlp -g ${url}`);
      const directUrl = stdout.trim();
      
      if (!directUrl) {
        throw new Error('No downloadable video URL found');
      }

      return directUrl;
    } catch (error) {
      console.error('Video download error:', error);
      throw new Error('Failed to get video URL');
    }
  }
}