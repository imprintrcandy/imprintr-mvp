
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
      badge: "bg-muted text-muted-foreground hover:bg-muted/90",
      text: "Not Started"
    },
    "in-progress": {
      badge: "bg-imprint-600 text-white hover:bg-imprint-500",
      text: "In Progress"
    },
    "completed": {
      badge: "bg-accent text-accent-foreground hover:bg-accent/90",
      text: "Completed"
    }
  };

  const { badge: badgeStyle, text: statusText } = statusStyles[challenge.status];

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
    <Card className={cn("overflow-hidden h-full flex flex-col", className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
          <Badge className={cn("text-xs px-2 py-1 rounded-full", badgeStyle)}>
            {statusText}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{challenge.description}</p>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{challenge.progress}/{challenge.target} {challenge.category === "photos" ? "photos" : "imprints"}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className={cn(
                "h-2.5 rounded-full",
                challenge.status === "completed" ? "bg-accent" : "bg-imprint-600"
              )}
              style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {challenge.deadline && (
          <div className="mt-3 text-sm">
            <span className="text-muted-foreground">Deadline: </span>
            <span>{new Date(challenge.deadline).toLocaleDateString()}</span>
          </div>
        )}
        
        {challenge.participants && (
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Participants: </span>
            <span>{challenge.participants}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAction} 
          variant={challenge.status === "completed" ? "outline" : "default"}
          className="w-full"
        >
          {challenge.status === "not-started" && "Join Challenge"}
          {challenge.status === "in-progress" && "Continue Challenge"}
          {challenge.status === "completed" && "View Results"}
        </Button>
      </CardFooter>
    </Card>
  );
};
