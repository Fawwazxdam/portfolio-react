import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/support')}
      className="group fixed bottom-4 left-4 bg-red-500/70 backdrop-blur-xl hover:bg-red-500 text-white px-3 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:px-4 flex items-center gap-2 cursor-pointer border border-red-400/30"
      style={{ zIndex: 9999 }}
      aria-label="Support Me"
    >
      <Heart size={24} />
      <span className="hidden group-hover:inline text-sm font-medium">Support Me ☕</span>
    </button>
  );
};

export default FloatingButton;