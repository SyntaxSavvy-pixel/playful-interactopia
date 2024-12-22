import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GameCanvasProps {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  upgrades: {
    shield: boolean;
    speedBoost: boolean;
  };
}

export const GameCanvas = ({ position, velocity, upgrades }: GameCanvasProps) => {
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

    // Draw robot
    ctx.fillStyle = upgrades.shield ? '#60A5FA' : '#8B5CF6';
    ctx.beginPath();
    ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw shield effect if active
    if (upgrades.shield) {
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(position.x, position.y, 25, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw speed trail if boost active
    if (upgrades.speedBoost && (velocity.x !== 0 || velocity.y !== 0)) {
      ctx.strokeStyle = '#F472B6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(position.x - velocity.x * 3, position.y - velocity.y * 3);
      ctx.stroke();
    }
  }, [position, velocity, upgrades]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-[600px] bg-gradient-to-br from-gray-900 to-purple-900 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};