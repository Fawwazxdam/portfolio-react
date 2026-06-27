import React from 'react';

const Card = ({ children, className = '', animated = true }) => {
  return (
    <div className={`
      glass rounded-2xl p-6 shadow-lg
      ${animated ? 'transform hover:scale-[1.03] hover:shadow-xl transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;