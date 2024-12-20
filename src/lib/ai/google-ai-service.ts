import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIResponse } from './types';

const DEFAULT_MODEL = 'gemini-pro';
const MAX_RETRIES = 3;

export class GoogleAIService {
  private static instance: GoogleAIService;
  private client: GoogleGenerativeAI;

  private constructor() {
    this.client = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
  }

  static getInstance(): GoogleAIService {
    if (!this.instance) {
      this.instance = new GoogleAIService();
    }
    return this.instance;
  }

  async getStyleSuggestions(content: string): Promise<AIResponse> {
    try {
      const model = this.client.getGenerativeModel({ model: DEFAULT_MODEL });
      
      const prompt = `Analyze this content and suggest video styles, transitions, and effects that would work well:
        Content: ${content}
        
        Please provide suggestions for:
        1. Visual style and mood
        2. Transitions between scenes
        3. Special effects and animations
        4. Color schemes
        5. Timing and pacing`;

      const result = await this.retryWithBackoff(async () => {
        const response = await model.generateContent(prompt);
        return response.response;
      });

      return {
        success: true,
        data: result.text()
      };
    } catch (error) {
      console.error('Style suggestions error:', error);
      return {
        success: false,
        error: this.formatError(error)
      };
    }
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get style suggestions';
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
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
    throw new Error('All retries failed');
  }
}