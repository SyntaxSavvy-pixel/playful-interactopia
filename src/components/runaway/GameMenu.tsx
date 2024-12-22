import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

interface GameMenuProps {
  onStart: () => void;
  highScore: number;
}

export const GameMenu = ({ onStart, highScore }: GameMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Runaway Robot
        </h1>
        <p className="text-xl text-purple-200">Guide your robot to freedom!</p>
      </div>

      <div className="max-w-md mx-auto space-y-6 bg-black/20 backdrop-blur-sm p-6 rounded-xl">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">How to Play</h2>
          <ul className="text-purple-200 space-y-2">
            <li>Use WASD or Arrow keys to move</li>
            <li>Collect power-ups for special abilities</li>
            <li>Avoid obstacles and survive as long as possible</li>
          </ul>
        </div>

        {highScore > 0 && (
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <Trophy className="w-5 h-5" />
            <span>High Score: {highScore}</span>
          </div>
        )}

        <Button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Start Game
        </Button>
      </div>
    </motion.div>
  );
};