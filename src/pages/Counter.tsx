import React from 'react';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LucideChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Counter = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Simulate fetching the counter value
  const { data: count = 0, isLoading } = useQuery({
    queryKey: ['globalCount'],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      const mockCount = Math.floor(Math.random() * 1000000);
      console.log('Fetched count:', mockCount);
      return mockCount;
    },
    refetchInterval: 2000, // Refetch every 2 seconds
  });

  // Simulate incrementing the counter
  const { mutate: incrementCount } = useMutation({
    mutationFn: async () => {
      // In a real app, this would call an API
      console.log('Incrementing count');
      return count + 1;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalCount'] });
      toast({
        title: "Counter increased!",
        description: "You've contributed to the global count.",
      });
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold mb-8">Global Counter</h1>
        
        <div className="experiment-card max-w-md mx-auto p-8">
          <div className="text-6xl md:text-8xl font-bold mb-8 transition-all">
            {isLoading ? (
              <div className="animate-pulse">...</div>
            ) : (
              <div className="animate-in slide-in-from-bottom duration-300">
                {count.toLocaleString()}
              </div>
            )}
          </div>
          
          <Button
            size="lg"
            className="group hover:scale-105 transition-all duration-300"
            onClick={() => incrementCount()}
          >
            <LucideChevronUp className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            Increment Counter
          </Button>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Join thousands of others in this collective counting experiment!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Counter;