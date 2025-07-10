import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Share, UserPlus, Trophy, Heart, QrCode, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  username?: string;
}

interface PublicProfileActionsProps {
  profile: UserProfile;
}

const PublicProfileActions = ({ profile }: PublicProfileActionsProps) => {
  const { user: currentUser } = useAuth();
  const [isWritingImprint, setIsWritingImprint] = useState(false);
  const [imprintContent, setImprintContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleShareProfile = async () => {
    const profileUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name || "User"}'s Memory Passport`,
          text: `Check out ${profile.name || "this user"}'s memory collection on Imprintr!`,
          url: profileUrl
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(profileUrl);
      toast({
        title: "Link Copied!",
        description: "Profile link has been copied to your clipboard.",
      });
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Profile link has been copied to your clipboard.",
    });
  };

  const handleSubmitImprint = async () => {
    if (!currentUser || !imprintContent.trim()) {
      toast({
        title: "Error",
        description: "Please write your imprint message.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("imprints")
        .insert({
          from_user_id: currentUser.id,
          to_user_id: profile.id,
          content: imprintContent.trim(),
          type: "testimonial"
        });

      if (error) throw error;

      toast({
        title: "Imprint Sent!",
        description: `Your imprint has been shared with ${profile.name || "this user"}.`,
      });

      setImprintContent("");
      setIsWritingImprint(false);
    } catch (error) {
      console.error("Error submitting imprint:", error);
      toast({
        title: "Error",
        description: "Failed to send imprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Share className="h-5 w-5 text-coral-500" />
          Connect & Share
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Share Profile */}
        <Button
          onClick={handleShareProfile}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Share className="h-4 w-4" />
          Share Profile
        </Button>

        {/* Copy Link */}
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Link
        </Button>

        {/* QR Code */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled
        >
          <QrCode className="h-4 w-4" />
          QR Code (Soon)
        </Button>

        {/* Write Imprint */}
        {currentUser && currentUser.id !== profile.id && (
          <Dialog open={isWritingImprint} onOpenChange={setIsWritingImprint}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-gradient-to-r from-coral-500 to-peach-500 hover:from-coral-600 hover:to-peach-600 flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Leave Imprint
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Leave an Imprint for {profile.name || "this user"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imprint">Your Message</Label>
                  <Textarea
                    id="imprint"
                    value={imprintContent}
                    onChange={(e) => setImprintContent(e.target.value)}
                    placeholder="Share what this person means to you, or acknowledge their impact..."
                    rows={4}
                    maxLength={300}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {imprintContent.length}/300 characters
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitImprint}
                    disabled={submitting || !imprintContent.trim()}
                    className="flex-1"
                  >
                    {submitting ? "Sending..." : "Send Imprint"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsWritingImprint(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Follow/Connect (placeholder for future) */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled
        >
          <UserPlus className="h-4 w-4" />
          Follow (Coming Soon)
        </Button>

        {/* Nominate to Challenge */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled
        >
          <Trophy className="h-4 w-4" />
          Nominate to Challenge
        </Button>
      </CardContent>
    </Card>
  );
};

export default PublicProfileActions;