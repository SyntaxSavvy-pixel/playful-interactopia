import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GameCanvasProps {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  upgrades: {
    shield: boolean;
    speedBoost: boolean;
  };
  ghosts: Array<{ x: number; y: number; timestamp: number }>;
  coins: Array<{ x: number; y: number; collected: boolean }>;
  environment: 'jungle' | 'neon' | 'space';
}

export const GameCanvas = ({ position, velocity, upgrades, ghosts, coins, environment }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw environment background effects
    drawEnvironment(ctx, environment, canvas.width, canvas.height);

    // Draw coins
    coins.forEach(coin => {
      if (!coin.collected) {
        drawCoin(ctx, coin.x, coin.y);
      }
    });

    // Draw ghosts
    ghosts.forEach(ghost => {
      drawGhost(ctx, ghost.x, ghost.y);
    });

    // Draw robot
    drawRobot(ctx, position.x, position.y, upgrades);

  }, [position, velocity, upgrades, ghosts, coins, environment]);

  const drawEnvironment = (ctx: CanvasRenderingContext2D, env: string, width: number, height: number) => {
    switch (env) {
      case 'jungle':
        ctx.fillStyle = '#1a472a';
        ctx.fillRect(0, 0, width, height);
        // Add jungle particles
        for (let i = 0; i < 50; i++) {
          ctx.fillStyle = '#2ecc71';
          ctx.globalAlpha = Math.random() * 0.5;
          ctx.fillRect(
            Math.random() * width,
            Math.random() * height,
            2,
            2
          );
        }
        break;
      case 'neon':
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, width, height);
        // Add neon grid effect
        ctx.strokeStyle = '#e94560';
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < width; i += 30) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
          ctx.stroke();
        }
        break;
      case 'space':
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);
        // Add stars
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = Math.random();
          ctx.beginPath();
          ctx.arc(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        break;
    }
    ctx.globalAlpha = 1;
  };

  const drawRobot = (ctx: CanvasRenderingContext2D, x: number, y: number, upgrades: any) => {
    // Robot body
    ctx.fillStyle = upgrades.shield ? '#60A5FA' : '#8B5CF6';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Robot eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 5, y - 5, 5, 0, Math.PI * 2);
    ctx.arc(x + 5, y - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    // Shield effect
    if (upgrades.shield) {
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Speed trail
    if (upgrades.speedBoost && (velocity.x !== 0 || velocity.y !== 0)) {
      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - velocity.x * 3, y - velocity.y * 3);
      ctx.stroke();
    }
  };

  const drawGhost = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#94A3B8';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const drawCoin = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = '#FCD34D';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-[600px] rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};