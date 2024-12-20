import { WebsiteContent } from './types';

interface CacheEntry {
  content: WebsiteContent;
  timestamp: number;
  expiresAt: number;
}

export class ContentCache {
  private static instance: ContentCache;
  private cache: Map<string, CacheEntry> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): ContentCache {
    if (!this.instance) {
      this.instance = new ContentCache();
    }
    return this.instance;
  }

  set(key: string, content: WebsiteContent, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    this.cache.set(key, {
      content,
      timestamp: now,
      expiresAt: now + ttl
    });
  }

  get(key: string): WebsiteContent | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.content;
  }

  clear(): void {
    this.cache.clear();
  }

  prune(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}