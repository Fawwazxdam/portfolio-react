import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/support')}
      className="group fixed bottom-4 left-4 bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded-full shadow-lg transition-all duration-300 hover:px-4 z-50 flex items-center gap-2 cursor-pointer"
      aria-label="Support Me"
    >
      <Heart size={24} />
      <span className="hidden group-hover:inline text-sm font-medium">Support Me ☕</span>
    </button>
  );
};

export default FloatingButton;