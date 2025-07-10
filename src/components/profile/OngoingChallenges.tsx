import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Upload, X } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

interface OngoingChallenge {
  id: string;
  status: string;
  joined_at: string;
  challenge: Challenge;
}

interface OngoingChallengesProps {
  challenges: OngoingChallenge[];
  onChallengeUpdate: () => void;
}

const OngoingChallenges = ({ challenges, onChallengeUpdate }: OngoingChallengesProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "epic": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getDaysActive = (joinedAt: string) => {
    const joined = new Date(joinedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joined.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (challenges.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="h-6 w-6 text-mint-500" />
          Ongoing Challenges ({challenges.length})
        </h2>
      </div>

      <div className="space-y-4">
        {challenges.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-coral-500" />
                    {item.challenge.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.challenge.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  {item.challenge.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs text-white ${getDifficultyColor(item.challenge.difficulty)}`}
                >
                  {item.challenge.difficulty}
                </Badge>
                <span className="text-xs text-gray-500 ml-auto">
                  Active for {getDaysActive(item.joined_at)} days
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Progress indicator */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-coral-600 font-medium">Ready to submit proof</span>
                </div>
                <Progress value={75} className="h-2" />
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex items-center gap-2 bg-gradient-to-r from-coral-500 to-peach-500 hover:from-coral-600 hover:to-peach-600">
                    <Upload className="h-4 w-4" />
                    Submit Proof
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OngoingChallenges;