import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <span className={`font-pixel text-xs ${className}`}>
      &lt;ADAMF /&gt;
    </span>
  );
};

export default Logo;
