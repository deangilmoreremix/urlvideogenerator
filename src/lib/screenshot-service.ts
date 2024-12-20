import { getStaticFiles } from 'remotion';

interface ScreenshotOptions {
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number;
}

export const getWebsiteScreenshot = async (url: string, options: ScreenshotOptions = {}) => {
  const {
    width = 1920,
    height = 1080,
    fullPage = false,
    quality = 100,
  } = options;

  // Replace with your preferred screenshot service
  const screenshotUrl = `https://api.urlbox.io/v1/APIKEY/png?url=${encodeURIComponent(
    url
  )}&width=${width}&height=${height}&format=png&quality=${quality}&full_page=${fullPage}&scroll_to_selector=body`;

  try {
    const response = await fetch(screenshotUrl);
    if (!response.ok) throw new Error('Failed to get screenshot');
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Screenshot error:', error);
    return null;
  }
};

export const getWebsiteFavicon = (url: string) => {
  try {
    const urlObj = new URL(url);
    return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(url)}&size=128`;
  } catch {
    return null;
  }
};

export const getWebsiteMetadata = async (url: string) => {
  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return {
      title: data.data.title,
      description: data.data.description,
      image: data.data.image?.url,
      favicon: data.data.logo?.url,
    };
  } catch {
    return null;
  }
};