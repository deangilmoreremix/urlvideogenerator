import { FetchError } from './types';

export class ContentFetchError extends Error implements FetchError {
  status?: number;
  retryAfter?: number;

  constructor(message: string, status?: number, retryAfter?: number) {
    super(message);
    this.name = 'ContentFetchError';
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export function handleFetchError(error: unknown): FetchError {
  if (error instanceof ContentFetchError) {
    return error;
  }

  if (error instanceof Error) {
    return new ContentFetchError(error.message);
  }

  return new ContentFetchError('An unknown error occurred while fetching content');
}