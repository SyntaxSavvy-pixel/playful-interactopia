import { Link } from "react-router-dom";
import { Paintbrush, Hash, MousePointer, Bomb, KeySquare, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const experiments = [
  {
    title: "Gradient Generator",
    description: "Create beautiful color gradients with a click",
    icon: <Paintbrush className="w-8 h-8" />,
    path: "/gradient-generator",
    gradient: "from-pink-500/20 via-purple-500/20 to-indigo-500/20"
  },
  {
    title: "Global Counter",
    description: "Join everyone in counting to infinity",
    icon: <Hash className="w-8 h-8" />,
    path: "/counter",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    title: "Dot Canvas",
    description: "Draw with dots in this interactive canvas",
    icon: <MousePointer className="w-8 h-8" />,
    path: "/dot-canvas",
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Balloon Frenzy",
    description: "Pop balloons in this addictive arcade game",
    icon: <Bomb className="w-8 h-8" />,
    path: "/balloon-frenzy",
    gradient: "from-purple-500/20 via-fuchsia-500/20 to-pink-500/20"
  },
  {
    title: "Wordly Wonders",
    description: "Guess the word in this addictive word game",
    icon: <KeySquare className="w-8 h-8" />,
    path: "/wordly-wonders",
    gradient: "from-yellow-500/20 via-amber-500/20 to-orange-500/20"
  },
  {
    title: "Runaway Robot",
    description: "Guide your robot through challenging obstacles",
    icon: <Zap className="w-8 h-8" />,
    path: "/runaway-robot",
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20"
  }
];

interface FloatingParticleProps {
  delay?: number;
  style?: React.CSSProperties;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay = 0, style }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary/20"
    animate={{
      y: [-20, 20],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
    style={style}
  />
);

const Index = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen p-6 sm:p-12 relative overflow-hidden">
      {/* Profile Section */}
      <motion.div 
        className="absolute top-4 left-4 flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Avatar className="h-16 w-16 ring-2 ring-primary/50 animate-float">
          <AvatarImage src="https://api.dicebear.com/7.x/pixel-art/svg?seed=lovable" />
          <AvatarFallback>LV</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Lovable Player
          </h3>
          <p className="text-sm text-muted-foreground">Interactive Explorer</p>
        </div>
      </motion.div>

      {/* Theme toggle */}
      <motion.div 
        className="absolute top-4 right-4 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full hover:bg-primary/20 border-primary/20"
        >
          {theme === "dark" ? 
            <Sun className="h-5 w-5 animate-float text-yellow-500" /> : 
            <Moon className="h-5 w-5 animate-float text-primary" />
          }
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary/20 border-primary/20"
          asChild
        >
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>
      </motion.div>

      {/* Floating particles with enhanced glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              boxShadow: '0 0 15px var(--primary)',
            }}
          />
        ))}
      </div>

      <header className="max-w-4xl mx-auto text-center mb-12 relative z-10 pt-20">
        <motion.h1 
          className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Interactive Lab
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Endless Fun, One Click at a Time
        </motion.p>
      </header>

      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {experiments.map((experiment, index) => (
          <motion.div
            key={experiment.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <Link to={experiment.path}>
              <motion.div 
                className={`experiment-card group bg-gradient-to-br ${experiment.gradient}`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <motion.div 
                    className="mb-4 text-primary transform-gpu transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {experiment.icon}
                  </motion.div>
                  <h2 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                    {experiment.title}
                  </h2>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {experiment.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer 
        className="mt-12 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="italic">"Creativity starts with play!"</p>
      </motion.footer>
    </div>
  );
};

export default Index;