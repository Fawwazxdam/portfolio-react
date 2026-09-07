import React from 'react';
import { X, SkipForward } from 'lucide-react';

const GameWrapper = ({ title, color = 'orange', onClose, onSkip, children }) => {
  const colorClasses = {
    orange: 'text-arcade-orange border-arcade-orange/30',
    purple: 'text-arcade-purple border-arcade-purple/30',
    cyan: 'text-arcade-cyan border-arcade-cyan/30',
    pink: 'text-arcade-pink border-arcade-pink/30',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/95 dark:bg-arcade-darker/95 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-gray-200 dark:border-white/10 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
          <h2 className={`font-pixel text-sm ${colorClasses[color]}`}>
            {title}
          </h2>
          <div className="flex items-center gap-2">
            {onSkip && (
              <button
                onClick={onSkip}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70 transition-all text-xs"
              >
                <SkipForward size={14} />
                <span className="hidden sm:inline">SKIP</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameWrapper;
