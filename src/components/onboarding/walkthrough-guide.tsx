import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Globe, Wand2, Settings, Download, 
  ChevronRight, ChevronLeft, X, Play
} from 'lucide-react';
import { Button } from '../ui/button';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Welcome to VideoGen AI',
    description: 'Create professional videos from any URL in minutes. Let\'s show you how it works!',
    icon: Video,
    position: 'center'
  },
  {
    id: 2,
    title: 'Enter Your URL',
    description: 'Start by pasting any URL you want to turn into a video. We support websites, social media posts, and more.',
    icon: Globe,
    target: '.url-input',
    position: 'bottom'
  },
  {
    id: 3,
    title: 'AI Enhancement',
    description: 'Our AI automatically analyzes your content and suggests the best video format, style, and transitions.',
    icon: Wand2,
    target: '.ai-assistant',
    position: 'right'
  },
  {
    id: 4,
    title: 'Customize Your Video',
    description: 'Fine-tune your video with our powerful editor. Adjust timing, add effects, or change the style.',
    icon: Settings,
    target: '.editor-panel',
    position: 'left'
  },
  {
    id: 5,
    title: 'Export and Share',
    description: 'When you\'re happy with your video, export it in various formats or share it directly to social media.',
    icon: Download,
    target: '.export-button',
    position: 'bottom'
  }
];

export const WalkthroughGuide = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenGuide, setHasSeenGuide] = useState(() => {
    return localStorage.getItem('hasVisitedBefore') === 'true';
  });

  // Check if it's the first visit
  React.useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setHasSeenGuide(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    setHasSeenGuide(true);
  };

  if (!isOpen || hasSeenGuide) {
    return null;
  }

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl rounded-lg bg-gray-900 p-6 shadow-xl"
          >
            <button
              onClick={handleSkip}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-full bg-[#E44E51]/10 p-3">
                <step.icon className="h-6 w-6 text-[#E44E51]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {steps.map((s, index) => (
                  <div
                    key={s.id}
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentStep ? 'bg-[#E44E51]' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="bg-[#E44E51] hover:bg-[#E44E51]/90"
              >
                {currentStep === steps.length - 1 ? (
                  'Get Started'
                ) : (
                  <>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};