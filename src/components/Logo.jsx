import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <span className={`font-black ${className}`}>
      &lt;ADAMF /&gt;
    </span>
  );
};

export default Logo;