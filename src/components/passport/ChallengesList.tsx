
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChallengeCard, Challenge } from "@/components/challenge/ChallengeCard";

interface ChallengesListProps {
  challenges: Challenge[];
}

export const ChallengesList = ({ challenges }: ChallengesListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-display font-medium">Imprint Challenges</h2>
        <Link to="/challenges">
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
            Browse Challenges
          </Button>
        </Link>
      </div>

      <h3 className="text-xl font-medium">Active Challenges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.filter(c => c.status === "in-progress").slice(0, 2).map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      <h3 className="text-xl font-medium mt-8">Completed Challenges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.filter(c => c.status === "completed").slice(0, 1).map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};
