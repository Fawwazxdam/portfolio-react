import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', size = 'h-32 w-32' }) => {
  return (
    <div className="min-h-screen gradient-mesh-light text-black dark:text-white font-mono flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-black/30 dark:border-white/30 mx-auto mb-4 ${size}`}></div>
        <p className="text-xl text-black/60 dark:text-white/60">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;