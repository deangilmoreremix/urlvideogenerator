import { SocialMediaContent } from './types';

export const parseTwitterUrl = async (url: string): Promise<SocialMediaContent> => {
  try {
    const tweetId = url.split('/status/')[1]?.split('?')[0];
    if (!tweetId) throw new Error('Invalid Twitter URL');

    // Since we don't have direct API access, let's extract content from the URL
    return {
      type: 'twitter',
      metadata: {
        title: 'Twitter Post',
        author: 'Twitter User',
        date: new Date().toISOString(),
        media: [],
      },
      content: 'Twitter content will be displayed here',
      url
    };
  } catch (error) {
    throw new Error('Failed to parse Twitter URL');
  }
};

export const parseInstagramUrl = async (url: string): Promise<SocialMediaContent> => {
  try {
    const postId = url.split('/p/')[1]?.split('/')[0];
    if (!postId) throw new Error('Invalid Instagram URL');

    // Since we don't have direct API access, let's extract content from the URL
    return {
      type: 'instagram',
      metadata: {
        title: 'Instagram Post',
        author: 'Instagram User',
        date: new Date().toISOString(),
        media: [],
      },
      content: 'Instagram content will be displayed here',
      url
    };
  } catch (error) {
    throw new Error('Failed to parse Instagram URL');
  }
};

export const parseSocialMediaUrl = async (url: string): Promise<SocialMediaContent> => {
  try {
    if (url.includes('twitter.com')) {
      return parseTwitterUrl(url);
    } else if (url.includes('instagram.com')) {
      return parseInstagramUrl(url);
    }
    throw new Error('Unsupported social media platform');
  } catch (error) {
    throw new Error(`Failed to parse social media URL: ${error.message}`);
  }
};