import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import GradientGenerator from './pages/GradientGenerator';
import Counter from './pages/Counter';
import DotCanvas from './pages/DotCanvas';
import BalloonFrenzy from './pages/BalloonFrenzy';
import WordlyWonders from './pages/WordlyWonders';
import RunawayRobot from './pages/RunawayRobot';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gradient-generator" element={<GradientGenerator />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/dot-canvas" element={<DotCanvas />} />
          <Route path="/balloon-frenzy" element={<BalloonFrenzy />} />
          <Route path="/wordly-wonders" element={<WordlyWonders />} />
          <Route path="/runaway-robot" element={<RunawayRobot />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;