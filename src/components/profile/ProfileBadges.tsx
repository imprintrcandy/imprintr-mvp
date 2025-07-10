
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Award, Calendar, Trophy, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface BadgeData {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  story: string | null;
  earned_at: string;
  challenge: {
    title: string;
    category: string;
  } | null;
}

interface ProfileBadgesProps {
  userId: string;
  isOwnProfile: boolean;
}

export const ProfileBadges = ({ userId, isOwnProfile }: ProfileBadgesProps) => {
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);

  useEffect(() => {
    fetchBadges();
  }, [userId]);

  const fetchBadges = async () => {
    try {
      const { data, error } = await supabase
        .from("badges")
        .select(`
          *,
          challenge:challenge_id (
            title,
            category
          )
        `)
        .eq("user_id", userId)
        .order("earned_at", { ascending: false });

      if (error) throw error;
      setBadges(data as any || []);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  const BadgeCard = ({ badge }: { badge: BadgeData }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardContent className="p-4 text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              {badge.image_url ? (
                <img src={badge.image_url} alt={badge.title} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <Award className="h-10 w-10 text-white" />
              )}
            </div>
            <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{formatDate(badge.earned_at)}</p>
            {badge.challenge && (
              <Badge variant="outline" className="text-xs">
                {badge.challenge.category}
              </Badge>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-coral-500" />
            {badge.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center">
              {badge.image_url ? (
                <img src={badge.image_url} alt={badge.title} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <Award className="h-12 w-12 text-white" />
              )}
            </div>
            <p className="text-gray-600 mb-2">{badge.description}</p>
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              Earned on {formatDate(badge.earned_at)}
            </div>
          </div>
          
          {badge.challenge && (
            <div className="bg-gradient-to-r from-mint-50 to-lavender-50 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-1">Challenge Completed</h4>
              <p className="text-sm text-gray-600">{badge.challenge.title}</p>
              <Badge variant="outline" className="text-xs mt-2">
                {badge.challenge.category}
              </Badge>
            </div>
          )}

          {badge.story && (
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">My Story</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{badge.story}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  const EmptyState = () => (
    <div className="text-center py-12 space-y-4">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-mint-400 to-lavender-400 rounded-full flex items-center justify-center">
        <Award className="h-8 w-8 text-white" />
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-1">
          {isOwnProfile ? "No badges earned yet" : "No badges to show"}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {isOwnProfile 
            ? "Complete your first challenge to earn your first badge!"
            : "This user hasn't earned any badges yet"}
        </p>
        {isOwnProfile && (
          <Link to="/challenges">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Explore Challenges
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4 text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (badges.length === 0) {
    return <EmptyState />;
  }

  // Group badges by category
  const badgesByCategory = badges.reduce((acc, badge) => {
    const category = badge.challenge?.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, BadgeData[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Award className="h-6 w-6 text-coral-500" />
          My Badges ({badges.length})
        </h2>
        {isOwnProfile && (
          <Link to="/challenges">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Earn More
            </Button>
          </Link>
        )}
      </div>

      {Object.entries(badgesByCategory).map(([category, categoryBadges]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            {category} ({categoryBadges.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoryBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
