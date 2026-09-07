import React from 'react';
import { Check, Play } from 'lucide-react';

const colorMap = {
  orange: {
    border: 'border-arcade-orange/30',
    glow: 'border-neon-orange',
    bg: 'bg-arcade-orange/10',
    text: 'text-arcade-orange',
    hoverBg: 'hover:bg-arcade-orange/20',
    shadow: 'shadow-neon-orange',
    icon: 'text-arcade-orange',
  },
  purple: {
    border: 'border-arcade-purple/30',
    glow: 'border-neon-purple',
    bg: 'bg-arcade-purple/10',
    text: 'text-arcade-purple',
    hoverBg: 'hover:bg-arcade-purple/20',
    shadow: 'shadow-neon-purple',
    icon: 'text-arcade-purple',
  },
  cyan: {
    border: 'border-arcade-cyan/30',
    glow: 'border-neon-cyan',
    bg: 'bg-arcade-cyan/10',
    text: 'text-arcade-cyan',
    hoverBg: 'hover:bg-arcade-cyan/20',
    shadow: 'shadow-neon-cyan',
    icon: 'text-arcade-cyan',
  },
  pink: {
    border: 'border-arcade-pink/30',
    glow: 'border-neon-pink',
    bg: 'bg-arcade-pink/10',
    text: 'text-arcade-pink',
    hoverBg: 'hover:bg-arcade-pink/20',
    shadow: 'shadow-neon-pink',
    icon: 'text-arcade-pink',
  },
};

const GameCard = ({ game, onPlay, isCompleted }) => {
  const colors = colorMap[game.color];
  const IconComponent = game.icon;

  return (
    <div
      className={`
        glass rounded-2xl p-6 cursor-pointer cabinet-hover
        border ${isCompleted ? colors.border : 'border-gray-200 dark:border-white/10'}
        ${isCompleted ? '' : colors.glow}
        group relative overflow-hidden
      `}
      onClick={() => onPlay(game.id)}
    >
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon}`}>
            <IconComponent size={28} />
          </div>
          {isCompleted && (
            <div className={`p-2 rounded-full ${colors.bg}`}>
              <Check size={16} className={colors.text} />
            </div>
          )}
        </div>

        <h3 className={`font-pixel text-xs ${colors.text} mb-3`}>
          {game.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-white/50 mb-4 leading-relaxed">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wider">
            {game.section}
          </span>
          <div className={`flex items-center gap-2 ${colors.text} text-sm font-bold group-hover:gap-3 transition-all duration-300`}>
            <span className="text-xs">{isCompleted ? 'REPLAY' : 'PLAY'}</span>
            <Play size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
