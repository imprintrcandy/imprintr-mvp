
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImprintCard } from "@/components/memory/MemoryCard";
import { Imprint } from "@/components/memory/MemoryCard";

interface ImprintsListProps {
  imprints: Imprint[];
}

export const ImprintsList = ({ imprints }: ImprintsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-medium">Your Imprints</h2>
        <Link to="/new-imprint">
          <Button>
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
            New Imprint
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imprints.map((imprint) => (
          <ImprintCard key={imprint.id} imprint={imprint} />
        ))}
      </div>
    </div>
  );
};
