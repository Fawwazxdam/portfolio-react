import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Trophy, Heart } from 'lucide-react';
import GameWrapper from '../arcade/GameWrapper.jsx';

const MAX_WRONG = 6;

const fallbackArticles = [
  {
    title: 'Getting Started with React',
    clue: 'A JavaScript library for building user interfaces',
    hint: 'Popular frontend framework',
  },
  {
    title: 'Laravel Best Practices',
    clue: 'PHP framework for web artisans',
    hint: 'Backend development',
  },
  {
    title: 'Node.js Tutorial',
    clue: 'JavaScript runtime built on Chrome V8 engine',
    hint: 'Server-side JavaScript',
  },
];

const ArticlePuzzle = ({ onComplete, onSkip, onClose }) => {
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [solvedArticles, setSolvedArticles] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setArticles(shuffled.slice(0, 3).map((a) => ({
        title: a.title.toUpperCase(),
        clue: a.content?.substring(0, 80) + '...' || 'No description available',
        hint: a.tags?.[0]?.tag?.name || 'Web Development',
      })));
    } catch {
      setArticles(fallbackArticles.map((a) => ({ ...a, title: a.title.toUpperCase() })));
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentArticle(0);
    setSolvedArticles(0);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameComplete(false);
  };

  const revealLevel = () => {
    if (solvedArticles >= 3) return 'Full';
    if (solvedArticles >= 2) return 'Most';
    if (solvedArticles >= 1) return 'Basic';
    return 'None';
  };

  useEffect(() => {
    if (gameStarted && articles.length > 0 && !gameComplete) {
      if (wrongGuesses >= MAX_WRONG) {
        if (currentArticle < articles.length - 1) {
          setTimeout(() => {
            setCurrentArticle((prev) => prev + 1);
            setGuessedLetters([]);
            setWrongGuesses(0);
            setShowHint(false);
          }, 1500);
        } else {
          setGameComplete(true);
          setTimeout(() => onComplete(solvedArticles), 2000);
        }
      }
    }
  }, [wrongGuesses, currentArticle, articles.length, gameComplete, gameStarted, solvedArticles, onComplete]);

  const handleLetterGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameComplete) return;

    setGuessedLetters((prev) => [...prev, letter]);

    const title = articles[currentArticle]?.title || '';
    if (title.includes(letter)) {
      const newGuessed = [...guessedLetters, letter];
      const titleLetters = title.split('').filter((c) => c !== ' ');
      const allGuessed = titleLetters.every((l) => newGuessed.includes(l));

      if (allGuessed) {
        setSolvedArticles((prev) => prev + 1);
        setTimeout(() => {
          if (currentArticle < articles.length - 1) {
            setCurrentArticle((prev) => prev + 1);
            setGuessedLetters([]);
            setWrongGuesses(0);
            setShowHint(false);
          } else {
            setGameComplete(true);
            setTimeout(() => onComplete(solvedArticles + 1), 2000);
          }
        }, 1000);
      }
    } else {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const renderTitle = () => {
    if (!articles[currentArticle]) return null;
    const title = articles[currentArticle].title;

    return title.split('').map((char, i) => {
      if (char === ' ') return <span key={i} className="w-3" />;
      const isGuessed = guessedLetters.includes(char);
      return (
        <span
          key={i}
          className={`
            inline-block w-8 h-10 mx-0.5 border-b-2 text-center leading-10 font-pixel text-sm
            ${isGuessed ? 'text-arcade-pink border-arcade-pink' : 'text-transparent border-gray-300 dark:border-white/30'}
            ${wrongGuesses >= MAX_WRONG && !isGuessed ? 'text-arcade-pink/50 border-arcade-pink/50' : ''}
          `}
        >
          {isGuessed || wrongGuesses >= MAX_WRONG ? char : '_'}
        </span>
      );
    });
  };

  const keyboard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  if (!gameStarted) {
    return (
      <GameWrapper title="ARTICLE PUZZLE" color="pink" onClose={onClose} onSkip={onSkip}>
        <div className="text-center">
          <BookOpen size={64} className="mx-auto mb-6 text-arcade-pink animate-float" />
          <h3 className="font-pixel text-lg text-arcade-pink neon-pink mb-4">
            GUESS THE TITLE!
          </h3>
          <p className="text-gray-500 dark:text-white/50 text-sm mb-2">
            Guess article titles letter by letter
          </p>
          <p className="text-gray-400 dark:text-white/40 text-xs mb-6">
            {MAX_WRONG} wrong guesses allowed per article, {articles.length || 3} articles total
          </p>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-xl bg-arcade-pink/20 border-2 border-arcade-pink text-arcade-pink font-pixel text-sm hover:bg-arcade-pink/30 transition-all"
          >
            START
          </button>
        </div>
      </GameWrapper>
    );
  }

  return (
    <GameWrapper title="ARTICLE PUZZLE" color="pink" onClose={onClose} onSkip={onSkip}>
      <div>
        {!gameComplete ? (
          <>
            {/* Stats */}
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-arcade-pink">
                <BookOpen size={16} />
                <span className="font-mono text-sm">{currentArticle + 1}/{articles.length}</span>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: MAX_WRONG }).map((_, i) => (
                  <Heart
                    key={i}
                    size={14}
                    className={i < wrongGuesses ? 'text-arcade-pink' : 'text-gray-300 dark:text-white/20'}
                    fill={i < wrongGuesses ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="flex justify-center gap-2 mb-6">
              {articles.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1 rounded-full ${
                    i < currentArticle ? 'bg-arcade-pink' :
                    i === currentArticle ? 'bg-arcade-pink/50' : 'bg-gray-200 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Clue */}
            <div className="glass rounded-xl p-4 mb-6 text-center">
              <p className="text-xs text-gray-400 dark:text-white/40 mb-1">CLUE</p>
              <p className="text-sm text-gray-600 dark:text-white/70">{articles[currentArticle]?.clue}</p>
              {showHint && (
                <p className="text-xs text-arcade-cyan mt-2">
                  HINT: {articles[currentArticle]?.hint}
                </p>
              )}
            </div>

            {/* Title Display */}
            <div className="flex flex-wrap justify-center gap-1 mb-6 min-h-[50px]">
              {renderTitle()}
            </div>

            {/* Hint Button */}
            {!showHint && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60 underline transition-colors"
                >
                  Need a hint?
                </button>
              </div>
            )}

            {/* Keyboard */}
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {keyboard.map((letter) => {
                const isGuessed = guessedLetters.includes(letter);
                const isCorrect = isGuessed && (articles[currentArticle]?.title || '').includes(letter);
                const isWrong = isGuessed && !isCorrect;

                return (
                  <button
                    key={letter}
                    onClick={() => handleLetterGuess(letter)}
                    disabled={isGuessed}
                    className={`
                      w-9 h-10 rounded-lg font-pixel text-xs transition-all
                      ${isCorrect
                        ? 'bg-arcade-cyan/20 border border-arcade-cyan/50 text-arcade-cyan'
                        : isWrong
                        ? 'bg-arcade-pink/10 border border-arcade-pink/30 text-arcade-pink/50'
                        : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-110'
                      }
                      ${isGuessed ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* Complete Screen */
          <div className="text-center animate-pop-in">
            <Trophy size={64} className="mx-auto mb-6 text-arcade-yellow" />
            <h3 className="font-pixel text-xl text-arcade-pink neon-pink mb-4">
              {solvedArticles >= articles.length ? 'PERFECT!' : 'COMPLETE!'}
            </h3>
            <div className="glass rounded-xl p-6 max-w-xs mx-auto mb-6">
              <div className="font-pixel text-4xl text-arcade-pink mb-2">{solvedArticles}</div>
              <div className="text-xs text-gray-500 dark:text-white/50">ARTICLES SOLVED</div>
            </div>
            <p className="text-gray-500 dark:text-white/50 text-sm">
              {revealLevel()} article section revealed!
            </p>
          </div>
        )}
      </div>
    </GameWrapper>
  );
};

export default ArticlePuzzle;
