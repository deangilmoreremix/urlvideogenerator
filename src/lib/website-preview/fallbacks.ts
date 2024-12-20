import { WebsiteContent } from './types';

export const generateFallbackHtml = (url: string): string => {
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

export const getFallbackContent = (url: string): WebsiteContent => {
  return {
    html: generateFallbackHtml(url),
    screenshot: null,
    metadata: {
      title: 'Website Preview',
      description: 'Content currently unavailable',
      favicon: `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&sz=128`,
    },
  };
};