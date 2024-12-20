import { VideoContent, ParseResult } from './types';
import { sanitizeUrl } from '../website-preview';
import { fetchWebsiteContent } from '../website-preview';

export async function parseWebsiteUrl(url: string): Promise<ParseResult> {
  try {
    const sanitizedUrl = sanitizeUrl(url);
    const websiteContent = await fetchWebsiteContent(sanitizedUrl);
    
    const content: VideoContent = {
      title: websiteContent.metadata.title || 'Website Preview',
      description: websiteContent.metadata.description,
      url: sanitizedUrl,
      type: 'website',
      metadata: {
        ...websiteContent.metadata,
      },
      content: {
        html: websiteContent.html,
        media: websiteContent.screenshot ? [websiteContent.screenshot] : [],
      }
    };

    return {
      success: true,
      content
    };
  } catch (error) {
    console.error('Website parsing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse website'
    };
  }
}