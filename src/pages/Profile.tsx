
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { NewProfileHeader } from "@/components/profile/NewProfileHeader";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
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
  imprint_count: number;
  is_verified: boolean | null;
  created_at: string;
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
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
          
          // Get badge and imprint counts
          const [badgeCountResponse, imprintCountResponse] = await Promise.all([
            supabase
              .from("badges")
              .select("id", { count: 'exact' })
              .eq("user_id", currentUser.id),
            supabase
              .from("imprints")
              .select("id", { count: 'exact' })
              .or(`from_user_id.eq.${currentUser.id},to_user_id.eq.${currentUser.id}`)
          ]);
          
          setProfile({ 
            ...currentUserData, 
            badge_count: badgeCountResponse.count || 0,
            imprint_count: imprintCountResponse.count || 0
          });
          setIsOwnProfile(true);
        } else {
          throw profileError;
        }
      } else {
        // Get badge and imprint counts for found user
        const [badgeCountResponse, imprintCountResponse] = await Promise.all([
          supabase
            .from("badges")
            .select("id", { count: 'exact' })
            .eq("user_id", profileData.id),
          supabase
            .from("imprints")
            .select("id", { count: 'exact' })
            .or(`from_user_id.eq.${profileData.id},to_user_id.eq.${profileData.id}`)
        ]);

        setProfile({ 
          ...profileData, 
          badge_count: badgeCountResponse.count || 0,
          imprint_count: imprintCountResponse.count || 0
        });
        setIsOwnProfile(currentUser?.id === profileData.id);
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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <NewProfileHeader 
            profile={profile} 
            isOwnProfile={isOwnProfile}
            onProfileUpdate={fetchProfile}
          />

          {/* Dashboard Content */}
          <ProfileDashboard 
            userId={profile.id}
            isOwnProfile={isOwnProfile}
            profile={profile}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
