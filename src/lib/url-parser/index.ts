import { parseWebsiteUrl } from './website-parser';
import { parseSocialMediaUrl } from './social-parser';
import { VideoContent, ParseResult } from './types';

export async function parseUrl(url: string): Promise<ParseResult> {
  try {
    // Determine URL type and parse accordingly
    if (url.match(/twitter\.com|instagram\.com|facebook\.com|linkedin\.com/i)) {
      return await parseSocialMediaUrl(url);
    } else {
      return await parseWebsiteUrl(url);
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse URL'
    };
  }
}

export * from './types';