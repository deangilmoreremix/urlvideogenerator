import React from 'react';
import { motion } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  position,
  className = ''
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'top-full mt-2';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`absolute z-50 w-64 rounded-lg bg-gray-900 p-4 shadow-xl ${getPositionStyles()} ${className}`}
    >
      {children}
    </motion.div>
  );
};