
import { Button } from "@/components/ui/button";
import { BadgeCard, Badge } from "@/components/badge/BadgeCard";

interface BadgesListProps {
  badges: Badge[];
}

export const BadgesList = ({ badges }: BadgesListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-medium">Imprint Badges</h2>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Browse Available Badges
        </Button>
      </div>

      <h3 className="text-xl font-medium">Earned Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {badges.filter(badge => badge.achieved).map((badge) => (
          <div key={badge.id} className="flex flex-col items-center">
            <BadgeCard badge={badge} size="md" />
            <p className="mt-2 text-center text-sm font-medium">{badge.name}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-medium mt-8">In Progress</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {badges.filter(badge => !badge.achieved && badge.progress > 0).map((badge) => (
          <div key={badge.id} className="flex flex-col items-center">
            <BadgeCard badge={badge} size="md" />
            <p className="mt-2 text-center text-sm font-medium">{badge.name}</p>
            <p className="text-xs text-muted-foreground">{badge.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};
