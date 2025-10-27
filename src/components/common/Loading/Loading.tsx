import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
  className = '',
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
    : `flex items-center justify-center ${className}`;

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizes[size]} flex items-center justify-center`}>
          <DotLottieReact
            src="/lottie/loading.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
        {text && (
          <p className={`text-gray-600 font-medium ${textSizes[size]}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};