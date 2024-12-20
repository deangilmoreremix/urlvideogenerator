export interface ProcessingOptions {
  quality?: number;
  format?: string;
  onProgress?: (progress: number) => void;
}

export interface VideoResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface VideoInfo {
  url: string;
  title: string;
  duration: number;
  thumbnail?: string;
}

export interface TranscodeOptions {
  quality?: number;
  onProgress?: (progress: number) => void;
}