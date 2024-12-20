import { delayRender, continueRender } from 'remotion';
import { sanitizeUrl } from './utils';
import { WebsiteContent } from './types';
import { getFallbackContent } from './fallbacks';
import { ContentCache } from './cache';
import { MetadataService } from '../metadata';
import { ProgressTracker } from './progress-tracker';
import { ContentFetchError, handleFetchError } from './error-handler';
import fetch from 'cross-fetch';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';

// Use multiple CORS proxies for redundancy
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-anywhere.herokuapp.com/'
];

export const fetchWebsiteContent = async (
  url: string,
  options: {
    useCache?: boolean;
    onProgress?: (progress: number) => void;
    timeout?: number;
    retries?: number;
  } = {}
): Promise<WebsiteContent> => {
  const handle = delayRender();
  const cache = ContentCache.getInstance();
  const progressTracker = ProgressTracker.getInstance();
  const fetchId = `fetch-${Date.now()}`;

  const metadataService = MetadataService.getInstance();

  try {
    const validatedUrl = sanitizeUrl(url);
    
    // Check cache first
    if (options.useCache) {
      const cachedContent = cache.get(validatedUrl);
      if (cachedContent) {
        if (options.onProgress) options.onProgress(100);
        return cachedContent;
      }
    }

    // Add progress listener
    if (options.onProgress) {
      progressTracker.addListener(fetchId, options.onProgress);
    }

    let lastError: Error | null = null;
    const maxRetries = options.retries || 3;
    const timeout = options.timeout || 30000;

    // Try each proxy in sequence
    for (let retry = 0; retry < maxRetries; retry++) {
      for (const proxy of CORS_PROXIES) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);

          const response = await fetch(`${proxy}${encodeURIComponent(validatedUrl)}`, {
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new ContentFetchError('Failed to fetch content', response.status);
          }

          const data = await response.json();
          const html = proxy.includes('allorigins') ? data.contents : data;

          progressTracker.updateProgress(fetchId, 30);

          // Get metadata using html-metadata-parser
          const metadata = await metadataService.getMetadata(validatedUrl);

          progressTracker.updateProgress(fetchId, 60);

          const content: WebsiteContent = {
            html,
            screenshot: await getWebsiteScreenshot(validatedUrl),
            metadata
          };

          // Cache the result
          if (options.useCache) {
            cache.set(validatedUrl, content);
          }

          if (options.onProgress) {
            progressTracker.updateProgress(fetchId, 100);
          }

          return content;
        } catch (error) {
          lastError = error as Error;
          console.warn(`Proxy ${proxy} failed:`, error);
          continue;
        }
      }
    }

    throw lastError || new Error('All proxies failed');
  } catch (error) {
    const handledError = handleFetchError(error);
    console.error('Website content fetch failed:', handledError);
    return getFallbackContent(url);
  } finally {
    if (options.onProgress) {
      progressTracker.clearListeners(fetchId);
    }
    continueRender(handle);
  }
};

async function getWebsiteScreenshot(url: string): Promise<string | null> {
  try {
    const screenshotUrl = `https://api.microlink.io/v1/screenshot?url=${encodeURIComponent(url)}&waitUntil=networkidle0&overlay.browser=true`;
    const response = await fetch(screenshotUrl);
    if (response.ok) {
      return screenshotUrl;
    }
    throw new Error('Screenshot service failed');
  } catch (e) {
    console.warn('Screenshot generation failed:', e);
    return null;
  }
}

function getFallbackFavicon(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return '';
  }
}