import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export class VoiceoverService {
  private static instance: VoiceoverService;
  private speechConfig: sdk.SpeechConfig;

  private constructor() {
    // Initialize Azure Speech Service
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      import.meta.env.VITE_AZURE_SPEECH_KEY,
      import.meta.env.VITE_AZURE_SPEECH_REGION
    );
  }

  static getInstance(): VoiceoverService {
    if (!this.instance) {
      this.instance = new VoiceoverService();
    }
    return this.instance;
  }

  async generateVoiceover(text: string, options: {
    voice?: string;
    language?: string;
    style?: string;
  } = {}) {
    try {
      const {
        voice = 'en-US-JennyNeural',
        language = 'en-US',
        style = 'neutral'
      } = options;

      return await this.generateAzureVoiceover(text, voice, language, style);
    } catch (error) {
      console.error('Voiceover generation error:', error);
      throw error;
    }
  }

  private async generateAzureVoiceover(
    text: string,
    voice: string,
    language: string,
    style: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.speechConfig.speechSynthesisVoiceName = voice;
      this.speechConfig.speechSynthesisLanguage = language;

      const synthesizer = new sdk.SpeechSynthesizer(this.speechConfig);
      const ssml = this.generateSSML(text, voice, style);

      synthesizer.speakSsmlAsync(
        ssml,
        result => {
          if (result.audioData) {
            const audioUrl = URL.createObjectURL(
              new Blob([result.audioData], { type: 'audio/wav' })
            );
            resolve(audioUrl);
          } else {
            reject(new Error('No audio data generated'));
          }
          synthesizer.close();
        },
        error => {
          console.error('Azure speech synthesis error:', error);
          synthesizer.close();
          reject(error);
        }
      );
    });
  }

  private generateSSML(text: string, voice: string, style: string): string {
    return `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
        xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US">
        <voice name="${voice}">
          <mstts:express-as style="${style}">
            ${text}
          </mstts:express-as>
        </voice>
      </speak>
    `;
  }
}