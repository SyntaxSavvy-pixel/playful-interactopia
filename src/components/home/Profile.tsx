import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound, LogOut } from "lucide-react";

interface UserProfile {
  username: string | null;
  avatar_url: string | null;
}

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
      } catch (error) {
        console.error('Error in fetchProfile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
        navigate('/auth');
      }
    } catch (error) {
      console.error('Error in handleSignOut:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleProfileClick = () => {
    navigate('/auth');
  };

  return (
    <div className="absolute top-4 left-4 flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-16 w-16 ring-2 ring-primary/50 cursor-pointer hover:ring-primary transition-all">
            <AvatarImage src={profile?.avatar_url || "https://api.dicebear.com/7.x/pixel-art/svg?seed=lovable"} />
            <AvatarFallback>
              {profile?.username?.substring(0, 2).toUpperCase() || 'LV'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              {profile?.username || 'Lovable Player'}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
            <UserRound className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden sm:block">
        <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          {profile?.username || 'Lovable Player'}
        </h3>
        <p className="text-sm text-muted-foreground">Interactive Explorer</p>
      </div>
    </div>
  );
};