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
    if (key === 'ENTER' || key === 'BACKSPACE') return '';
    
    switch (usedLetters[key]) {
      case 'correct':
        return 'bg-green-500 hover:bg-green-600';
      case 'present':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'absent':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="grid gap-1.5">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`h-14 ${
                key === 'ENTER' || key === 'BACKSPACE' ? 'px-4' : 'w-10'
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