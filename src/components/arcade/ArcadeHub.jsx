import React from 'react';
import { GameController } from '@phosphor-icons/react';
import { Terminal, Zap, Bug, BookOpen } from 'lucide-react';
import { SectionHeader } from '../Section.jsx';
import GameCard from './GameCard.jsx';

const games = [
  {
    id: 'typing',
    title: 'DEV TYPING',
    description: 'Type code snippets as fast as you can',
    icon: Terminal,
    color: 'orange',
    section: 'About Me',
  },
  {
    id: 'memory',
    title: 'TECH MEMORY',
    description: 'Match technologies with projects',
    icon: Zap,
    color: 'purple',
    section: 'Projects',
  },
  {
    id: 'squasher',
    title: 'BUG SQUASHER',
    description: 'Squash the bugs before they escape',
    icon: Bug,
    color: 'cyan',
    section: 'Skills',
  },
  {
    id: 'puzzle',
    title: 'ARTICLE PUZZLE',
    description: 'Guess article titles from clues',
    icon: BookOpen,
    color: 'pink',
    section: 'Articles',
  },
];

const ArcadeHub = ({ onPlayGame, completedGames }) => {
  return (
    <section className="flex flex-col items-center px-4 pb-8">
      <SectionHeader
        icon={GameController}
        title="ARCADE"
        subtitle="Play mini games while you explore my portfolio"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onPlay={onPlayGame}
            isCompleted={completedGames.includes(game.id)}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-400 dark:text-white/30 font-pixel">
          INSERT COIN TO PLAY
        </p>
      </div>
    </section>
  );
};

export default ArcadeHub;
