export interface WebsiteMetadata {
  title: string;
  description: string;
  image: string;
  favicon: string;
  author: string;
  url: string;
  type: string;
}

export interface MetadataResult {
  success: boolean;
  metadata?: WebsiteMetadata;
  error?: string;
}