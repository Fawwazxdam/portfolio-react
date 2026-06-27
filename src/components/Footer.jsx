import React from 'react';
import { GlitchText, Logo } from './index.js';

const Footer = () => {
  return (
    <footer className="bg-black/85 dark:bg-black/40 backdrop-blur-xl border-t border-white/10 dark:border-white/10 text-white py-10 px-4 mt-auto shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-2xl font-black mb-4">
          <GlitchText>
            <Logo className="text-white" />
          </GlitchText>
        </div>
        <p className="text-lg text-white/50">© 2024 Adam Fawwaz. Crafted with ❤️ and lots of ☕</p>
      </div>
    </footer>
  );
};

export default Footer;
