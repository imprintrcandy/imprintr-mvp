
import { Button } from "@/components/ui/button";
import { ChallengeCard, Challenge } from "@/components/challenge/ChallengeCard";
import { Map } from "lucide-react";

interface ChallengeGridProps {
  challenges: Challenge[];
  hasLocationFilters: boolean;
  onJoin: (challengeId: string) => void;
  onContinue: (challengeId: string) => void;
  onView: (challengeId: string) => void;
  onClearAllFilters: () => void;
}

export const ChallengeGrid = ({
  challenges,
  hasLocationFilters,
  onJoin,
  onContinue,
  onView,
  onClearAllFilters
}: ChallengeGridProps) => {
  if (challenges.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No challenges found</h3>
        <p className="text-muted-foreground mb-4">
          {hasLocationFilters 
            ? `No challenges match your location criteria.`
            : "No challenges match your search criteria."
          }
        </p>
        <Button variant="outline" onClick={onClearAllFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {challenges.map(challenge => (
        <ChallengeCard 
          key={challenge.id} 
          challenge={challenge} 
          onJoin={onJoin}
          onContinue={onContinue}
          onView={onView}
        />
      ))}
    </>
  );
};
