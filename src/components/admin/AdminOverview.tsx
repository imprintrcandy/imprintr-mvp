import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Award, FileCheck, Plus, Eye, UserPlus } from "lucide-react";

interface OverviewStats {
  totalUsers: number;
  totalChallenges: number;
  totalBadges: number;
  pendingSubmissions: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<OverviewStats>({
    totalUsers: 0,
    totalChallenges: 0,
    totalBadges: 0,
    pendingSubmissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, challengesRes, badgesRes, submissionsRes] = await Promise.all([
          supabase.from("Users").select("id", { count: "exact" }),
          supabase.from("challenges").select("id", { count: "exact" }),
          supabase.from("badges").select("id", { count: "exact" }),
          supabase.from("proof_submissions").select("id", { count: "exact" }).eq("status", "pending")
        ]);

        setStats({
          totalUsers: usersRes.count || 0,
          totalChallenges: challengesRes.count || 0,
          totalBadges: badgesRes.count || 0,
          pendingSubmissions: submissionsRes.count || 0
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-20 bg-gray-200 rounded-t-lg"></CardHeader>
            <CardContent className="h-16 bg-gray-100"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-coral-200 bg-gradient-to-br from-coral-50 to-coral-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-coral-700">Total Users</CardTitle>
            <Users className="h-4 w-4 text-coral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-coral-800">{stats.totalUsers}</div>
            <p className="text-xs text-coral-600">Registered memory makers</p>
          </CardContent>
        </Card>

        <Card className="border-mint-200 bg-gradient-to-br from-mint-50 to-mint-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mint-700">Total Challenges</CardTitle>
            <Trophy className="h-4 w-4 text-mint-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mint-800">{stats.totalChallenges}</div>
            <p className="text-xs text-mint-600">Life experiences available</p>
          </CardContent>
        </Card>

        <Card className="border-lavender-200 bg-gradient-to-br from-lavender-50 to-lavender-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-lavender-700">Total Badges</CardTitle>
            <Award className="h-4 w-4 text-lavender-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-lavender-800">{stats.totalBadges}</div>
            <p className="text-xs text-lavender-600">Memories minted</p>
          </CardContent>
        </Card>

        <Card className="border-peach-200 bg-gradient-to-br from-peach-50 to-peach-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-peach-700">Pending Submissions</CardTitle>
            <FileCheck className="h-4 w-4 text-peach-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-peach-800">{stats.pendingSubmissions}</div>
            <p className="text-xs text-peach-600">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create Challenge
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Review Submissions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Franchise Admin
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">New user registered</span>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Challenge completed</span>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Badge minted</span>
                <span className="text-xs text-muted-foreground">10 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Proof submitted</span>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;