import React from 'react';

const Card = ({ children, className = '', animated = true }) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-6
      ${animated ? 'transform hover:scale-105 hover:shadow-2xl dark:hover:shadow-gray-700 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;