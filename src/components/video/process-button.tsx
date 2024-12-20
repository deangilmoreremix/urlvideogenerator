import React from 'react';
import { Play, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ProcessButtonProps {
  onClick: () => void;
  loading: boolean;
  progress?: number;
  disabled?: boolean;
  className?: string;
}

export const ProcessButton: React.FC<ProcessButtonProps> = ({
  onClick,
  loading,
  progress,
  disabled,
  className
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={`bg-[#E44E51] hover:bg-[#E44E51]/90 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing... {progress ? `${Math.round(progress)}%` : ''}
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Process Video
        </>
      )}
    </Button>
  );
};