import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to Interactive Lab
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to start your journey
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary-foreground))'
                  }
                }
              }
            }}
            providers={['google', 'github']}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;