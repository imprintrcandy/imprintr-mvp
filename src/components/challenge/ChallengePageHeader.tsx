
import { Button } from "@/components/ui/button";

export const ChallengePageHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Imprint Challenges</h1>
        <p className="text-muted-foreground mt-2">
          Discover location-based challenges across the Philippines
        </p>
      </div>
      <Button className="mt-4 sm:mt-0">
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
        Create Challenge
      </Button>
    </div>
  );
};
