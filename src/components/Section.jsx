import React from 'react';

const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-mono font-black mb-12 text-center border-b-4 border-black dark:border-white pb-4">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;