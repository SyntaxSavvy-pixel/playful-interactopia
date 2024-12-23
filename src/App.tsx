import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Index from './pages/Index';
import Auth from './pages/Auth';
import GradientGenerator from './pages/GradientGenerator';
import Counter from './pages/Counter';
import DotCanvas from './pages/DotCanvas';
import BalloonFrenzy from './pages/BalloonFrenzy';
import WordlyWonders from './pages/WordlyWonders';
import RunawayRobot from './pages/RunawayRobot';
import EchoRunner from './pages/EchoRunner';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <Routes>
            <Route 
              path="/auth" 
              element={isAuthenticated ? <Navigate to="/" /> : <Auth />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Index /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/gradient-generator" 
              element={isAuthenticated ? <GradientGenerator /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/counter" 
              element={isAuthenticated ? <Counter /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/dot-canvas" 
              element={isAuthenticated ? <DotCanvas /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/balloon-frenzy" 
              element={isAuthenticated ? <BalloonFrenzy /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/wordly-wonders" 
              element={isAuthenticated ? <WordlyWonders /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/runaway-robot" 
              element={isAuthenticated ? <RunawayRobot /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/echo-runner" 
              element={isAuthenticated ? <EchoRunner /> : <Navigate to="/auth" />} 
            />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;