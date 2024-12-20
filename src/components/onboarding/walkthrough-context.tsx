import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalkthroughContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  hasSeenGuide: boolean;
  setHasSeenGuide: (seen: boolean) => void;
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined);

export const WalkthroughProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [hasSeenGuide, setHasSeenGuide] = useState(() => {
    return localStorage.getItem('hasVisitedBefore') === 'true';
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  return (
    <WalkthroughContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isOpen,
        setIsOpen,
        hasSeenGuide,
        setHasSeenGuide,
      }}
    >
      {children}
    </WalkthroughContext.Provider>
  );
};

export const useWalkthrough = () => {
  const context = useContext(WalkthroughContext);
  if (context === undefined) {
    throw new Error('useWalkthrough must be used within a WalkthroughProvider');
  }
  return context;
};