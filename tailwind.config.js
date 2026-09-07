/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        arcade: {
          orange: '#FF6B35',
          purple: '#7B2FBE',
          cyan: '#00D4AA',
          pink: '#FF3E8A',
          yellow: '#FFD93D',
          dark: '#0A0A1A',
          darker: '#050510',
        },
      },
      boxShadow: {
        'neon-orange': '0 0 10px rgba(255, 107, 53, 0.5), 0 0 30px rgba(255, 107, 53, 0.2)',
        'neon-purple': '0 0 10px rgba(123, 47, 190, 0.5), 0 0 30px rgba(123, 47, 190, 0.2)',
        'neon-cyan': '0 0 10px rgba(0, 212, 170, 0.5), 0 0 30px rgba(0, 212, 170, 0.2)',
        'neon-pink': '0 0 10px rgba(255, 62, 138, 0.5), 0 0 30px rgba(255, 62, 138, 0.2)',
        'neon-yellow': '0 0 10px rgba(255, 217, 61, 0.5), 0 0 30px rgba(255, 217, 61, 0.2)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
        'pop-in': 'pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
