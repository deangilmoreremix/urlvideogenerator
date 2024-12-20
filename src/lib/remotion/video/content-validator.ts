import { VideoContent } from '../../url-parser/types';
import { RemotionLogger } from '../debug/logger';
import { validateUrl } from '../../website-preview/utils';

export class ContentValidator {
  private static instance: ContentValidator;
  private logger = RemotionLogger.getInstance();

  static getInstance(): ContentValidator {
    if (!this.instance) {
      this.instance = new ContentValidator();
    }
    return this.instance;
  }

  async validateContent(content: VideoContent): Promise<boolean> {
    try {
      this.validateBasicFields(content);
      await this.validateUrl(content.url);
      return true;
    } catch (error) {
      this.logger.error('Content validation failed', error);
      return false;
    }
  }

  private validateBasicFields(content: VideoContent) {
    if (!content.title) {
      throw new Error('Missing title');
    }
    if (!content.type) {
      throw new Error('Missing content type');
    }
    if (!['website', 'social'].includes(content.type)) {
      throw new Error('Invalid content type');
    }
  }

  private async validateUrl(url: string): Promise<void> {
    if (!validateUrl(url)) {
      throw new Error('Invalid URL format');
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`URL fetch failed: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`URL validation failed: ${error.message}`);
    }
  }
}