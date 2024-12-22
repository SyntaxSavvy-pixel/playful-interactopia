import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Github } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full hover:bg-primary/20 border-primary/20"
      >
        {theme === "dark" ? 
          <Sun className="h-5 w-5 text-yellow-500" /> : 
          <Moon className="h-5 w-5 text-primary" />
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
    </div>
  );
};