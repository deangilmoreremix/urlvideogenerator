export interface WebsiteContent {
  html: string;
  screenshot: string | null;
  metadata: {
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
  };
}

export interface WebsitePreviewOptions {
  width?: number;
  height?: number;
  quality?: number;
  fullPage?: boolean;
}

export interface FetchError extends Error {
  status?: number;
  retryAfter?: number;
}