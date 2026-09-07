import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bug, Trophy, Zap } from 'lucide-react';
import GameWrapper from '../arcade/GameWrapper.jsx';

const GAME_DURATION = 30;
const GRID_SIZE = 9;

const bugTypes = [
  { emoji: '🐛', points: 1 },
  { emoji: '🪲', points: 2 },
  { emoji: '🐜', points: 1 },
  { emoji: '🦗', points: 3 },
];

const BugSquasher = ({ onComplete, onSkip, onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeBugs, setActiveBugs] = useState({});
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [combo, setCombo] = useState(0);
  const [lastHit, setLastHit] = useState(null);
  const gameLoopRef = useRef(null);
  const timerRef = useRef(null);

  const spawnBug = useCallback(() => {
    const position = Math.floor(Math.random() * GRID_SIZE);
    const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)];
    setActiveBugs((prev) => ({
      ...prev,
      [position]: { ...bugType, spawned: Date.now() },
    }));

    setTimeout(() => {
      setActiveBugs((prev) => {
        const next = { ...prev };
        delete next[position];
        return next;
      });
    }, 1200);
  }, []);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      gameLoopRef.current = setInterval(() => {
        spawnBug();
        if (Math.random() > 0.5) {
          setTimeout(spawnBug, 300);
        }
      }, 800);

      return () => {
        clearInterval(timerRef.current);
        clearInterval(gameLoopRef.current);
      };
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameComplete(true);
      clearInterval(gameLoopRef.current);
      clearInterval(timerRef.current);
      setTimeout(() => {
        onComplete(score);
      }, 2000);
    }
  }, [gameActive, timeLeft, spawnBug, onComplete, score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveBugs({});
    setGameActive(true);
    setGameComplete(false);
    setCombo(0);
  };

  const squashBug = (position) => {
    if (!gameActive || !activeBugs[position]) return;

    const bug = activeBugs[position];
    const newCombo = combo + 1;
    const comboMultiplier = Math.min(newCombo, 5);
    const points = bug.points * comboMultiplier;

    setScore((prev) => prev + points);
    setCombo(newCombo);
    setLastHit({ position, points, combo: comboMultiplier });
    setTimeout(() => setLastHit(null), 500);

    setActiveBugs((prev) => {
      const next = { ...prev };
      delete next[position];
      return next;
    });
  };

  const resetCombo = () => {
    setCombo(0);
  };

  useEffect(() => {
    if (gameActive && combo > 0) {
      const timer = setTimeout(resetCombo, 1500);
      return () => clearTimeout(timer);
    }
  }, [combo, gameActive]);

  return (
    <GameWrapper title="BUG SQUASHER" color="cyan" onClose={onClose} onSkip={onSkip}>
      <div>
        {!gameActive && !gameComplete && (
          <div className="text-center">
            <Bug size={64} className="mx-auto mb-6 text-arcade-cyan animate-float" />
            <h3 className="font-pixel text-lg text-arcade-cyan neon-cyan mb-4">
              SQUASH THE BUGS!
            </h3>
            <p className="text-gray-500 dark:text-white/50 text-sm mb-6">
              Click bugs as they appear. Build combos for bonus points!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-xl bg-arcade-cyan/20 border-2 border-arcade-cyan text-arcade-cyan font-pixel text-sm hover:bg-arcade-cyan/30 transition-all"
            >
              START
            </button>
          </div>
        )}

        {gameActive && (
          <>
            {/* Stats */}
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-arcade-cyan">
                <Zap size={16} />
                <span className="font-mono text-sm">{score}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-white/50">
                <span className="font-mono text-sm">{timeLeft}s</span>
              </div>
              {combo > 1 && (
                <div className="flex items-center gap-2 text-arcade-yellow animate-pulse">
                  <span className="font-pixel text-xs">x{Math.min(combo, 5)} COMBO</span>
                </div>
              )}
            </div>

            {/* Timer Bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-arcade-cyan transition-all duration-1000"
                style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
              />
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-4">
              {Array.from({ length: GRID_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-3xl
                    transition-all duration-150 cursor-pointer select-none relative
                    ${activeBugs[i]
                      ? 'bg-arcade-cyan/20 border-2 border-arcade-cyan/50 scale-110 animate-pop-in hover:bg-arcade-cyan/30'
                      : 'bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10'
                    }
                  `}
                  onClick={() => squashBug(i)}
                >
                  {activeBugs[i] && (
                    <span className="animate-pulse">{activeBugs[i].emoji}</span>
                  )}
                  {lastHit && lastHit.position === i && (
                    <span className="absolute font-pixel text-xs text-arcade-yellow animate-ping">
                      +{lastHit.points}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 dark:text-white/30">
              Click bugs before they disappear!
            </p>
          </>
        )}

        {gameComplete && (
          <div className="text-center animate-pop-in">
            <Trophy size={64} className="mx-auto mb-6 text-arcade-yellow" />
            <h3 className="font-pixel text-xl text-arcade-cyan neon-cyan mb-4">
              GAME OVER!
            </h3>
            <div className="glass rounded-xl p-6 max-w-xs mx-auto mb-6">
              <div className="font-pixel text-4xl text-arcade-cyan mb-2">{score}</div>
              <div className="text-xs text-gray-500 dark:text-white/50">POINTS</div>
            </div>
            <p className="text-gray-500 dark:text-white/50 text-sm">
              {score >= 30 ? 'Legendary! Full skill set unlocked!' :
               score >= 15 ? 'Great reflexes! Most skills unlocked!' :
               'Nice effort! Basic skills revealed!'}
            </p>
          </div>
        )}
      </div>
    </GameWrapper>
  );
};

export default BugSquasher;
