import { getMetadata } from 'html-metadata-parser';
import { validateUrl } from '../utils';
import type { WebsiteMetadata } from './types';

export class MetadataService {
  private static instance: MetadataService;
  private cache = new Map<string, WebsiteMetadata>();

  private constructor() {}

  static getInstance(): MetadataService {
    if (!this.instance) {
      this.instance = new MetadataService();
    }
    return this.instance;
  }

  async getMetadata(url: string): Promise<WebsiteMetadata> {
    if (!validateUrl(url)) {
      throw new Error('Invalid URL provided');
    }

    // Check cache first
    const cached = this.cache.get(url);
    if (cached) {
      return cached;
    }

    try {
      const result = await getMetadata(url);
      
      const metadata: WebsiteMetadata = {
        title: result.meta.title || result.og.title || '',
        description: result.meta.description || result.og.description || '',
        image: result.og.image || result.meta.image || '',
        favicon: result.og.favicon || this.getFallbackFavicon(url),
        author: result.meta.author || result.og.site_name || '',
        url: result.og.url || url,
        type: result.og.type || 'website',
      };

      // Cache the result
      this.cache.set(url, metadata);

      return metadata;
    } catch (error) {
      console.error('Metadata fetch error:', error);
      return this.getFallbackMetadata(url);
    }
  }

  private getFallbackFavicon(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return '';
    }
  }

  private getFallbackMetadata(url: string): WebsiteMetadata {
    return {
      title: 'Website Preview',
      description: 'No description available',
      image: '',
      favicon: this.getFallbackFavicon(url),
      author: '',
      url,
      type: 'website',
    };
  }
}