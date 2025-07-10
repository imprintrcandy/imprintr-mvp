
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, Award, MessageSquare, Map, Users, Vault, Clock } from "lucide-react";
import { ProfileBadges } from "./ProfileBadges";
import { ProfileChallenges } from "./ProfileChallenges";
import { ProfileImprints } from "./ProfileImprints";
import { ProfileMap } from "./ProfileMap";
import { ProfileReferrals } from "./ProfileReferrals";
import { ProfileVault } from "./ProfileVault";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  badge_count: number;
  imprint_count: number;
  created_at: string;
}

interface ProfileDashboardProps {
  userId: string;
  isOwnProfile: boolean;
  profile: UserProfile;
}

export const ProfileDashboard = ({ userId, isOwnProfile, profile }: ProfileDashboardProps) => {
  const [activeTab, setActiveTab] = useState("badges");

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <CardContent className="p-0">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-coral-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{profile.badge_count}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </CardContent>
        </Card>
        
        <Card className="p-4 text-center">
          <CardContent className="p-0">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-mint-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{profile.imprint_count}</div>
            <div className="text-sm text-gray-600">Imprints</div>
          </CardContent>
        </Card>

        <Card className="p-4 text-center">
          <CardContent className="p-0">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-lavender-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">Active</div>
            <div className="text-sm text-gray-600">Since {memberSince}</div>
          </CardContent>
        </Card>

        <Card className="p-4 text-center">
          <CardContent className="p-0">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-peach-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">Connected</div>
            <div className="text-sm text-gray-600">Community</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Badges</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="imprints" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Imprints</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Map</span>
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Referrals</span>
          </TabsTrigger>
          <TabsTrigger value="vault" className="flex items-center gap-2">
            <Vault className="h-4 w-4" />
            <span className="hidden sm:inline">Vault</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="badges" className="space-y-4">
            <ProfileBadges userId={userId} isOwnProfile={isOwnProfile} />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <ProfileChallenges userId={userId} isOwnProfile={isOwnProfile} />
          </TabsContent>

          <TabsContent value="imprints" className="space-y-4">
            <ProfileImprints userId={userId} isOwnProfile={isOwnProfile} />
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <ProfileMap userId={userId} />
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <ProfileReferrals userId={userId} isOwnProfile={isOwnProfile} profile={profile} />
          </TabsContent>

          <TabsContent value="vault" className="space-y-4">
            <ProfileVault isOwnProfile={isOwnProfile} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
