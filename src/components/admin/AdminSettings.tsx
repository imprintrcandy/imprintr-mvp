import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Upload, Palette, Mail, Shield, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    brandSlogan: "Memories Worth Minting",
    campaignHashtag: "#ImprintrMemories",
    defaultChallengeColor: "#FF6B6B",
    supportEmail: "support@imprintr.com",
    termsUrl: "https://imprintr.com/terms",
    privacyUrl: "https://imprintr.com/privacy",
  });

  const [emailTemplates, setEmailTemplates] = useState({
    challengeApproved: `Hi {{user_name}},

Congratulations! Your challenge "{{challenge_title}}" has been approved and is now live on Imprintr.

Start sharing it with your friends and watch as memories are created!

Best regards,
The Imprintr Team`,
    badgeEarned: `Hi {{user_name}},

🎉 You've earned a new memory badge!

Badge: {{badge_title}}
Challenge: {{challenge_title}}
Earned on: {{earned_date}}

Your memory has been minted and is now part of your Digital Memory Passport. View it at: {{passport_url}}

Keep creating memories!
The Imprintr Team`,
    challengeReminder: `Hi {{user_name}},

Don't forget about the challenge you joined: "{{challenge_title}}"

You still have time to complete it and earn your memory badge. Every moment matters!

Complete your challenge: {{challenge_url}}

Happy memory making!
The Imprintr Team`
  });

  const handleSaveSettings = () => {
    // In a real app, this would save to database
    toast({ title: "Success", description: "Settings saved successfully" });
  };

  const handleSaveEmailTemplates = () => {
    // In a real app, this would save to database
    toast({ title: "Success", description: "Email templates saved successfully" });
  };

  const handleUploadLogo = () => {
    // In a real app, this would handle file upload
    toast({ title: "Info", description: "Logo upload functionality coming soon" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="brand-slogan">Brand Slogan</Label>
                <Input
                  id="brand-slogan"
                  value={settings.brandSlogan}
                  onChange={(e) => setSettings(prev => ({ ...prev, brandSlogan: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="campaign-hashtag">Campaign Hashtag</Label>
                <Input
                  id="campaign-hashtag"
                  value={settings.campaignHashtag}
                  onChange={(e) => setSettings(prev => ({ ...prev, campaignHashtag: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="default-color">Default Challenge Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="default-color"
                    type="color"
                    value={settings.defaultChallengeColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultChallengeColor: e.target.value }))}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.defaultChallengeColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultChallengeColor: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="terms-url">Terms of Service URL</Label>
                <Input
                  id="terms-url"
                  type="url"
                  value={settings.termsUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, termsUrl: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="privacy-url">Privacy Policy URL</Label>
                <Input
                  id="privacy-url"
                  type="url"
                  value={settings.privacyUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, privacyUrl: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label>Logo & Branding</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-16 h-16 bg-gradient-to-br from-coral-400 to-peach-400 rounded-lg flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <Button onClick={handleUploadLogo} variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload New Logo
              </Button>
            </div>
          </div>

          <Button onClick={handleSaveSettings} className="w-full md:w-auto">
            Save General Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Templates
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize automated emails sent to users. Use variables like {{user_name}}, {{challenge_title}}, etc.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="challenge-approved">Challenge Approved Email</Label>
                <Badge variant="outline">Sent when admin approves a challenge</Badge>
              </div>
              <Textarea
                id="challenge-approved"
                value={emailTemplates.challengeApproved}
                onChange={(e) => setEmailTemplates(prev => ({ ...prev, challengeApproved: e.target.value }))}
                rows={6}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="badge-earned">Badge Earned Email</Label>
                <Badge variant="outline">Sent when user earns a badge</Badge>
              </div>
              <Textarea
                id="badge-earned"
                value={emailTemplates.badgeEarned}
                onChange={(e) => setEmailTemplates(prev => ({ ...prev, badgeEarned: e.target.value }))}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="challenge-reminder">Challenge Reminder Email</Label>
                <Badge variant="outline">Sent to remind users about active challenges</Badge>
              </div>
              <Textarea
                id="challenge-reminder"
                value={emailTemplates.challengeReminder}
                onChange={(e) => setEmailTemplates(prev => ({ ...prev, challengeReminder: e.target.value }))}
                rows={7}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Available Variables:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
              <code>{"{{user_name}}"}</code>
              <code>{"{{challenge_title}}"}</code>
              <code>{"{{badge_title}}"}</code>
              <code>{"{{earned_date}}"}</code>
              <code>{"{{challenge_url}}"}</code>
              <code>{"{{passport_url}}"}</code>
            </div>
          </div>

          <Button onClick={handleSaveEmailTemplates} className="w-full md:w-auto">
            Save Email Templates
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-coral-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-coral-600">1</div>
                <div className="text-sm text-muted-foreground">Super Admins</div>
              </CardContent>
            </Card>
            
            <Card className="border-mint-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-mint-600">0</div>
                <div className="text-sm text-muted-foreground">Franchise Admins</div>
              </CardContent>
            </Card>
            
            <Card className="border-lavender-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-lavender-600">0</div>
                <div className="text-sm text-muted-foreground">Moderators</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Manage Admin Roles</Button>
            <Button variant="outline">View Access Logs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;