import { bundle } from '@remotion/bundler';
import { VideoConfig } from '../url-parser/types';
import { SocialMediaTemplate } from '../../components/templates/social-media-template';

export interface GenerateVideoOptions extends VideoConfig {
  outputPath: string;
  quality?: number;
}

export async function generateSocialMediaVideo(
  content: any,
  options: GenerateVideoOptions
) {
  try {
    // Bundle the video template
    const bundled = await bundle(SocialMediaTemplate);

    // Return the bundled composition
    return {
      bundleId: bundled,
      composition: {
        id: `${content.type}-video`,
        width: options.width,
        height: options.height,
        fps: options.fps,
        durationInFrames: options.durationInFrames,
        props: { content }
      }
    };
  } catch (error) {
    console.error('Failed to generate video:', error);
    throw error;
  }
}