import React from 'react';

const GlitchText = ({ children, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 animate-pulse opacity-70 text-gray-400 dark:text-gray-500" style={{animationDuration: '2s'}}>
        {children}
      </span>
    </span>
  );
};

export default GlitchText;