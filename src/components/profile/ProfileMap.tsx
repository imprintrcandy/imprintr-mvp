
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BadgeLocation {
  id: string;
  title: string;
  earned_at: string;
  location?: string;
  challenge?: {
    title: string;
    category: string;
  };
}

interface ProfileMapProps {
  userId: string;
}

export const ProfileMap = ({ userId }: ProfileMapProps) => {
  const [badges, setBadges] = useState<BadgeLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBadgeLocations();
  }, [userId]);

  const fetchBadgeLocations = async () => {
    try {
      // For now, we'll fetch badges and mock some location data
      // In the future, you can add location fields to badges table
      const { data, error } = await supabase
        .from("badges")
        .select(`
          id,
          title,
          earned_at,
          challenge:challenge_id (
            title,
            category
          )
        `)
        .eq("user_id", userId)
        .order("earned_at", { ascending: false });

      if (error) throw error;
      
      // Mock some locations for demonstration
      const badgesWithLocations = (data || []).map((badge, index) => ({
        ...badge,
        location: [
          "San Francisco, CA",
          "New York, NY", 
          "Los Angeles, CA",
          "Chicago, IL",
          "Austin, TX"
        ][index % 5]
      }));
      
      setBadges(badgesWithLocations as any);
    } catch (error) {
      console.error("Error fetching badge locations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-mint-500" />
            Memory Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Map className="h-6 w-6 text-mint-500" />
          Memory Map
        </h2>
        <Button variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          View Full Map
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Placeholder Map */}
          <div className="bg-gradient-to-br from-mint-50 to-lavender-50 h-64 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center space-y-4">
              <Map className="h-16 w-16 mx-auto text-mint-400" />
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Interactive Memory Map</h3>
                <p className="text-sm text-gray-600">
                  See where your memories were made around the world
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Coming Soon - Full Map Integration
                </p>
              </div>
            </div>
          </div>

          {/* Location List */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 mb-4">Memory Locations ({badges.length})</h4>
            {badges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{badge.title}</h5>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>{badge.location}</span>
                    <span>•</span>
                    <span>{new Date(badge.earned_at).toLocaleDateString()}</span>
                  </div>
                </div>
                {badge.challenge && (
                  <div className="text-xs text-gray-500">
                    {badge.challenge.category}
                  </div>
                )}
              </div>
            ))}
            
            {badges.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No memory locations yet. Earn badges to see your memory map!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
