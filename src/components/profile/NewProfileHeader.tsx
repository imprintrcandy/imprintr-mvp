import { useState } from "react";
import { Camera, Edit, MapPin, Wallet, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

interface NewProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onProfileUpdate: () => void;
}

export const NewProfileHeader = ({ profile, isOwnProfile, onProfileUpdate }: NewProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name || "",
    bio: profile.bio || "",
    quote: profile.quote || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("Users")
        .update({
          name: editForm.name,
          // Note: bio and quote fields would need to be added to Users table
        })
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully!",
      });

      setIsEditing(false);
      onProfileUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Cover Photo Area */}
      <div className="h-32 bg-gradient-to-r from-coral-400 via-peach-400 to-lavender-400 relative">
        {isOwnProfile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <Camera className="h-4 w-4 mr-2" />
            Cover
          </Button>
        )}
      </div>

      {/* Profile Content */}
      <div className="px-8 pb-8">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar_url} alt={profile.name || "User"} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-coral-400 to-peach-400 text-white">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {profile.name || "Anonymous User"}
                {profile.is_verified && (
                  <Badge variant="default" className="bg-blue-500">
                    Verified
                  </Badge>
                )}
              </h1>
              <p className="text-lg text-gray-600">
                @{profile.username || profile.name?.toLowerCase().replace(/\s+/g, '') || 'user'}
              </p>
            </div>

            {profile.quote && (
              <div className="bg-gradient-to-r from-mint-50 to-lavender-50 p-4 rounded-2xl">
                <p className="text-gray-700 italic font-medium">
                  "{profile.quote}"
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-coral-500" />
                <span className="font-medium">{profile.badge_count} badges earned</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-mint-500" />
                <span>Member since {memberSince}</span>
              </div>

              {profile.wallet_address && (
                <div className="flex items-center gap-1">
                  <Wallet className="h-4 w-4 text-lavender-500" />
                  <span className="font-mono">{formatWalletAddress(profile.wallet_address)}</span>
                </div>
              )}
            </div>
          </div>

          {isOwnProfile && (
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="quote">Personal Quote</Label>
                    <Textarea
                      id="quote"
                      value={editForm.quote}
                      onChange={(e) => setEditForm(prev => ({ ...prev, quote: e.target.value }))}
                      placeholder="I want to be remembered for..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex-1"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {profile.bio && (
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};