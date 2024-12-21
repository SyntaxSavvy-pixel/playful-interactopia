import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { WORDS } from '@/lib/word-list';
import WordGrid from '@/components/wordly/WordGrid';
import Keyboard from '@/components/wordly/Keyboard';

export type GuessResult = ('correct' | 'present' | 'absent')[];

const WordlyWonders = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});

  useEffect(() => {
    // Pick a random word on component mount
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setTargetWord(randomWord);
    console.log('Target word:', randomWord); // For debugging
  }, []);

  const checkGuess = (guess: string): GuessResult => {
    const result: GuessResult = [];
    const targetLetters = [...targetWord];
    
    // First pass: mark correct letters
    [...guess].forEach((letter, i) => {
      if (letter === targetWord[i]) {
        result[i] = 'correct';
        targetLetters[i] = '#'; // Mark as used
      }
    });
    
    // Second pass: mark present letters
    [...guess].forEach((letter, i) => {
      if (result[i]) return; // Skip if already marked
      
      const targetIndex = targetLetters.indexOf(letter);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetLetters[targetIndex] = '#'; // Mark as used
      } else {
        result[i] = 'absent';
      }
    });
    
    return result;
  };

  const handleKeyPress = (key: string) => {
    if (gameOver) return;
    
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        toast.error("Word must be 5 letters long!");
        return;
      }
      
      if (!WORDS.includes(currentGuess.toLowerCase())) {
        toast.error("Not in word list!");
        return;
      }

      const result = checkGuess(currentGuess);
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      
      // Update used letters
      const newUsedLetters = { ...usedLetters };
      [...currentGuess].forEach((letter, i) => {
        const status = result[i];
        if (!newUsedLetters[letter] || status === 'correct') {
          newUsedLetters[letter] = status;
        }
      });
      setUsedLetters(newUsedLetters);

      if (currentGuess === targetWord) {
        toast.success("Congratulations! You won! 🎉");
        setGameOver(true);
      } else if (newGuesses.length >= 6) {
        toast.error(`Game Over! The word was ${targetWord}`);
        setGameOver(true);
      }

      setCurrentGuess('');
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const resetGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setUsedLetters({});
    console.log('New target word:', randomWord); // For debugging
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-8 animate-in fade-in duration-500">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Wordly Wonders</h1>
        <p className="text-muted-foreground">Guess the 5-letter word in 6 tries</p>
      </header>

      <WordGrid 
        guesses={guesses}
        currentGuess={currentGuess}
        targetWord={targetWord}
      />

      <Keyboard 
        onKeyPress={handleKeyPress}
        usedLetters={usedLetters}
      />

      {gameOver && (
        <Button onClick={resetGame} className="mt-4">
          Play Again
        </Button>
      )}
    </div>
  );
};

export default WordlyWonders;