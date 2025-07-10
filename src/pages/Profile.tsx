import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { NewProfileHeader } from "@/components/profile/NewProfileHeader";
import BadgesGrid from "@/components/profile/BadgesGrid";
import OngoingChallenges from "@/components/profile/OngoingChallenges";
import ImprintsSection from "@/components/profile/ImprintsSection";
import PublicProfileActions from "@/components/profile/PublicProfileActions";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  username?: string;
  avatar_url?: string;
  bio?: string;
  quote?: string;
  wallet_address?: string;
  badge_count: number;
  is_verified: boolean | null;
  created_at: string;
}

interface Badge {
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

interface OngoingChallenge {
  id: string;
  status: string;
  joined_at: string;
  challenge: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
  };
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [ongoingChallenges, setOngoingChallenges] = useState<OngoingChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // Extract username from route (remove @ symbol)
  const cleanUsername = username?.startsWith('@') ? username.slice(1) : username;

  useEffect(() => {
    if (cleanUsername) {
      fetchProfile();
    }
  }, [cleanUsername, currentUser]);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      // First try to find user by username, then by email if it's the current user
      let profileQuery = supabase
        .from("Users")
        .select("*");

      if (cleanUsername) {
        // For now, we'll search by name since we don't have username field yet
        profileQuery = profileQuery.ilike("name", `%${cleanUsername}%`);
      }

      const { data: profileData, error: profileError } = await profileQuery.single();

      if (profileError) {
        // If username search fails and it's potentially the current user's profile
        if (currentUser) {
          const { data: currentUserData, error: currentUserError } = await supabase
            .from("Users")
            .select("*")
            .eq("id", currentUser.id)
            .single();

          if (currentUserError) {
            throw currentUserError;
          }
          
          setProfile({ ...currentUserData, badge_count: 0 });
          setIsOwnProfile(true);
        } else {
          throw profileError;
        }
      } else {
        setProfile({ ...profileData, badge_count: 0 });
        setIsOwnProfile(currentUser?.id === profileData.id);
      }

      // Fetch badges count and data
      if (profileData?.id || currentUser?.id) {
        const userId = profileData?.id || currentUser?.id;
        
        const [badgesResponse, ongoingResponse] = await Promise.all([
          supabase
            .from("badges")
            .select(`
              *,
              challenge:challenge_id (
                title,
                category
              )
            `)
            .eq("user_id", userId)
            .order("earned_at", { ascending: false }),
          
          supabase
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
            .eq("status", "active")
        ]);

        if (badgesResponse.data) {
          setBadges(badgesResponse.data as any);
          setProfile(prev => prev ? { ...prev, badge_count: badgesResponse.data?.length || 0 } : null);
        }

        if (ongoingResponse.data) {
          setOngoingChallenges(ongoingResponse.data as any);
        }
      }

    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-lavender-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header Skeleton */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-96" />
                </div>
              </div>
            </div>
            
            {/* Content Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-64 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-lavender-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Profile Not Found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-lavender-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <NewProfileHeader 
            profile={profile} 
            isOwnProfile={isOwnProfile}
            onProfileUpdate={fetchProfile}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Badges and Challenges */}
            <div className="lg:col-span-2 space-y-8">
              <BadgesGrid badges={badges} />
              
              {isOwnProfile && ongoingChallenges.length > 0 && (
                <OngoingChallenges 
                  challenges={ongoingChallenges}
                  onChallengeUpdate={fetchProfile}
                />
              )}
            </div>

            {/* Right Column - Imprints and Actions */}
            <div className="space-y-8">
              <ImprintsSection 
                userId={profile.id}
                isOwnProfile={isOwnProfile}
              />
              
              {!isOwnProfile && (
                <PublicProfileActions 
                  profile={profile}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;