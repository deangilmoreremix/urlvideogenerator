import { VERSION as REMOTION_VERSION } from 'remotion';
import type { SystemInfo, RenderingError } from './types';
import { RemotionLogger } from './logger';

export class RemotionDiagnostics {
  private static instance: RemotionDiagnostics;
  private logger = RemotionLogger.getInstance();

  static getInstance(): RemotionDiagnostics {
    if (!this.instance) {
      this.instance = new RemotionDiagnostics();
    }
    return this.instance;
  }

  getSystemInfo(): SystemInfo {
    return {
      nodeVersion: process.version,
      remotionVersion: REMOTION_VERSION,
      os: this.getOS(),
      browser: this.getBrowser()
    };
  }

  async validateConfiguration(config: any): Promise<boolean> {
    try {
      // Validate essential configuration
      if (!config.width || !config.height) {
        throw new Error('Invalid dimensions');
      }
      if (!config.fps || config.fps < 1) {
        throw new Error('Invalid FPS');
      }
      if (!config.durationInFrames || config.durationInFrames < 1) {
        throw new Error('Invalid duration');
      }

      this.logger.info('Configuration validation passed');
      return true;
    } catch (error) {
      this.logger.error('Configuration validation failed', error);
      return false;
    }
  }

  async checkUrlContent(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`URL fetch failed: ${response.status}`);
      }
      return true;
    } catch (error) {
      this.logger.error('URL content check failed', error);
      return false;
    }
  }

  formatError(error: unknown): RenderingError {
    if (error instanceof Error) {
      return {
        ...error,
        code: this.getErrorCode(error),
        details: this.getErrorDetails(error)
      };
    }
    return new Error('Unknown error occurred');
  }

  private getOS(): string {
    if (typeof window !== 'undefined') {
      return window.navigator.platform;
    }
    return 'unknown';
  }

  private getBrowser(): string {
    if (typeof window !== 'undefined') {
      return window.navigator.userAgent;
    }
    return 'unknown';
  }

  private getErrorCode(error: Error): string {
    // Map common errors to codes
    if (error.message.includes('dimensions')) return 'INVALID_DIMENSIONS';
    if (error.message.includes('fps')) return 'INVALID_FPS';
    if (error.message.includes('duration')) return 'INVALID_DURATION';
    if (error.message.includes('URL')) return 'URL_ERROR';
    return 'UNKNOWN_ERROR';
  }

  private getErrorDetails(error: Error): any {
    return {
      stack: error.stack,
      timestamp: new Date().toISOString(),
      systemInfo: this.getSystemInfo()
    };
  }
}