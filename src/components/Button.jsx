import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-none border-2 font-mono font-bold transition-all duration-300 transform hover:scale-105';
  const variants = {
    primary: 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white',
    secondary: 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black',
    outline: 'bg-transparent text-black dark:text-white border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
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