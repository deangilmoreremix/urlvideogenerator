import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}