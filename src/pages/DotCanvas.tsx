import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eraser, PaintBucket, ArrowLeft } from 'lucide-react';

const DotCanvas = () => {
  const [dots, setDots] = useState<boolean[][]>(
    Array(20).fill(null).map(() => Array(20).fill(false))
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const handleDotInteraction = useCallback((rowIndex: number, colIndex: number) => {
    setDots(prevDots => {
      const newDots = [...prevDots];
      newDots[rowIndex] = [...newDots[rowIndex]];
      newDots[rowIndex][colIndex] = !isErasing;
      return newDots;
    });
  }, [isErasing]);

  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    setIsDrawing(true);
    handleDotInteraction(rowIndex, colIndex);
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDrawing) {
      handleDotInteraction(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setDots(Array(20).fill(null).map(() => Array(20).fill(false)));
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Dot Canvas</h1>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-8">
          <div 
            className="grid gap-1 mb-8 mx-auto"
            style={{ 
              gridTemplateColumns: `repeat(20, minmax(0, 1fr))`,
              maxWidth: "600px",
              backgroundColor: "hsl(var(--secondary))",
              padding: "1rem",
              borderRadius: "0.5rem"
            }}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            {dots.map((row, rowIndex) => (
              row.map((dot, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    aspect-square rounded-full transition-all duration-200
                    ${dot ? 'bg-primary scale-100' : 'bg-background scale-90'}
                    hover:scale-100 cursor-pointer
                  `}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                />
              ))
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={isErasing ? 'outline' : 'default'}
              className="gap-2"
              onClick={() => setIsErasing(false)}
            >
              <PaintBucket className="h-4 w-4" />
              Draw
            </Button>
            <Button
              variant={isErasing ? 'default' : 'outline'}
              className="gap-2"
              onClick={() => setIsErasing(true)}
            >
              <Eraser className="h-4 w-4" />
              Erase
            </Button>
            <Button
              variant="outline"
              onClick={clearCanvas}
            >
              Clear Canvas
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Click and drag to draw patterns with dots!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DotCanvas;