import React from 'react';
import { motion } from 'framer-motion';

interface HighlightProps {
  children: React.ReactNode;
  active: boolean;
}

export const Highlight: React.FC<HighlightProps> = ({ children, active }) => {
  return (
    <div className="relative">
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-lg ring-2 ring-[#E44E51] ring-offset-2 ring-offset-gray-900"
        />
      )}
      {children}
    </div>
  );
};