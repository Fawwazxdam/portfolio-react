import React from 'react';

const Section = ({ id, title, icon: Icon, children, className = '' }) => {
  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {Icon && <Icon size={48} className="mx-auto mb-6 text-black/60 dark:text-white/60" />}
        <h2 className="text-4xl md:text-6xl font-mono font-black mb-14 text-center border-b border-black/15 dark:border-white/15 pb-4">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;