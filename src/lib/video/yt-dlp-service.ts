import { exec } from 'child_process';
import { promisify } from 'util';

interface ResolverResponse {
  success: boolean;
  url?: string;
  error?: string;
}

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
      if (!url) {
        throw new Error('No video URL provided');
      }

      if (typeof window === 'undefined') {
        const { VideoDownloader } = await import('./video-downloader');
        const downloader = VideoDownloader.getInstance();
        return await downloader.getDirectVideoUrl(url);
      }

      const resolverEndpoint = this.getResolverEndpoint();
      const requestUrl = `${resolverEndpoint}?url=${encodeURIComponent(url)}`;
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        credentials: 'include'
      });

      const errorResponse = response.clone();
      const fallbackResponse = response.clone();

      if (!response.ok) {
        throw new Error(await this.extractResolverError(errorResponse));
      }

      let payload: ResolverResponse;
      try {
        payload = (await response.json()) as ResolverResponse;
      } catch {
        throw new Error(await this.extractResolverError(fallbackResponse));
      }

      if (!payload?.success || !payload.url) {
        throw new Error(payload?.error || 'Resolver returned an invalid response');
      }

      return payload.url;
    } catch (error) {
      console.error('Video URL extraction error:', error);
      const message = error instanceof Error ? error.message : 'Failed to get video URL';
      throw new Error(message);
    }
  }

  private getResolverEndpoint(): string {
    const browserEndpoint = (import.meta as any)?.env?.VITE_VIDEO_RESOLVER_URL;
    const serverEndpoint = typeof process !== 'undefined' ? process.env?.VIDEO_RESOLVER_URL : undefined;
    return (typeof browserEndpoint === 'string' && browserEndpoint.trim())
      ? browserEndpoint.trim()
      : (typeof serverEndpoint === 'string' && serverEndpoint.trim())
        ? serverEndpoint.trim()
        : '/api/video/resolve';
  }

  private async extractResolverError(response: Response): Promise<string> {
    try {
      const data = (await response.json()) as ResolverResponse;
      if (data?.error) {
        return data.error;
      }
    } catch {}

    try {
      const text = await response.text();
      if (text) {
        return text;
      }
    } catch {}

    return `Failed to resolve video URL (status ${response.status})`;
  }
}