import React, { useState } from 'react';
import { Sparkles, Wand2, MessageSquare, Brain, Palette, Music, Mic, TextSelect, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { AIFeatureModal, AIFeature } from './ai-feature-modal';

const aiFeatures: AIFeature[] = [
  {
    id: 'script',
    icon: MessageSquare,
    title: 'Script Generator',
    description: 'Generate engaging video scripts from any URL or topic',
    action: 'Generate Script'
  },
  {
    id: 'voiceover',
    icon: Mic,
    title: 'AI Voiceover',
    description: 'Convert text to natural-sounding speech in multiple languages',
    action: 'Create Voiceover'
  },
  {
    id: 'music',
    icon: Music,
    title: 'Music Composer',
    description: 'Generate custom background music that matches your video mood',
    action: 'Compose Music'
  },
  {
    id: 'style',
    icon: Palette,
    title: 'Style Assistant',
    description: 'Get AI suggestions for colors, fonts, and visual elements',
    action: 'Get Suggestions'
  },
  {
    id: 'enhance',
    icon: Wand2,
    title: 'Content Enhancer',
    description: 'Automatically improve video quality and engagement',
    action: 'Enhance Content'
  },
  {
    id: 'caption',
    icon: TextSelect,
    title: 'Smart Captions',
    description: 'Generate and translate captions in multiple languages',
    action: 'Add Captions'
  }
];

export const AIAssistant = () => {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-16 right-4 z-50 w-96"
      >
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#E44E51]" />
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
            </div>
            <Sparkles className="h-5 w-5 text-[#E44E51]" />
          </div>

          <div className="space-y-3">
            {aiFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.02 }}
                className="rounded-lg border border-gray-800 bg-gray-800/50 p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-[#E44E51]" />
                    <h4 className="font-medium text-white">{feature.title}</h4>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setSelectedFeature(feature)}
                    className="bg-[#E44E51] hover:bg-[#E44E51]/90"
                  >
                    {feature.action}
                  </Button>
                </div>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AIFeatureModal
        isOpen={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />
    </>
  );
};