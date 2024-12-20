import { delayRender, continueRender } from 'remotion';

interface WebsiteContent {
  html: string;
  screenshot: string | null;
  metadata: {
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
  };
}

export const fetchWebsiteContent = async (url: string): Promise<WebsiteContent> => {
  const handle = delayRender();

  try {
    // Validate URL before proceeding
    const validatedUrl = sanitizeUrl(url);

    // Fetch metadata with fallback
    let metadata = {};
    try {
      const metadataResponse = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(validatedUrl)}`
      );
      if (metadataResponse.ok) {
        const data = await metadataResponse.json();
        metadata = {
          title: data.data?.title || 'Website Preview',
          description: data.data?.description || 'No description available',
          image: data.data?.image?.url,
          favicon: data.data?.logo?.url || getFallbackFavicon(validatedUrl),
        };
      }
    } catch (e) {
      console.warn('Metadata fetch failed:', e);
      metadata = {
        title: 'Website Preview',
        description: 'No description available',
        favicon: getFallbackFavicon(validatedUrl),
      };
    }

    // Get screenshot with fallback
    const screenshot = await getWebsiteScreenshot(validatedUrl);

    // Get HTML content with fallback
    let html = '';
    try {
      const response = await fetch(validatedUrl);
      if (response.ok) {
        html = await response.text();
      } else {
        throw new Error('Failed to fetch HTML');
      }
    } catch (e) {
      console.warn('HTML fetch failed:', e);
      html = generateFallbackHtml(validatedUrl);
    }

    return {
      html,
      screenshot,
      metadata: metadata as WebsiteContent['metadata'],
    };
  } catch (error) {
    console.error('Website content fetch failed:', error);
    return getFallbackContent(url);
  } finally {
    continueRender(handle);
  }
};

const getFallbackFavicon = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return '';
  }
};

const getWebsiteScreenshot = async (url: string): Promise<string | null> => {
  try {
    // Using a reliable screenshot service
    const screenshotUrl = `https://api.microlink.io/v1/screenshot?url=${encodeURIComponent(url)}&waitUntil=networkidle0&overlay.browser=true`;
    const response = await fetch(screenshotUrl);
    if (response.ok) {
      return screenshotUrl;
    }
    throw new Error('Screenshot service failed');
  } catch (e) {
    console.warn('Screenshot generation failed:', e);
    return null;
  }
};

const generateFallbackHtml = (url: string): string => {
  return `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #f8f9fa;
      color: #343a40;
      padding: 2rem;
      text-align: center;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h2 style="margin: 1rem 0; font-size: 1.5rem;">Unable to Load Content</h2>
      <p style="margin: 0; color: #6c757d;">The content from ${url} is currently unavailable.</p>
      <p style="margin: 0.5rem 0; color: #6c757d;">Please try again later or check the URL.</p>
    </div>
  `;
};

const getFallbackContent = (url: string): WebsiteContent => {
  return {
    html: generateFallbackHtml(url),
    screenshot: null,
    metadata: {
      title: 'Website Preview',
      description: 'Content currently unavailable',
      favicon: getFallbackFavicon(url),
    },
  };
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  let sanitized = url.trim();
  if (!sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    sanitized = `https://${sanitized}`;
  }
  
  try {
    return new URL(sanitized).toString();
  } catch {
    throw new Error('Invalid URL');
  }
};