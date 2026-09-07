import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, Gamepad2 } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import { GlitchText, Logo } from './index.js';

const Navbar = ({ showArticlesLink = true, currentPage = 'home' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'about', label: 'ABOUT', path: '/#about' },
    { name: 'projects', label: 'PROJECTS', path: '/projects' },
  ];

  if (showArticlesLink) {
    navItems.push({ name: 'articles', label: 'ARTICLES', path: '/articles' });
  }

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    if (item.path.startsWith('/#') && currentPage === 'home') {
      const sectionId = item.path.substring(2);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          {/* <Gamepad2 size={20} className="text-arcade-orange" /> */}
          <GlitchText>
            <Logo />
          </GlitchText>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item)}
              className={`text-xs font-pixel tracking-wider hover:scale-110 transition-transform ${
                currentPage === item.name ? 'text-arcade-orange neon-orange' : 'text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-500 dark:text-white/60"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-arcade-darker/95 backdrop-blur-xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item)}
              className="block w-full py-3 px-4 text-xs font-pixel tracking-wider text-gray-500 dark:text-white/60 hover:text-arcade-orange hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
