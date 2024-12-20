import { VideoConfig } from '../../url-parser/types';
import { RemotionLogger } from '../debug/logger';

export class ConfigValidator {
  private static instance: ConfigValidator;
  private logger = RemotionLogger.getInstance();

  static getInstance(): ConfigValidator {
    if (!this.instance) {
      this.instance = new ConfigValidator();
    }
    return this.instance;
  }

  validateConfig(config: VideoConfig): boolean {
    try {
      this.validateDimensions(config);
      this.validateFrameRate(config);
      this.validateDuration(config);
      return true;
    } catch (error) {
      this.logger.error('Configuration validation failed', error);
      return false;
    }
  }

  private validateDimensions(config: VideoConfig) {
    if (!config.width || config.width < 1) {
      throw new Error('Invalid width');
    }
    if (!config.height || config.height < 1) {
      throw new Error('Invalid height');
    }
    if (config.width > 7680 || config.height > 4320) {
      throw new Error('Dimensions exceed maximum allowed (8K)');
    }
  }

  private validateFrameRate(config: VideoConfig) {
    if (!config.fps || config.fps < 1) {
      throw new Error('Invalid FPS');
    }
    if (config.fps > 120) {
      throw new Error('FPS exceeds maximum allowed (120)');
    }
  }

  private validateDuration(config: VideoConfig) {
    if (!config.durationInFrames || config.durationInFrames < 1) {
      throw new Error('Invalid duration');
    }
    const maxFrames = 60 * 60 * config.fps; // 1 hour max
    if (config.durationInFrames > maxFrames) {
      throw new Error('Duration exceeds maximum allowed (1 hour)');
    }
  }
}