import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Clock, Zap, Trophy } from 'lucide-react';
import GameWrapper from '../arcade/GameWrapper.jsx';

const codeSnippets = [
  'const app = express();',
  'function handleClick() {',
  'export default Component;',
  'import React from "react";',
  'app.get("/api", (req, res) => {',
];

const DevTyping = ({ onComplete, onSkip, onClose }) => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [completedSnippets, setCompletedSnippets] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSnippet]);

  const calculateWPM = useCallback((charsOverride = null) => {
    if (!startTime) return 0;
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const charsTyped = charsOverride ?? codeSnippets.slice(0, completedSnippets).join('').length;
    const wordsTyped = charsTyped / 5;
    return Math.round(wordsTyped / timeInMinutes) || 0;
  }, [startTime, completedSnippets]);

  useEffect(() => {
    if (startTime && !gameComplete) {
      const interval = setInterval(() => {
        setWpm(calculateWPM());
      }, 500);
      return () => clearInterval(interval);
    }
  }, [startTime, gameComplete, calculateWPM]);

  const handleInput = (e) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const value = e.target.value;
    setInput(value);

    if (value === codeSnippets[currentSnippet]) {
      setCompletedSnippets((prev) => prev + 1);
      setInput('');

      if (currentSnippet < codeSnippets.length - 1) {
        setCurrentSnippet((prev) => prev + 1);
      } else {
        const allChars = codeSnippets.join('').length;
        const finalWpm = calculateWPM(allChars);
        setWpm(finalWpm);
        setGameComplete(true);
        setTimeout(() => {
          onComplete(finalWpm);
        }, 2000);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key !== 'Backspace' && input.length > 0) {
      const expected = codeSnippets[currentSnippet][input.length];
      if (e.key !== expected) {
        setErrors((prev) => prev + 1);
      }
    }
  };

  return (
    <GameWrapper title="DEV TYPING" color="orange" onClose={onClose} onSkip={onSkip}>
      <div className="text-center">
        {!gameComplete ? (
          <>
            {/* Stats */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-arcade-orange">
                <Clock size={16} />
                <span className="font-mono text-sm">{wpm} WPM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-white/50">
                <Terminal size={16} />
                <span className="font-mono text-sm">{completedSnippets}/{codeSnippets.length}</span>
              </div>
              <div className="flex items-center gap-2 text-arcade-pink">
                <span className="font-mono text-sm">Errors: {errors}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-arcade-orange transition-all duration-300"
                style={{ width: `${(completedSnippets / codeSnippets.length) * 100}%` }}
              />
            </div>

            {/* Code Display */}
            <div className="glass rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4 text-xs text-gray-400 dark:text-white/40">
                <div className="w-3 h-3 rounded-full bg-arcade-pink/60" />
                <div className="w-3 h-3 rounded-full bg-arcade-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-arcade-cyan/60" />
                <span className="ml-2">snippet.js</span>
              </div>

              <div className="font-mono text-lg md:text-xl text-left">
                {codeSnippets[currentSnippet].split('').map((char, i) => {
                  let colorClass = 'text-gray-300 dark:text-white/30';
                  if (i < input.length) {
                    colorClass = input[i] === char ? 'text-arcade-cyan' : 'text-arcade-pink';
                  } else if (i === input.length) {
                    colorClass = 'text-gray-900 dark:text-white border-b-2 border-arcade-orange animate-pulse';
                  }
                  return (
                    <span key={i} className={colorClass}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              className="w-full p-4 rounded-xl glass-input font-mono text-lg text-center text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none"
              placeholder="Type the code above..."
              autoComplete="off"
              spellCheck="false"
            />

            <p className="text-xs text-gray-400 dark:text-white/30 mt-4">
              Start typing to begin. Type each snippet exactly as shown.
            </p>
          </>
        ) : (
          /* Complete Screen */
          <div className="animate-pop-in">
            <Trophy size={64} className="mx-auto mb-6 text-arcade-yellow" />
            <h3 className="font-pixel text-xl text-arcade-orange neon-orange mb-4">
              COMPLETE!
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4">
                <div className="font-pixel text-2xl text-arcade-orange">{wpm}</div>
                <div className="text-xs text-gray-500 dark:text-white/50">WPM</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="font-pixel text-2xl text-arcade-cyan">{completedSnippets}</div>
                <div className="text-xs text-gray-500 dark:text-white/50">Snippets</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="font-pixel text-2xl text-arcade-pink">{errors}</div>
                <div className="text-xs text-gray-500 dark:text-white/50">Errors</div>
              </div>
            </div>
            <p className="text-gray-500 dark:text-white/50 text-sm">
              {wpm >= 60 ? 'Amazing speed! Full profile unlocked!' :
               wpm >= 30 ? 'Good job! Most of your profile is revealed!' :
               'Nice work! Basic profile unlocked!'}
            </p>
          </div>
        )}
      </div>
    </GameWrapper>
  );
};

export default DevTyping;
