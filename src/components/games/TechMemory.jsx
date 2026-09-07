import React, { useState, useEffect, useCallback } from 'react';
import { Zap, RotateCcw, Trophy } from 'lucide-react';
import GameWrapper from '../arcade/GameWrapper.jsx';

const techPairs = [
  { id: 1, tech: 'React', icon: '⚛️', color: '#61DAFB' },
  { id: 2, tech: 'Laravel', icon: '🔴', color: '#FF2D20' },
  { id: 3, tech: 'Node.js', icon: '🟢', color: '#339933' },
  { id: 4, tech: 'Vue.js', icon: '💚', color: '#42B883' },
  { id: 5, tech: 'Next.js', icon: '⬛', color: '#000000' },
  { id: 6, tech: 'TypeScript', icon: '🔵', color: '#3178C6' },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TechMemory = ({ onComplete, onSkip, onClose }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = useCallback(() => {
    const techCards = techPairs.map((pair) => ({
      ...pair,
      type: 'tech',
      pairId: pair.id,
    }));
    const iconCards = techPairs.map((pair) => ({
      ...pair,
      type: 'icon',
      pairId: pair.id,
    }));
    const allCards = shuffleArray([...techCards, ...iconCards]);
    setCards(allCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setGameComplete(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (matched.length > 0 && matched.length < techPairs.length * 2 && !gameComplete) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [matched.length, gameComplete]);

  useEffect(() => {
    if (matched.length === techPairs.length * 2) {
      setGameComplete(true);
      setTimeout(() => {
        onComplete({ moves, timer });
      }, 2000);
    }
  }, [matched.length, moves, timer, onComplete]);

  const handleCardClick = (index) => {
    if (isChecking || flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      const card1 = cards[first];
      const card2 = cards[second];

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GameWrapper title="TECH MEMORY" color="purple" onClose={onClose} onSkip={onSkip}>
      <div>
        {!gameComplete ? (
          <>
            {/* Stats */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-arcade-purple">
                <Zap size={16} />
                <span className="font-mono text-sm">{moves} moves</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-white/50">
                <span className="font-mono text-sm">{formatTime(timer)}</span>
              </div>
              <div className="flex items-center gap-2 text-arcade-cyan">
                <span className="font-mono text-sm">{matched.length / 2}/{techPairs.length}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-arcade-purple transition-all duration-300"
                style={{ width: `${(matched.length / (techPairs.length * 2)) * 100}%` }}
              />
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {cards.map((card, index) => {
                const isFlipped = flipped.includes(index) || matched.includes(index);
                const isMatched = matched.includes(index);

                return (
                  <div
                    key={index}
                    className={`
                      aspect-square rounded-xl cursor-pointer transition-all duration-300
                      flex items-center justify-center text-2xl md:text-3xl
                      ${isFlipped
                        ? isMatched
                          ? 'bg-arcade-purple/20 border-2 border-arcade-purple/50 scale-95'
                          : 'bg-gray-100 dark:bg-white/10 border-2 border-gray-200 dark:border-white/20'
                        : 'bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-105'
                      }
                    `}
                    onClick={() => handleCardClick(index)}
                  >
                    {isFlipped ? (
                      card.type === 'tech' ? (
                        <span className="font-pixel text-xs text-arcade-purple">{card.tech}</span>
                      ) : (
                        <span>{card.icon}</span>
                      )
                    ) : (
                      <span className="text-gray-300 dark:text-white/20">?</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={initializeGame}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70 transition-all text-sm"
              >
                <RotateCcw size={14} />
                RESET
              </button>
            </div>
          </>
        ) : (
          /* Complete Screen */
          <div className="text-center animate-pop-in">
            <Trophy size={64} className="mx-auto mb-6 text-arcade-yellow" />
            <h3 className="font-pixel text-xl text-arcade-purple neon-purple mb-4">
              MATCHED!
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-xs mx-auto">
              <div className="glass rounded-xl p-4">
                <div className="font-pixel text-2xl text-arcade-purple">{moves}</div>
                <div className="text-xs text-gray-500 dark:text-white/50">Moves</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="font-pixel text-2xl text-arcade-cyan">{formatTime(timer)}</div>
                <div className="text-xs text-gray-500 dark:text-white/50">Time</div>
              </div>
            </div>
            <p className="text-gray-500 dark:text-white/50 text-sm">
              {moves <= 8 ? 'Perfect memory! All projects unlocked!' :
               moves <= 14 ? 'Great job! Projects revealed!' :
               'Good work! Projects section unlocked!'}
            </p>
          </div>
        )}
      </div>
    </GameWrapper>
  );
};

export default TechMemory;
