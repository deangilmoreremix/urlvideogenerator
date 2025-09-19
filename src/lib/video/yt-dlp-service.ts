const videoDownloaderSpecifier = './video-downloader' as const;

const importMetaEnv = (() => {
  try {
    return (import.meta as ImportMeta).env as Record<string, unknown> | undefined;
  } catch {
    return undefined;
  }
})();

const isNodeRuntime = typeof process !== 'undefined' && !!process.versions?.node;
const isNodeWithoutViteEnv = isNodeRuntime && !importMetaEnv;

const loadVideoDownloaderForNode = async () => {
  const dynamicImport = new Function(
    'specifier',
    'return import(specifier);'
  ) as (specifier: string) => Promise<typeof import('./video-downloader')>;
  return dynamicImport(videoDownloaderSpecifier);
};

const parseHtmlMetadata = (html: string) => {
  let title = 'Video';
  let thumbnail = '';

  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    title = doc.title || title;
    thumbnail =
      doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || thumbnail;
  } else {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch?.[1]) {
      title = titleMatch[1];
    }
    const ogImageMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogImageMatch?.[1]) {
      thumbnail = ogImageMatch[1];
    }
  }

  return { title, thumbnail };
};

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
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch video page: ${response.status}`);
      }

      const html = await response.text();
      const { title, thumbnail } = parseHtmlMetadata(html);

      return {
        success: true,
        url,
        title,
        duration: 0,
        thumbnail
      };
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
      if (import.meta.env?.SSR) {
        const { VideoDownloader } = await import('./video-downloader');
        return VideoDownloader.getInstance().getDirectVideoUrl(url);
      }

      if (isNodeWithoutViteEnv) {
        const { VideoDownloader } = await loadVideoDownloaderForNode();
        return VideoDownloader.getInstance().getDirectVideoUrl(url);
      }

      // For browser compatibility, return the original URL
      // The actual video processing will be handled by FFmpeg
      return url;
    } catch (error) {
      console.error('Video URL extraction error:', error);
      throw new Error('Failed to get video URL');
    }
  }
}