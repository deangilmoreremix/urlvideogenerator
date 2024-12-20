import OpenAI from 'openai';
import type { AIResponse } from './types';

const DEFAULT_MODEL = 'gpt-4';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class OpenAIService {
  private static instance: OpenAIService;
  private client: OpenAI;

  private constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });
  }

  static getInstance(): OpenAIService {
    if (!this.instance) {
      this.instance = new OpenAIService();
    }
    return this.instance;
  }

  async generateScript(input: string): Promise<AIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: "system", content: "You are a professional video script writer." },
          { role: "user", content: `Generate a video script for: ${input}` }
        ],
        max_tokens: 800,
        temperature: 0.7
      });

      return {
        success: true,
        data: response.choices[0].message.content || ''
      };
    } catch (error) {
      console.error('Script generation error:', error);
      return {
        success: false,
        error: this.formatError(error)
      };
    }
  }

  async enhanceContent(content: string): Promise<AIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: "system", content: "You are an expert video content enhancer." },
          { role: "user", content: `Enhance this video content by improving engagement, clarity, and visual appeal: ${content}` }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      return {
        success: true,
        data: response.choices[0].message.content || ''
      };
    } catch (error) {
      console.error('Content enhancement error:', error);
      return {
        success: false,
        error: this.formatError(error)
      };
    }
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      if ('status' in error) {
        return `API Error: ${error.message}`;
      }
      return error.message;
    }
    return 'An unexpected error occurred';
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, i)));
      }
    }
    throw new Error('All retries failed');
  }
}