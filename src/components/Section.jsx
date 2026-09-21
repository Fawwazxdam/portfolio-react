import React from 'react';

export const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center mb-10">
    {Icon && <Icon size={40} weight="duotone" className="mx-auto mb-4 text-arcade-orange" />}
    <h2 className="font-pixel text-lg md:text-xl text-arcade-orange neon-orange mb-2">
      {title}
    </h2>
    {subtitle && <p className="text-sm text-gray-400 dark:text-white/40">{subtitle}</p>}
  </div>
);

const Section = ({ id, title, icon, subtitle, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader icon={icon} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
};

export default Section;
