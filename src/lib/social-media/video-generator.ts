import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { SocialMediaContent, RenderConfig } from './types';
import path from 'path';

export const generateSocialMediaVideo = async (
  content: SocialMediaContent,
  config: RenderConfig
) => {
  // Bundle the video template
  const bundled = await bundle(path.join(process.cwd(), './src/components/templates/social-media-template.tsx'));

  // Select the appropriate composition
  const composition = await selectComposition({
    serveUrl: bundled,
    id: `${content.type}-composition`,
    inputProps: {
      content,
    },
  });

  // Render the video
  await renderMedia({
    codec: config.codec,
    composition,
    serveUrl: bundled,
    outputLocation: config.outputPath,
    inputProps: {
      content,
    },
    imageFormat: 'jpeg',
  });

  return config.outputPath;
};