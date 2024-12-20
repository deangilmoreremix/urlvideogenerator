import { VideoConfig, VideoContent } from '../url-parser/types';
import { RemotionLogger } from './debug/logger';
import { ConfigValidator } from './video/config-validator';
import { ContentValidator } from './video/content-validator';
import { CompositionBuilder } from './video/composition-builder';

export interface GenerateVideoOptions extends VideoConfig {
  outputPath: string;
  quality?: number;
  logLevel?: 'error' | 'warn' | 'info' | 'debug';
}

export async function generateVideo(
  content: VideoContent,
  options: GenerateVideoOptions
) {
  try {
    const logger = RemotionLogger.getInstance();
    const configValidator = ConfigValidator.getInstance();
    const contentValidator = ContentValidator.getInstance();
    const compositionBuilder = CompositionBuilder.getInstance();
    
    if (options.logLevel) {
      logger.setLogLevel(options.logLevel);
    }

    logger.info('Starting video generation', { content, options });

    // Validate config and content
    if (!configValidator.validateConfig(options)) {
      throw new Error('Invalid configuration');
    }

    if (!await contentValidator.validateContent(content)) {
      throw new Error('Invalid content');
    }

    // Build composition
    return await compositionBuilder.buildComposition(content, options);
  } catch (error) {
    const logger = RemotionLogger.getInstance();
    logger.error('Video generation failed', error);
    throw error;
  }
}

export async function renderVideo(
  content: VideoContent,
  options: GenerateVideoOptions
) {
  try {
    const { bundleId, composition } = await generateVideo(content, options);

    // Return composition details for preview
    return {
      success: true,
      composition: {
        ...composition,
        bundleId,
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to render video'
    };
  }
}