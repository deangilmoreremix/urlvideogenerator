import { OpenAIService } from './openai-service';
import { GoogleAIService } from './google-ai-service';
import { VoiceoverService } from './voiceover-service';
import type { AIResponse } from './types';

export class AIService {
  private static instance: AIService;
  private openAI: OpenAIService;
  private googleAI: GoogleAIService;
  private voiceoverService: VoiceoverService;

  private constructor() {
    this.openAI = OpenAIService.getInstance();
    this.googleAI = GoogleAIService.getInstance();
    this.voiceoverService = VoiceoverService.getInstance();
  }

  static getInstance(): AIService {
    if (!this.instance) {
      this.instance = new AIService();
    }
    return this.instance;
  }

  async generateScript(input: string): Promise<AIResponse> {
    return this.openAI.generateScript(input);
  }

  async generateVoiceover(text: string, options = {}) {
    try {
      const audioUrl = await this.voiceoverService.generateVoiceover(text, options);
      
      return {
        success: true,
        audioUrl,
        duration: await this.getAudioDuration(audioUrl)
      };
    } catch (error) {
      console.error('Voiceover generation error:', error);
      return {
        success: false,
        error: 'Failed to generate voiceover'
      };
    }
  }

  async getStyleSuggestions(content: string): Promise<AIResponse> {
    return this.googleAI.getStyleSuggestions(content);
  }

  async enhanceContent(content: string): Promise<AIResponse> {
    return this.openAI.enhanceContent(content);
  }

  private async getAudioDuration(url: string): Promise<number> {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
    });
  }
}