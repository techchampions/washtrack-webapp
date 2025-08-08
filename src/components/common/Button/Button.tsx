import React from 'react';
import { ButtonProps } from './Button.types';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  loadingText = 'Loading...',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    ${loading ? 'cursor-wait' : ''}
  `;

  const variants = {
    primary: `
      bg-brand text-white border border-transparent
      disabled:hover:bg-gray-600
    `,
    secondary: `
      bg-gray-100 text-gray-900 border border-gray-300
      hover:bg-gray-200 focus:ring-gray-500
      disabled:hover:bg-gray-100
    `,
    outline: `
      bg-transparent text-indigo-600 border border-indigo-600
      hover:bg-indigo-50 focus:ring-indigo-500
      disabled:hover:bg-transparent
    `,
    ghost: `
      bg-transparent text-gray-700 border border-transparent
      hover:bg-gray-100 focus:ring-gray-500
      disabled:hover:bg-transparent
    `,
    danger: `
      bg-red-600 text-white border border-transparent
      hover:bg-red-700 focus:ring-red-500
      disabled:hover:bg-red-600
    `,
    success: `
      bg-green-600 text-white border border-transparent
      hover:bg-green-700 focus:ring-green-500
      disabled:hover:bg-green-600
    `,
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base',
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 mr-2">
            <DotLottieReact
              src="/lottie/loading.lottie"
              loop
              autoplay
            />
          </div>
          {loadingText}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export { Button };