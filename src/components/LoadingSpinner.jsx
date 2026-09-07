import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', size = 'h-32 w-32' }) => {
  return (
    <div className="min-h-screen gradient-mesh-light text-gray-900 dark:text-white font-mono flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-gray-300 dark:border-white/30 mx-auto mb-4 ${size}`}></div>
        <p className="text-xl text-gray-600 dark:text-white/60">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
