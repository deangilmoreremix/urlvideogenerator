import { delayRender, continueRender } from 'remotion';
import { fetchWebsiteContent } from '../website-preview';
import type { VideoContent } from '../url-parser/types';

interface FetchOptions {
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
}

export class RemotionContentFetcher {
  private static instance: RemotionContentFetcher;
  private fetchHandles: Set<number> = new Set();

  private constructor() {}

  static getInstance(): RemotionContentFetcher {
    if (!this.instance) {
      this.instance = new RemotionContentFetcher();
    }
    return this.instance;
  }

  async fetchContent(url: string, options: FetchOptions = {}): Promise<VideoContent> {
    const handle = delayRender();
    this.fetchHandles.add(handle);

    try {
      const controller = new AbortController();
      const timeoutId = options.timeout 
        ? setTimeout(() => controller.abort(), options.timeout)
        : null;

      const content = await fetchWebsiteContent(url);

      if (timeoutId) clearTimeout(timeoutId);

      return {
        title: content.metadata.title || 'Website Preview',
        description: content.metadata.description,
        url,
        type: 'website',
        metadata: {
          ...content.metadata,
        },
        content: {
          html: content.html,
          media: content.screenshot ? [content.screenshot] : [],
        }
      };
    } catch (error) {
      console.error('Remotion content fetch error:', error);
      throw error;
    } finally {
      this.fetchHandles.delete(handle);
      continueRender(handle);
    }
  }

  cancelAllFetches() {
    for (const handle of this.fetchHandles) {
      continueRender(handle);
      this.fetchHandles.delete(handle);
    }
  }
}