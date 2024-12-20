export interface SocialMediaContent {
  type: 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'facebook';
  metadata: {
    title?: string;
    description?: string;
    author?: string;
    date?: string;
    likes?: number;
    shares?: number;
    comments?: number;
    media?: string[];
  };
  content: string;
  url: string;
}

export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}

export interface RenderConfig extends VideoConfig {
  outputPath: string;
  codec: 'h264' | 'h265' | 'vp8' | 'vp9';
  quality?: number;
}

export interface VideoResult {
  success: boolean;
  videoPath?: string;
  content?: SocialMediaContent;
  error?: string;
}