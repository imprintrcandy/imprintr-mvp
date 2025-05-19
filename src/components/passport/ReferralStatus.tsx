
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Users } from "lucide-react";

export const ReferralStatus = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // In a real app, this would come from the backend
    const storedCode = localStorage.getItem("userReferralCode");
    if (storedCode) {
      setReferralCode(storedCode);
    } else {
      // Generate a code if one doesn't exist
      const firstName = localStorage.getItem("userFirstName") || "user";
      const newCode = `${firstName.toLowerCase()}-${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem("userReferralCode", newCode);
      setReferralCode(newCode);
    }

    // Simulate referral count
    const randomReferrals = Math.floor(Math.random() * 15);
    setReferralCount(randomReferrals);
  }, []);

  const copyToClipboard = () => {
    const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink).then(
      () => {
        setIsCopied(true);
        toast.success("Referral link copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy referral link");
      }
    );
  };

  const getBadgeStatus = () => {
    if (referralCount >= 25) return "Champion";
    if (referralCount >= 10) return "Connector";
    if (referralCount >= 3) return "Advocate";
    return "Newcomer";
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Your Referral Impact
        </h3>
        <Badge variant={referralCount >= 10 ? "default" : "outline"}>
          {getBadgeStatus()}
        </Badge>
      </div>

      <div className="grid gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>People Invited</Label>
            <span className="text-lg font-semibold">{referralCount}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-primary"
              style={{ width: `${Math.min((referralCount / 25) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>0</span>
            <span>3</span>
            <span>10</span>
            <span>25</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralLink">Your Personal Referral Code</Label>
          <div className="flex gap-2">
            <Input 
              id="referralLink" 
              value={referralCode} 
              readOnly 
              onClick={(e) => (e.target as HTMLInputElement).select()} 
            />
            <Button onClick={copyToClipboard} type="button" size="sm">
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Share this code with friends and family to earn referral badges
          </p>
        </div>
      </div>
      
      <div className="pt-2">
        <h4 className="text-sm font-medium mb-2">Referral Rewards</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>3 Referrals</span>
            <Badge variant={referralCount >= 3 ? "default" : "secondary"} className="text-xs">
              {referralCount >= 3 ? "Unlocked" : "Locked"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>10 Referrals</span>
            <Badge variant={referralCount >= 10 ? "default" : "secondary"} className="text-xs">
              {referralCount >= 10 ? "Unlocked" : "Locked"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>25 Referrals</span>
            <Badge variant={referralCount >= 25 ? "default" : "secondary"} className="text-xs">
              {referralCount >= 25 ? "Unlocked" : "Locked"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
