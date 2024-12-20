import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCcw, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const GradientGenerator = () => {
  const { toast } = useToast();
  const [gradient, setGradient] = useState({
    color1: "#FF5F6D",
    color2: "#FFC371",
    angle: 45
  });

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateNewGradient = () => {
    setGradient({
      color1: generateRandomColor(),
      color2: generateRandomColor(),
      angle: Math.floor(Math.random() * 360)
    });
  };

  const copyToClipboard = () => {
    const cssCode = `background: linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2});`;
    navigator.clipboard.writeText(cssCode);
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen p-6 page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Gradient Generator</h1>
        </div>

        <div className="space-y-8">
          <div 
            className="h-64 rounded-xl shadow-lg transition-all duration-500"
            style={{
              background: `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`
            }}
          />

          <div className="flex flex-wrap gap-4">
            <Button onClick={generateNewGradient}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Generate New
            </Button>
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copy CSS
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color 1</label>
              <input
                type="color"
                value={gradient.color1}
                onChange={(e) => setGradient({ ...gradient, color1: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color 2</label>
              <input
                type="color"
                value={gradient.color2}
                onChange={(e) => setGradient({ ...gradient, color2: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Angle: {gradient.angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={gradient.angle}
                onChange={(e) => setGradient({ ...gradient, angle: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;