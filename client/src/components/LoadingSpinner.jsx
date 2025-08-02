import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`flex justify-center items-center p-8 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400`}></div>
    </div>
  );
};

export default LoadingSpinner;