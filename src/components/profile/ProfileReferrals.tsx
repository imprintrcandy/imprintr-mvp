
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, Share2, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  name: string | null;
  email: string | null;
}

interface ProfileReferralsProps {
  userId: string;
  isOwnProfile: boolean;
  profile: UserProfile;
}

export const ProfileReferrals = ({ userId, isOwnProfile, profile }: ProfileReferralsProps) => {
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOwnProfile) {
      generateReferralCode();
      // Simulate referral count - in real app, fetch from database
      setReferralCount(Math.floor(Math.random() * 15));
    }
  }, [isOwnProfile, profile]);

  const generateReferralCode = () => {
    // Generate referral code based on user info
    const baseName = profile.name?.toLowerCase().replace(/\s+/g, '') || 
                    profile.email?.split('@')[0] || 
                    'user';
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const code = `${baseName}-${randomSuffix}`;
    setReferralCode(code);
  };

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Error",
        description: "Failed to copy referral link",
        variant: "destructive",
      });
    }
  };

  const shareReferralLink = async () => {
    const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Imprintr',
          text: 'Create your digital memory passport and start earning badges!',
          url: referralLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyReferralLink();
    }
  };

  const getBadgeStatus = () => {
    if (referralCount >= 25) return { status: "Champion", color: "bg-purple-500" };
    if (referralCount >= 10) return { status: "Connector", color: "bg-blue-500" };
    if (referralCount >= 3) return { status: "Advocate", color: "bg-green-500" };
    return { status: "Newcomer", color: "bg-gray-500" };
  };

  const badgeInfo = getBadgeStatus();

  if (!isOwnProfile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-peach-500" />
            Referral Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Referral information is private</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="h-6 w-6 text-peach-500" />
          Referral Impact
        </h2>
        <Badge variant="outline" className={`${badgeInfo.color} text-white`}>
          {badgeInfo.status}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-coral-600">{referralCount}</div>
            <div className="text-sm text-gray-600">People Invited</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-mint-600">{Math.floor(referralCount * 0.7)}</div>
            <div className="text-sm text-gray-600">Joined</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-lavender-600">{Math.floor(referralCount / 3)}</div>
            <div className="text-sm text-gray-600">Rewards Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-peach-600">#{Math.floor(Math.random() * 100) + 1}</div>
            <div className="text-sm text-gray-600">Leaderboard</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-mint-500" />
            Your Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={`imprintr.app/r/${referralCode}`}
              readOnly 
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="font-mono text-sm"
            />
            <Button onClick={copyReferralLink} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={shareReferralLink}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <p className="text-sm text-gray-600">
            Share your unique link to invite friends and earn referral rewards!
          </p>
        </CardContent>
      </Card>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-coral-500" />
            Referral Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to next reward</span>
                <span>{referralCount}/25</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-coral-500 to-peach-500"
                  style={{ width: `${Math.min((referralCount / 25) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Reward Milestones */}
            <div className="space-y-3">
              {[
                { count: 3, reward: "Advocate Badge", unlocked: referralCount >= 3 },
                { count: 10, reward: "Connector Badge + Free Template", unlocked: referralCount >= 10 },
                { count: 25, reward: "Champion Badge + Premium Features", unlocked: referralCount >= 25 },
              ].map((milestone) => (
                <div key={milestone.count} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.unlocked ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <Gift className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{milestone.reward}</div>
                      <div className="text-xs text-gray-500">{milestone.count} referrals</div>
                    </div>
                  </div>
                  <Badge variant={milestone.unlocked ? "default" : "secondary"}>
                    {milestone.unlocked ? "Unlocked" : "Locked"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
