import React from 'react';
import { GlitchText, Logo } from './index.js';
import { Gamepad2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-200/80 dark:bg-arcade-darker/80 backdrop-blur-xl border-t border-arcade-orange/10 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gamepad2 size={16} className="text-arcade-orange" />
          <GlitchText>
            <Logo className="text-gray-900 dark:text-white" />
          </GlitchText>
        </div>
        <p className="text-xs text-gray-500 dark:text-white/40">© 2026 Adam Fawwaz. Crafted with ❤️ and lots of ☕</p>
      </div>
    </footer>
  );
};

export default Footer;
