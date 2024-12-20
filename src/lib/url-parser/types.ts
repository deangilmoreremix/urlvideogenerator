export interface VideoContent {
  title: string;
  description?: string;
  url: string;
  type: 'website' | 'social';
  metadata: {
    author?: string;
    date?: string;
    image?: string;
    favicon?: string;
  };
  content: {
    html?: string;
    text?: string;
    media?: string[];
  };
}

export interface ParseResult {
  success: boolean;
  content?: VideoContent;
  error?: string;
}