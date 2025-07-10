
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vault, Lock, Clock, Star } from "lucide-react";

interface ProfileVaultProps {
  isOwnProfile: boolean;
}

export const ProfileVault = ({ isOwnProfile }: ProfileVaultProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Vault className="h-6 w-6 text-purple-500" />
          Legacy Vault
        </h2>
        {isOwnProfile && (
          <Button variant="outline" disabled>
            <Lock className="h-4 w-4 mr-2" />
            Coming Soon
          </Button>
        )}
      </div>

      <Card className="relative overflow-hidden">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 to-lavender-50/90 z-10 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-lavender-400 rounded-full flex items-center justify-center">
              <Vault className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Your encrypted memory capsule vault for storing and preserving your most precious memories for future generations.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Encrypted Storage</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Time Capsules</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>Legacy Sharing</span>
              </div>
            </div>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2 opacity-50">
            <Vault className="h-5 w-5 text-purple-500" />
            {isOwnProfile ? "Your Legacy Vault" : "Legacy Vault"}
          </CardTitle>
        </CardHeader>
        <CardContent className="opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-lavender-50 p-4 rounded-lg text-center">
              <Lock className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <h4 className="font-medium text-sm mb-1">Encrypted Storage</h4>
              <p className="text-xs text-gray-500">Your memories, securely stored</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-lavender-50 p-4 rounded-lg text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <h4 className="font-medium text-sm mb-1">Time Capsules</h4>
              <p className="text-xs text-gray-500">Release memories in the future</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-lavender-50 p-4 rounded-lg text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <h4 className="font-medium text-sm mb-1">Legacy Sharing</h4>
              <p className="text-xs text-gray-500">Share with future generations</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              {isOwnProfile 
                ? "Store your most precious memories in an encrypted vault that can be shared with loved ones or released at specific times in the future."
                : "The Legacy Vault allows users to store encrypted memories for future sharing."
              }
            </p>
            <p className="text-xs text-gray-500">
              Expected launch: Q2 2025
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feature Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="text-lg">Planned Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Scheduled release dates</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Beneficiary management</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Multi-media support</span>
            </div>
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="text-lg">Early Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Be the first to try Legacy Vault when it launches.
            </p>
            <Button variant="outline" disabled className="w-full">
              Join Waitlist
            </Button>
            <p className="text-xs text-gray-500">
              Premium feature - included in Pro plan
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
