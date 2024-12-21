import { Button } from '@/components/ui/button';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, 'correct' | 'present' | 'absent'>;
}

const Keyboard = ({ onKeyPress, usedLetters }: KeyboardProps) => {
  const getKeyStyle = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') return 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    
    switch (usedLetters[key]) {
      case 'correct':
        return 'bg-green-500 hover:bg-green-600 text-white border-green-600';
      case 'present':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600';
      case 'absent':
        return 'bg-gray-500 hover:bg-gray-600 text-white border-gray-600';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="grid gap-1.5 w-full max-w-2xl mx-auto">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`h-14 font-semibold transition-all duration-300 ${
                key === 'ENTER' || key === 'BACKSPACE' ? 'px-3 text-xs' : 'w-10 text-base'
              } ${getKeyStyle(key)}`}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;