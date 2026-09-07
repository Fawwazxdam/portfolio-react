import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseClasses = 'px-5 py-2.5 rounded-xl font-mono font-bold text-sm transition-all duration-300 transform hover:scale-105 btn-arcade';
  const variants = {
    primary: 'bg-arcade-orange text-white border-2 border-arcade-orange/30 hover:shadow-neon-orange hover:bg-arcade-orange/90',
    secondary: 'bg-gray-100 dark:bg-white/5 backdrop-blur-xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:shadow-lg',
    outline: 'bg-transparent text-arcade-orange border-2 border-arcade-orange/30 hover:bg-arcade-orange/10'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
