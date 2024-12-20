import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, AlertCircle, CheckCircle, MessageSquare, Wand2, Brain, Palette, Music, Mic, TextSelect } from 'lucide-react';
import { AIService } from '../../lib/ai/ai-service';

export interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
}

interface AIFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: AIFeature | null;
}

export const AIFeatureModal: React.FC<AIFeatureModalProps> = ({
  isOpen,
  onClose,
  feature
}) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!feature) {
    return null;
  }

  const Icon = feature.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const aiService = AIService.getInstance();
      let response;

      switch (feature.id) {
        case 'script':
          response = await aiService.generateScript(input);
          break;
        case 'voiceover':
          response = await aiService.generateVoiceover(input);
          break;
        case 'style':
          response = await aiService.getStyleSuggestions(input);
          break;
        case 'enhance':
          response = await aiService.enhanceContent(input);
          break;
        default:
          throw new Error('Unknown feature');
      }

      if (response.success) {
        setResult(response);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-lg bg-gray-900 p-6"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-lg bg-[#E44E51]/10 p-2">
            <Icon className="h-6 w-6 text-[#E44E51]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">
              {feature.id === 'script' ? 'Content or Topic' :
               feature.id === 'voiceover' ? 'Text for Voiceover' :
               feature.id === 'style' ? 'Content Description' :
               'Content to Enhance'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full rounded-lg bg-[#E44E51] px-4 py-2 font-medium text-white hover:bg-[#E44E51]/90 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              feature.action
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 p-4 text-red-500">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-lg border border-gray-800 bg-gray-800/50 p-4"
          >
            <div className="mb-2 flex items-center gap-2 text-[#E44E51]">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Generated Successfully</span>
            </div>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-300">
              {JSON.stringify(result, null, 2)}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};