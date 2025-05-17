
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  progress: number;
  achieved: boolean;
  category: string;
}

interface BadgeCardProps {
  badge: Badge;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BadgeCard = ({ badge, className, size = "md" }: BadgeCardProps) => {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center group",
        className
      )}
    >
      <Card className={cn("badge-card rounded-full overflow-hidden p-0", sizeClasses[size])}>
        <CardContent className="p-0 h-full w-full relative">
          <img
            src={badge.imageUrl}
            alt={badge.name}
            className={cn(
              "h-full w-full object-cover",
              !badge.achieved && "opacity-80 grayscale"
            )}
          />
          {!badge.achieved && badge.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1">
              <Progress value={badge.progress} className="h-1.5" />
            </div>
          )}
          {badge.achieved && (
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs p-1 rounded-bl-md">
              ✓
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-20 bg-background rounded-lg p-3 shadow-md w-48 z-10">
        <h3 className="font-semibold text-sm">{badge.name}</h3>
        <p className="text-muted-foreground text-xs mt-1">{badge.description}</p>
        {!badge.achieved && (
          <p className="text-xs mt-1 font-medium">
            Progress: {badge.progress}%
          </p>
        )}
      </div>
    </div>
  );
};
