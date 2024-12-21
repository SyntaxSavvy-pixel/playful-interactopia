import { GuessResult } from '@/pages/WordlyWonders';

interface WordGridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
}

const WordGrid = ({ guesses, currentGuess, targetWord }: WordGridProps) => {
  const checkGuess = (guess: string): GuessResult => {
    const result: GuessResult = [];
    const targetLetters = [...targetWord];
    
    // First pass: mark correct letters
    [...guess].forEach((letter, i) => {
      if (letter === targetWord[i]) {
        result[i] = 'correct';
        targetLetters[i] = '#';
      }
    });
    
    // Second pass: mark present letters
    [...guess].forEach((letter, i) => {
      if (result[i]) return;
      
      const targetIndex = targetLetters.indexOf(letter);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetLetters[targetIndex] = '#';
      } else {
        result[i] = 'absent';
      }
    });
    
    return result;
  };

  const getBackgroundColor = (letter: string, index: number, guess: string) => {
    const result = checkGuess(guess);
    switch (result[index]) {
      case 'correct':
        return 'bg-green-500 border-green-600';
      case 'present':
        return 'bg-yellow-500 border-yellow-600';
      case 'absent':
        return 'bg-gray-500 border-gray-600';
      default:
        return 'bg-transparent';
    }
  };

  return (
    <div className="grid grid-rows-6 gap-1">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const letter = isCurrentRow
              ? currentGuess[colIndex]
              : guesses[rowIndex]?.[colIndex];
            
            const baseClasses = "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-all duration-300";
            const letterClasses = letter
              ? `${baseClasses} ${
                  guesses[rowIndex]
                    ? getBackgroundColor(letter, colIndex, guesses[rowIndex])
                    : 'border-gray-300 text-primary'
                }`
              : `${baseClasses} border-gray-300`;

            return (
              <div
                key={colIndex}
                className={letterClasses}
              >
                {letter || ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;