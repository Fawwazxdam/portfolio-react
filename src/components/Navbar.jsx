import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import { GlitchText, Logo } from './index.js';

const Navbar = ({ showArticlesLink = true, currentPage = 'home' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    // { name: 'home', label: 'HOME', path: '/' },
    { name: 'about', label: 'ABOUT', path: '/#about' },
    // { name: 'skills', label: 'SKILLS', path: '/#skills' },
    { name: 'projects', label: 'PROJECTS', path: '/projects' },
    // { name: 'contact', label: 'CONTACT', path: '/#contact' },
  ];

  if (showArticlesLink) {
    navItems.push({ name: 'articles', label: 'ARTICLES', path: '/articles' });
  }

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    if (item.path.startsWith('/#') && currentPage === 'home') {
      // Scroll to section on home page
      const sectionId = item.path.substring(2);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b-4 border-black dark:border-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black hover:scale-105 transition-transform">
          <GlitchText>
            <Logo />
          </GlitchText>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item)}
              className={`font-bold uppercase tracking-wider hover:scale-110 transition-transform ${
                currentPage === item.name ? 'border-b-2 border-black dark:border-white' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-black dark:text-white" /> : <Menu size={24} className="text-black dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-white bg-white dark:bg-gray-900">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item)}
              className="block w-full py-4 px-4 font-bold uppercase tracking-wider text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
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