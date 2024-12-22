import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Upgrades {
  shield: boolean;
  speedBoost: boolean;
}

export const useGameState = () => {
  const [position, setPosition] = useState<Position>({ x: 400, y: 300 });
  const [velocity, setVelocity] = useState<Velocity>({ x: 0, y: 0 });
  const [upgrades, setUpgrades] = useState<Upgrades>({
    shield: false,
    speedBoost: false,
  });
  const [keys, setKeys] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setKeys(prev => new Set(prev).add(event.key));
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(event.key);
      return newKeys;
    });
  }, []);

  const updateGame = useCallback(() => {
    setPosition(prev => {
      const speed = upgrades.speedBoost ? 8 : 5;
      const newX = prev.x + velocity.x * speed;
      const newY = prev.y + velocity.y * speed;

      // Add boundary checks here
      return {
        x: Math.max(20, Math.min(780, newX)),
        y: Math.max(20, Math.min(580, newY)),
      };
    });
  }, [velocity, upgrades.speedBoost]);

  const resetGame = useCallback(() => {
    setPosition({ x: 400, y: 300 });
    setVelocity({ x: 0, y: 0 });
    setUpgrades({ shield: false, speedBoost: false });
    setKeys(new Set());
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const newVelocity = { x: 0, y: 0 };

      if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) newVelocity.y = -1;
      if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) newVelocity.y = 1;
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) newVelocity.x = -1;
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) newVelocity.x = 1;

      setVelocity(newVelocity);
      updateGame();
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [keys, updateGame]);

  return {
    position,
    velocity,
    upgrades,
    handleKeyDown,
    handleKeyUp,
    resetGame,
    updateGame,
  };
};