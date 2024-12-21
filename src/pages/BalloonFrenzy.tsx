import { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Timer, Trophy, Clock } from 'lucide-react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'standard' | 'golden' | 'black' | 'timer' | 'bomb';
  size: number;
}

const BalloonFrenzy = () => {
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState<'classic' | 'timed' | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [combo, setCombo] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const startGame = (mode: 'classic' | 'timed') => {
    setGameMode(mode);
    setScore(0);
    setCombo(0);
    setBalloons([]);
    setIsPlaying(true);
    if (mode === 'timed') {
      setTimeLeft(60);
    }
  };

  const createBalloon = () => {
    if (!gameAreaRef.current) return;
    
    const types: Balloon['type'][] = ['standard', 'standard', 'standard', 'golden', 'black', 'timer', 'bomb'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const balloon: Balloon = {
      id: Date.now(),
      x: Math.random() * (gameAreaRef.current.clientWidth - 50),
      y: gameAreaRef.current.clientHeight,
      speed: 2 + Math.random() * 2,
      type: randomType,
      size: randomType === 'golden' ? 60 : 50,
    };
    
    setBalloons(prev => [...prev, balloon]);
  };

  const popBalloon = (balloon: Balloon) => {
    setBalloons(prev => prev.filter(b => b.id !== balloon.id));
    
    let points = 0;
    switch (balloon.type) {
      case 'standard':
        points = 1;
        break;
      case 'golden':
        points = 5;
        toast({
          title: "Bonus!",
          description: "+5 points!",
        });
        break;
      case 'black':
        points = -3;
        toast({
          title: "Oops!",
          description: "-3 points!",
          variant: "destructive",
        });
        break;
      case 'timer':
        setBalloons(prev => prev.map(b => ({ ...b, speed: b.speed * 0.5 })));
        toast({
          title: "Time Slow!",
          description: "Balloons slowed down!",
        });
        break;
      case 'bomb':
        const nearbyBalloons = balloons.filter(b => 
          Math.abs(b.x - balloon.x) < 100 && Math.abs(b.y - balloon.y) < 100
        );
        setBalloons(prev => prev.filter(b => !nearbyBalloons.includes(b)));
        points = nearbyBalloons.length;
        toast({
          title: "Boom!",
          description: `Chain reaction! +${points} points!`,
        });
        break;
    }
    
    setScore(prev => prev + points);
    setCombo(prev => prev + 1);
  };

  useEffect(() => {
    if (!isPlaying) return;
    
    const gameLoop = setInterval(() => {
      setBalloons(prev => prev.map(balloon => ({
        ...balloon,
        y: balloon.y - balloon.speed,
      })).filter(balloon => balloon.y + balloon.size > 0));
      
      if (Math.random() < 0.05) {
        createBalloon();
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying]);

  useEffect(() => {
    if (gameMode === 'timed' && isPlaying) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            clearInterval(timer);
            toast({
              title: "Game Over!",
              description: `Final Score: ${score}`,
            });
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameMode, isPlaying, score]);

  if (!isPlaying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-6 bg-gradient-to-b from-blue-50 to-blue-100">
        <h1 className="text-4xl font-bold text-blue-900">🎈 Balloon Frenzy</h1>
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => startGame('classic')}
            className="w-48 space-x-2"
          >
            <Trophy size={20} />
            <span>Classic Mode</span>
          </Button>
          <Button 
            onClick={() => startGame('timed')}
            variant="secondary"
            className="w-48 space-x-2"
          >
            <Clock size={20} />
            <span>Timed Mode</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">Score: {score}</div>
          {gameMode === 'timed' && (
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6" />
              <span className="text-2xl font-bold">{timeLeft}s</span>
            </div>
          )}
          <div className="text-xl">Combo: x{combo}</div>
        </div>
        
        <div 
          ref={gameAreaRef}
          className="relative w-full h-[600px] bg-white/50 rounded-lg backdrop-blur-sm border-2 border-white/50 overflow-hidden"
          onClick={() => setCombo(0)}
        >
          {balloons.map(balloon => (
            <button
              key={balloon.id}
              onClick={(e) => {
                e.stopPropagation();
                popBalloon(balloon);
              }}
              className={`absolute transition-transform hover:scale-110 cursor-pointer`}
              style={{
                left: `${balloon.x}px`,
                top: `${balloon.y}px`,
                width: `${balloon.size}px`,
                height: `${balloon.size}px`,
              }}
            >
              <div 
                className={`w-full h-full rounded-full ${
                  balloon.type === 'standard' ? 'bg-gradient-to-b from-red-400 to-red-500' :
                  balloon.type === 'golden' ? 'bg-gradient-to-b from-yellow-300 to-yellow-400' :
                  balloon.type === 'black' ? 'bg-gradient-to-b from-gray-700 to-gray-800' :
                  balloon.type === 'timer' ? 'bg-gradient-to-b from-blue-400 to-blue-500' :
                  'bg-gradient-to-b from-purple-500 to-purple-600'
                } shadow-lg`}
              />
            </button>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button 
            variant="destructive"
            onClick={() => setIsPlaying(false)}
          >
            End Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BalloonFrenzy;