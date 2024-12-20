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

export const isValidDomain = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    return hostname.includes('.') && hostname.length > 3;
  } catch {
    return false;
  }
};