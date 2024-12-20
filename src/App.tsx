import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import GradientGenerator from './pages/GradientGenerator';
import Counter from './pages/Counter';
import DotCanvas from './pages/DotCanvas';

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
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;