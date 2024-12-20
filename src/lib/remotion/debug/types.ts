export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface RenderingError extends Error {
  code?: string;
  details?: any;
}

export interface SystemInfo {
  nodeVersion: string;
  remotionVersion: string;
  os: string;
  browser: string;
}