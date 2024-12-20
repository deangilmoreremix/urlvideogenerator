import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-64 w-full items-center justify-center rounded-lg border border-gray-800 bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#E44E51]" />
        <p className="text-sm text-gray-400">Loading preview...</p>
      </div>
    </div>
  );
};