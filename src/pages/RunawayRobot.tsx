import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Timer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GameCanvas } from '@/components/runaway/GameCanvas';
import { GameHUD } from '@/components/runaway/GameHUD';
import { GameMenu } from '@/components/runaway/GameMenu';
import { useGameState } from '@/hooks/useGameState';

const RunawayRobot = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('runawayRobotHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const {
    position,
    velocity,
    upgrades,
    ghosts,
    coins: coinsList,
    environment,
    resetGame,
    cycleEnvironment
  } = useGameState();

  const startGame = () => {
    setGameState('playing');
    resetGame();
    setScore(0);
    setCoins(0);
    toast({
      title: "Game Started!",
      description: "Guide your robot to freedom!",
    });
  };

  const endGame = () => {
    setGameState('gameOver');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('runawayRobotHighScore', score.toString());
      toast({
        title: "New High Score!",
        description: `You achieved ${score} points!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Link>

        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu onStart={startGame} highScore={highScore} />
          )}

          {gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <GameCanvas
                position={position}
                velocity={velocity}
                upgrades={upgrades}
                ghosts={ghosts}
                coins={coinsList}
                environment={environment}
              />
              <GameHUD
                score={score}
                coins={coins}
                upgrades={upgrades}
                environment={environment}
                onPause={() => setGameState('paused')}
                onChangeEnvironment={cycleEnvironment}
              />
            </motion.div>
          )}

          {gameState === 'paused' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="bg-card p-8 rounded-lg text-center space-y-4">
                <h2 className="text-2xl font-bold">Game Paused</h2>
                <div className="space-x-4">
                  <Button onClick={() => setGameState('playing')}>Resume</Button>
                  <Button variant="destructive" onClick={() => setGameState('menu')}>
                    Quit
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'gameOver' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center space-y-6"
            >
              <h2 className="text-4xl font-bold">Game Over!</h2>
              <p className="text-xl">Final Score: {score}</p>
              <p className="text-lg">Coins Collected: {coins}</p>
              <p className="text-lg">High Score: {highScore}</p>
              <div className="space-x-4">
                <Button onClick={startGame}>Play Again</Button>
                <Button variant="secondary" onClick={() => setGameState('menu')}>
                  Main Menu
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RunawayRobot;