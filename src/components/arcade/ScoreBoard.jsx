import React from 'react';
import { Terminal, Zap, Bug, BookOpen, Check } from 'lucide-react';

const gameConfig = {
  typing: { icon: Terminal, colorClass: 'text-arcade-orange', bgClass: 'bg-arcade-orange/20', borderClass: 'border-arcade-orange/40', dotClass: 'bg-arcade-orange' },
  memory: { icon: Zap, colorClass: 'text-arcade-purple', bgClass: 'bg-arcade-purple/20', borderClass: 'border-arcade-purple/40', dotClass: 'bg-arcade-purple' },
  squasher: { icon: Bug, colorClass: 'text-arcade-cyan', bgClass: 'bg-arcade-cyan/20', borderClass: 'border-arcade-cyan/40', dotClass: 'bg-arcade-cyan' },
  puzzle: { icon: BookOpen, colorClass: 'text-arcade-pink', bgClass: 'bg-arcade-pink/20', borderClass: 'border-arcade-pink/40', dotClass: 'bg-arcade-pink' },
};

const ScoreBoard = ({ completedGames, totalGames = 4 }) => {
  return (
    <div className="flex items-center gap-3">
      {Object.entries(gameConfig).map(([id, config]) => {
        const isCompleted = completedGames.includes(id);
        const IconComp = config.icon;

        return (
          <div
            key={id}
            className={`
              relative p-2 rounded-lg border transition-all duration-300
              ${isCompleted
                ? `${config.bgClass} ${config.borderClass} ${config.colorClass}`
                : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/30'
              }
            `}
            title={`${id} ${isCompleted ? '(completed)' : ''}`}
          >
            <IconComp size={16} />
            {isCompleted && (
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${config.dotClass} flex items-center justify-center`}>
                <Check size={8} className="text-white" />
              </div>
            )}
          </div>
        );
      })}
      <span className="text-xs text-gray-400 dark:text-white/40 font-mono ml-2">
        {completedGames.length}/{totalGames}
      </span>
    </div>
  );
};

export default ScoreBoard;
