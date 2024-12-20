import { parseSocialMediaUrl } from './parsers';
import { generateSocialMediaVideo } from './video-generator';
import type { VideoResult } from './types';

export const createSocialMediaVideo = async (url: string, outputPath: string): Promise<VideoResult> => {
  try {
    // Parse the social media content
    const content = await parseSocialMediaUrl(url);

    // Generate the video with default HD settings
    const videoPath = await generateSocialMediaVideo(content, {
      width: 1920,
      height: 1080,
      fps: 30,
      durationInFrames: 300,
      outputPath,
      codec: 'h264',
      quality: 1,
    });

    return {
      success: true,
      videoPath,
      content,
    };
  } catch (error) {
    console.error('Failed to create social media video:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export * from './types';
export * from './parsers';
export * from './video-generator';