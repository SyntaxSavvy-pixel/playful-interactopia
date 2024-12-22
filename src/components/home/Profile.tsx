import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Profile = () => {
  return (
    <div className="absolute top-4 left-4 flex items-center gap-4">
      <Avatar className="h-16 w-16 ring-2 ring-primary/50">
        <AvatarImage src="https://api.dicebear.com/7.x/pixel-art/svg?seed=lovable" />
        <AvatarFallback>LV</AvatarFallback>
      </Avatar>
      <div className="hidden sm:block">
        <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Lovable Player
        </h3>
        <p className="text-sm text-muted-foreground">Interactive Explorer</p>
      </div>
    </div>
  );
};