import React from 'react';
import { Globe } from 'lucide-react';

interface VideoInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const VideoInput: React.FC<VideoInputProps> = ({
  value,
  onChange,
  className,
  placeholder = 'Enter video URL...'
}) => {
  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <Globe className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51] ${className}`}
      />
    </div>
  );
};