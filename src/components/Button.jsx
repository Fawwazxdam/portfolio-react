import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-xl font-mono font-bold transition-all duration-300 transform hover:scale-105';
  const variants = {
    primary: 'bg-black dark:bg-white text-white dark:text-black border-2 border-black/20 dark:border-white/20 hover:shadow-lg',
    secondary: 'bg-white/45 dark:bg-white/8 backdrop-blur-xl saturate-150 text-black dark:text-white border border-white/50 dark:border-white/12 hover:shadow-lg hover:bg-white/55 dark:hover:bg-white/12',
    outline: 'bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'
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