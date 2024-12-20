import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class YtDlpService {
  private static instance: YtDlpService;

  private constructor() {}

  static getInstance(): YtDlpService {
    if (!this.instance) {
      this.instance = new YtDlpService();
    }
    return this.instance;
  }

  async getVideoInfo(url: string) {
    try {
      const { stdout } = await execAsync(`curl -s ${url}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(stdout, 'text/html');
      
      const info = {
        success: true,
        url,
        title: doc.title || 'Video',
        duration: 0,
        thumbnail: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''
      };

      return info;
    } catch (error) {
      console.error('YtDlp error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get video info'
      };
    }
  }

  async getDirectVideoUrl(url: string): Promise<string> {
    try {
      // For browser compatibility, return the original URL
      // The actual video processing will be handled by FFmpeg
      return url;
    } catch (error) {
      console.error('Video URL extraction error:', error);
      throw new Error('Failed to get video URL');
    }
  }
}