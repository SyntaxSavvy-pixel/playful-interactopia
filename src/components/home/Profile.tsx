import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserProfile {
  username: string | null;
  avatar_url: string | null;
}

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="absolute top-4 left-4 flex items-center gap-4">
      <Avatar className="h-16 w-16 ring-2 ring-primary/50">
        <AvatarImage src={profile?.avatar_url || "https://api.dicebear.com/7.x/pixel-art/svg?seed=lovable"} />
        <AvatarFallback>
          {profile?.username?.substring(0, 2).toUpperCase() || 'LV'}
        </AvatarFallback>
      </Avatar>
      <div className="hidden sm:block">
        <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          {profile?.username || 'Lovable Player'}
        </h3>
        <p className="text-sm text-muted-foreground">Interactive Explorer</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSignOut}
        className="ml-2"
      >
        Sign Out
      </Button>
    </div>
  );
};