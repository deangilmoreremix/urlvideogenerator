import { bundle } from '@remotion/bundler';
import { VideoConfig, VideoContent } from '../../url-parser/types';
import { WebsiteComposition } from '../../../components/preview/website-composition';
import { SocialMediaComposition } from '../compositions/social-media-composition';
import { RemotionLogger } from '../debug/logger';
import { animations, transitions, videoEffects } from '../animations';

export class CompositionBuilder {
  private static instance: CompositionBuilder;
  private logger = RemotionLogger.getInstance();

  static getInstance(): CompositionBuilder {
    if (!this.instance) {
      this.instance = new CompositionBuilder();
    }
    return this.instance;
  }

  async buildComposition(content: VideoContent, config: VideoConfig) {
    try {
      const Component = this.selectComponent(content);
      const bundled = await this.bundleComponent(Component);
      const props = this.buildProps(content);

      return {
        bundleId: bundled,
        composition: {
          id: `${content.type}-video`,
          width: config.width,
          height: config.height,
          fps: config.fps,
          durationInFrames: config.durationInFrames,
          defaultProps: props,
          Component
        }
      };
    } catch (error) {
      this.logger.error('Composition build failed', error);
      throw error;
    }
  }

  private selectComponent(content: VideoContent) {
    return content.type === 'social' 
      ? SocialMediaComposition 
      : WebsiteComposition;
  }

  private async bundleComponent(Component: React.ComponentType) {
    try {
      return await bundle(Component);
    } catch (error) {
      this.logger.error('Component bundling failed', error);
      throw error;
    }
  }

  private buildProps(content: VideoContent) {
    return {
      content,
      effects: {
        animation: 'bounce' as keyof typeof animations,
        transition: 'fade' as keyof typeof transitions,
        videoEffect: 'scale' as keyof typeof videoEffects
      }
    };
  }
}