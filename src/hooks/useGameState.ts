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

interface Ghost {
  x: number;
  y: number;
  timestamp: number;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
}

export const useGameState = () => {
  const [position, setPosition] = useState<Position>({ x: 400, y: 300 });
  const [velocity, setVelocity] = useState<Velocity>({ x: 0, y: 0 });
  const [upgrades, setUpgrades] = useState<Upgrades>({
    shield: false,
    speedBoost: false,
  });
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [environment, setEnvironment] = useState<'jungle' | 'neon' | 'space'>('jungle');
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [lastGhostTime, setLastGhostTime] = useState(Date.now());

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

  const spawnCoin = useCallback(() => {
    const newCoin: Coin = {
      x: Math.random() * 760 + 20, // Keep within canvas bounds
      y: Math.random() * 560 + 20,
      collected: false
    };
    setCoins(prev => [...prev, newCoin]);
  }, []);

  const checkCoinCollisions = useCallback(() => {
    setCoins(prevCoins => 
      prevCoins.map(coin => {
        if (!coin.collected) {
          const dx = coin.x - position.x;
          const dy = coin.y - position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 30) { // Collection radius
            return { ...coin, collected: true };
          }
        }
        return coin;
      })
    );
  }, [position]);

  const updateGame = useCallback(() => {
    const now = Date.now();
    
    // Update position
    setPosition(prev => {
      const speed = upgrades.speedBoost ? 8 : 5;
      const newX = prev.x + velocity.x * speed;
      const newY = prev.y + velocity.y * speed;

      return {
        x: Math.max(20, Math.min(780, newX)),
        y: Math.max(20, Math.min(580, newY)),
      };
    });

    // Record ghost every 30 seconds
    if (now - lastGhostTime > 30000) {
      setGhosts(prev => [...prev, { x: position.x, y: position.y, timestamp: now }]);
      setLastGhostTime(now);
    }

    // Check collisions
    checkCoinCollisions();

    // Spawn new coin occasionally
    if (Math.random() < 0.01) { // 1% chance each frame
      spawnCoin();
    }
  }, [velocity, upgrades.speedBoost, position, lastGhostTime, checkCoinCollisions, spawnCoin]);

  const cycleEnvironment = useCallback(() => {
    setEnvironment(prev => {
      switch (prev) {
        case 'jungle': return 'neon';
        case 'neon': return 'space';
        case 'space': return 'jungle';
      }
    });
  }, []);

  const resetGame = useCallback(() => {
    setPosition({ x: 400, y: 300 });
    setVelocity({ x: 0, y: 0 });
    setUpgrades({ shield: false, speedBoost: false });
    setGhosts([]);
    setCoins([]);
    setKeys(new Set());
    setLastGhostTime(Date.now());
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
    ghosts,
    coins,
    environment,
    handleKeyDown,
    handleKeyUp,
    resetGame,
    updateGame,
    cycleEnvironment,
  };
};