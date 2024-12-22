import { Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameHUDProps {
  score: number;
  upgrades: {
    shield: boolean;
    speedBoost: boolean;
  };
  onPause: () => void;
}

export const GameHUD = ({ score, upgrades, onPause }: GameHUDProps) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-bold">Score: {score}</span>
        </div>
        <div className="flex gap-2">
          {upgrades.shield && (
            <div className="bg-blue-500/20 backdrop-blur-sm p-2 rounded-full">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
          )}
          {upgrades.speedBoost && (
            <div className="bg-pink-500/20 backdrop-blur-sm p-2 rounded-full">
              <Zap className="w-5 h-5 text-pink-400" />
            </div>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onPause}
        className="bg-black/30 backdrop-blur-sm hover:bg-black/40"
      >
        Pause
      </Button>
    </div>
  );
};