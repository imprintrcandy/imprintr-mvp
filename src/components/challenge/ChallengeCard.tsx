
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  category: string;
  progress: number;
  target: number;
  status: "not-started" | "in-progress" | "completed";
  participants?: number;
  badgeId?: string;
  emoji?: string;
  difficulty?: "easy" | "medium" | "epic";
  joinCount?: number;
}

interface ChallengeCardProps {
  challenge: Challenge;
  className?: string;
  onJoin?: (challengeId: string) => void;
  onContinue?: (challengeId: string) => void;
  onView?: (challengeId: string) => void;
}

export const ChallengeCard = ({
  challenge,
  className,
  onJoin,
  onContinue,
  onView
}: ChallengeCardProps) => {
  const statusStyles = {
    "not-started": {
      badge: "bg-blush text-blush-foreground hover:bg-blush/90",
      text: "Join Now"
    },
    "in-progress": {
      badge: "bg-gradient-badge text-white border-0",
      text: "In Progress"
    },
    "completed": {
      badge: "bg-sunset text-sunset-foreground hover:bg-sunset/90",
      text: "Completed ✓"
    }
  };

  const difficultyStyles = {
    "easy": { color: "text-mint-foreground", icon: "🟢", label: "Easy" },
    "medium": { color: "text-sunset-foreground", icon: "🟡", label: "Medium" },
    "epic": { color: "text-memory-600", icon: "🔴", label: "Epic" }
  };

  const { badge: badgeStyle, text: statusText } = statusStyles[challenge.status];
  const difficulty = challenge.difficulty || "medium";
  const difficultyInfo = difficultyStyles[difficulty];

  const handleAction = () => {
    if (challenge.status === "not-started" && onJoin) {
      onJoin(challenge.id);
    } else if (challenge.status === "in-progress" && onContinue) {
      onContinue(challenge.id);
    } else if (challenge.status === "completed" && onView) {
      onView(challenge.id);
    }
  };

  return (
    <Card className={cn("overflow-hidden h-full flex flex-col border-0 shadow-lg rounded-3xl bg-gradient-to-br from-white to-cream/30 hover:shadow-xl transition-all duration-300 group", className)}>
      {/* Header with Emoji and Status */}
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
            {challenge.emoji || "🎯"}
          </div>
          <Badge className={cn("text-xs px-3 py-1 rounded-full font-medium border-0", badgeStyle)}>
            {statusText}
          </Badge>
        </div>
        <h3 className="text-xl font-display font-bold leading-tight">{challenge.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm">{difficultyInfo.icon}</span>
          <span className={cn("text-sm font-medium", difficultyInfo.color)}>{difficultyInfo.label}</span>
          {challenge.joinCount && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{challenge.joinCount} joined</span>
            </>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{challenge.description}</p>
        
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{challenge.progress}/{challenge.target} complete</span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-3">
            <div 
              className={cn(
                "h-3 rounded-full transition-all duration-500",
                challenge.status === "completed" ? "bg-gradient-badge" : "bg-gradient-memory"
              )}
              style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          {challenge.deadline && (
            <div className="flex items-center gap-1">
              <span>⏰</span>
              <span>{new Date(challenge.deadline).toLocaleDateString()}</span>
            </div>
          )}
          {challenge.participants && (
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{challenge.participants} participants</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="w-full space-y-2">
          <Button 
            onClick={handleAction} 
            variant={challenge.status === "completed" ? "outline" : "default"}
            className={cn(
              "w-full rounded-2xl font-semibold py-3 transition-all duration-200",
              challenge.status === "not-started" && "bg-gradient-memory text-white border-0 hover:shadow-lg",
              challenge.status === "in-progress" && "bg-gradient-badge text-white border-0 hover:shadow-lg",
              challenge.status === "completed" && "border-sunset/30 text-sunset-foreground hover:bg-sunset/10"
            )}
          >
            {challenge.status === "not-started" && "🚀 Join Challenge"}
            {challenge.status === "in-progress" && "⚡ Continue Challenge"}
            {challenge.status === "completed" && "🏆 View Results"}
          </Button>
          
          {challenge.status === "not-started" && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-muted-foreground hover:text-foreground rounded-xl"
            >
              📤 Share Challenge
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
