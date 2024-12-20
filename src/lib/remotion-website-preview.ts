import { continueRender, delayRender } from 'remotion';

interface WebsiteMetadata {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
}

export const fetchWebsiteMetadata = async (url: string): Promise<WebsiteMetadata> => {
  const handle = delayRender();

  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    return {
      title: data.data.title,
      description: data.data.description,
      image: data.data.image?.url,
      favicon: data.data.logo?.url,
    };
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return {};
  } finally {
    continueRender(handle);
  }
};

export const getWebsiteScreenshot = (url: string) => {
  return `https://api.microlink.io/v1/screenshot?url=${encodeURIComponent(url)}&waitUntil=networkidle0&overlay.browser=true&element=body`;
};

export const validateWebsiteUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeWebsiteUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};