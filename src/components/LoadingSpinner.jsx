import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', size = 'h-32 w-32' }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono flex items-center justify-center">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-black dark:border-white mx-auto mb-4 ${size}`}></div>
        <p className="text-xl">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;