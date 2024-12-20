import { Link } from "react-router-dom";
import { Paintbrush, Hash, MousePointer } from "lucide-react";

const experiments = [
  {
    title: "Gradient Generator",
    description: "Create beautiful color gradients with a click",
    icon: <Paintbrush className="w-8 h-8" />,
    path: "/gradient-generator",
    color: "from-pink-500 to-violet-500"
  },
  {
    title: "Global Counter",
    description: "Join everyone in counting to infinity",
    icon: <Hash className="w-8 h-8" />,
    path: "/counter",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Dot Canvas",
    description: "Draw with dots in this interactive canvas",
    icon: <MousePointer className="w-8 h-8" />,
    path: "/dot-canvas",
    color: "from-green-500 to-emerald-500"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen p-6 sm:p-12 page-transition">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Interactive Lab</h1>
        <p className="text-lg text-muted-foreground">
          A collection of fun experiments and interactive toys
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((experiment) => (
          <Link key={experiment.path} to={experiment.path}>
            <div className="experiment-card group">
              <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${experiment.color}`} />
              <div className="relative">
                <div className="mb-4 text-primary">{experiment.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{experiment.title}</h2>
                <p className="text-muted-foreground">{experiment.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;