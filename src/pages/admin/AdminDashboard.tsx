import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminRoute } from "@/components/security/AdminRoute";
import { useSecureAuth } from "@/hooks/useSecureAuth";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminChallenges from "@/components/admin/AdminChallenges";
import AdminSubmissions from "@/components/admin/AdminSubmissions";
import AdminBadges from "@/components/admin/AdminBadges";
import AdminFranchise from "@/components/admin/AdminFranchise";
import AdminImprints from "@/components/admin/AdminImprints";
import AdminSettings from "@/components/admin/AdminSettings";
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  FileCheck, 
  Award, 
  Globe, 
  MessageSquare, 
  Settings 
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-lavender-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-coral-600 to-peach-600 bg-clip-text text-transparent">
              Imprintr Super Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Control center for memory badge governance and franchise oversight
            </p>
          </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Submissions</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="franchise" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Franchise</span>
            </TabsTrigger>
            <TabsTrigger value="imprints" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Imprints</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="challenges">
            <AdminChallenges />
          </TabsContent>
          
          <TabsContent value="submissions">
            <AdminSubmissions />
          </TabsContent>
          
          <TabsContent value="badges">
            <AdminBadges />
          </TabsContent>
          
          <TabsContent value="franchise">
            <AdminFranchise />
          </TabsContent>
          
          <TabsContent value="imprints">
            <AdminImprints />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </AdminRoute>
  );
};

export default AdminDashboard;