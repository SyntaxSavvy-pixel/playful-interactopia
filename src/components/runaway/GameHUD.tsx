import { Shield, Zap, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameHUDProps {
  score: number;
  coins: number;
  upgrades: {
    shield: boolean;
    speedBoost: boolean;
  };
  environment: string;
  onPause: () => void;
  onChangeEnvironment: () => void;
}

export const GameHUD = ({ 
  score, 
  coins, 
  upgrades, 
  environment, 
  onPause, 
  onChangeEnvironment 
}: GameHUDProps) => {
  return (
    <motion.div 
      className="absolute top-4 left-4 right-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <motion.div 
          className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <span className="font-bold">Score: {score}</span>
        </motion.div>
        
        <motion.div 
          className="bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Coins className="w-4 h-4" />
          <span>{coins}</span>
        </motion.div>

        <div className="flex gap-2">
          {upgrades.shield && (
            <motion.div 
              className="bg-blue-500/20 backdrop-blur-sm p-2 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Shield className="w-5 h-5 text-blue-400" />
            </motion.div>
          )}
          {upgrades.speedBoost && (
            <motion.div 
              className="bg-pink-500/20 backdrop-blur-sm p-2 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Zap className="w-5 h-5 text-pink-400" />
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onChangeEnvironment}
          className="bg-black/30 backdrop-blur-sm hover:bg-black/40"
        >
          {environment}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onPause}
          className="bg-black/30 backdrop-blur-sm hover:bg-black/40"
        >
          Pause
        </Button>
      </div>
    </motion.div>
  );
};