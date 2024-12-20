import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex h-64 w-full items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-sm text-red-500">{message}</p>
      </div>
    </div>
  );
};