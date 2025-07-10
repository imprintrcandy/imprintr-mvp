
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Upload, X, Plus, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

interface ChallengeParticipation {
  id: string;
  status: string;
  joined_at: string;
  challenge: Challenge;
}

interface ProfileChallengesProps {
  userId: string;
  isOwnProfile: boolean;
}

export const ProfileChallenges = ({ userId, isOwnProfile }: ProfileChallengesProps) => {
  const [participations, setParticipations] = useState<ChallengeParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    fetchChallenges();
  }, [userId]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from("challenge_participations")
        .select(`
          *,
          challenge:challenge_id (
            id,
            title,
            description,
            category,
            difficulty
          )
        `)
        .eq("user_id", userId)
        .order("joined_at", { ascending: false });

      if (error) throw error;
      setParticipations(data as any || []);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "epic": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "text-blue-600 bg-blue-50";
      case "submitted": return "text-orange-600 bg-orange-50";
      case "completed": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getDaysActive = (joinedAt: string) => {
    const joined = new Date(joinedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joined.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredParticipations = participations.filter(participation => {
    if (activeFilter === "all") return true;
    return participation.status === activeFilter;
  });

  const ChallengeCard = ({ participation }: { participation: ChallengeParticipation }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-coral-500" />
              {participation.challenge.title}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {participation.challenge.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {participation.challenge.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs text-white ${getDifficultyColor(participation.challenge.difficulty)}`}
              >
                {participation.challenge.difficulty}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${getStatusColor(participation.status)}`}
              >
                {participation.status}
              </Badge>
            </div>
            
            <span className="text-xs text-gray-500">
              {participation.status === 'active' ? 
                `Active for ${getDaysActive(participation.joined_at)} days` :
                `Joined ${new Date(participation.joined_at).toLocaleDateString()}`
              }
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {participation.status === 'active' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-coral-600 font-medium">Ready to submit</span>
            </div>
            <Progress value={75} className="h-2" />
            
            {isOwnProfile && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex items-center gap-2 bg-gradient-to-r from-coral-500 to-peach-500">
                  <Upload className="h-4 w-4" />
                  Submit Proof
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            )}
          </div>
        )}

        {participation.status === 'completed' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Challenge Completed!</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Badge
            </Button>
          </div>
        )}

        {participation.status === 'submitted' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Under Review</span>
            </div>
            <p className="text-xs text-gray-500">
              Your submission is being reviewed. You'll be notified once approved.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const EmptyState = () => (
    <div className="text-center py-12 space-y-4">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-mint-400 to-lavender-400 rounded-full flex items-center justify-center">
        <Trophy className="h-8 w-8 text-white" />
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-1">
          {isOwnProfile ? "No challenges joined yet" : "No challenges to show"}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {isOwnProfile 
            ? "Join your first challenge to start earning badges!"
            : "This user hasn't joined any challenges yet"}
        </p>
        {isOwnProfile && (
          <Link to="/challenges">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Browse Challenges
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (participations.length === 0) {
    return <EmptyState />;
  }

  const statusCounts = {
    all: participations.length,
    active: participations.filter(p => p.status === 'active').length,
    submitted: participations.filter(p => p.status === 'submitted').length,
    completed: participations.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="h-6 w-6 text-mint-500" />
          {isOwnProfile ? "My Challenges" : "Challenges"} ({participations.length})
        </h2>
        {isOwnProfile && (
          <Link to="/challenges">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Join More
            </Button>
          </Link>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b">
        {[
          { key: 'all', label: 'All', count: statusCounts.all },
          { key: 'active', label: 'Active', count: statusCounts.active },
          { key: 'submitted', label: 'Submitted', count: statusCounts.submitted },
          { key: 'completed', label: 'Completed', count: statusCounts.completed },
        ].map(filter => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeFilter === filter.key
                ? 'border-coral-500 text-coral-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {filteredParticipations.map((participation) => (
          <ChallengeCard key={participation.id} participation={participation} />
        ))}
      </div>
    </div>
  );
};
