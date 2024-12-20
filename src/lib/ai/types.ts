export interface AIResponse {
  success: boolean;
  data?: string;
  error?: string | Error;
  metadata?: {
    model?: string;
    timestamp?: string;
    processingTime?: number;
  };
}

export interface AIServiceConfig {
  apiKey: string;
  endpoint?: string;
  model?: string;
  maxRetries?: number;
  timeout?: number;
}

export interface VoiceoverOptions {
  voice?: string;
  language?: string;
  style?: string;
  speed?: number;
  pitch?: number;
}