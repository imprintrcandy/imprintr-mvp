
import { useEffect, useState } from "react";
import BrandLayout from "@/components/layout/BrandLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Award, Users, MapPin, QrCode, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface BrandStats {
  totalVisits: number;
  totalChallenges: number;
  badgesAwarded: number;
  verificationStatus: "pending" | "approved" | "rejected" | "none";
}

const BrandDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<BrandStats>({
    totalVisits: 0,
    totalChallenges: 0,
    badgesAwarded: 0,
    verificationStatus: "none",
  });
  const [brandProfile, setBrandProfile] = useState<any>(null);

  useEffect(() => {
    const fetchBrandProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch brand profile
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('*')
          .eq('owner_id', user.id)
          .single();
          
        if (brandError) throw brandError;
        
        if (brandData) {
          setBrandProfile(brandData);
          
          // Get brand stats
          const [visitsResponse, challengesResponse, verificationsResponse] = await Promise.all([
            supabase.from('brand_visits').select('*', { count: 'exact' }).eq('brand_id', brandData.id),
            supabase.from('brand_challenges').select('*', { count: 'exact' }).eq('brand_id', brandData.id),
            supabase.from('brand_verifications').select('*').eq('brand_id', brandData.id).order('submitted_at', { ascending: false }).limit(1)
          ]);
          
          // Count badges awarded
          const { count: badgesCount } = await supabase
            .from('brand_visits')
            .select('*', { count: 'exact' })
            .eq('brand_id', brandData.id)
            .eq('badge_unlocked', true);
            
          setStats({
            totalVisits: visitsResponse.count || 0,
            totalChallenges: challengesResponse.count || 0,
            badgesAwarded: badgesCount || 0,
            verificationStatus: verificationsResponse.data?.length 
              ? verificationsResponse.data[0].status as any 
              : "none",
          });
        }
      } catch (error) {
        console.error('Error fetching brand profile:', error);
        toast.error("Failed to load brand dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrandProfile();
  }, [user]);

  if (loading) {
    return (
      <BrandLayout>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </BrandLayout>
    );
  }

  return (
    <BrandLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {brandProfile?.name || "Brand"} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your brand's engagement.
            </p>
          </div>
          <div className="flex gap-2">
            {stats.verificationStatus !== "approved" && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/brand/verification">
                  {stats.verificationStatus === "none" 
                    ? "Get Verified" 
                    : stats.verificationStatus === "pending" 
                      ? "Verification Pending" 
                      : "Verification Rejected"}
                </Link>
              </Button>
            )}
            <Button size="sm" asChild>
              <Link to="/brand/challenges">Create a Challenge</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
              <p className="text-xs text-muted-foreground">Unique visitors to your location</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalChallenges}</div>
              <p className="text-xs text-muted-foreground">Challenges created for visitors</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Awarded</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.badgesAwarded}</div>
              <p className="text-xs text-muted-foreground">Digital badges earned by visitors</p>
            </CardContent>
          </Card>
          
          <Card className={`${stats.verificationStatus === 'approved' ? 'border-green-500' : 'border-amber-500'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
              <ShieldCheck className={`h-4 w-4 ${stats.verificationStatus === 'approved' ? 'text-green-500' : 'text-amber-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {stats.verificationStatus === "none" ? "Unverified" : stats.verificationStatus}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.verificationStatus === "approved" 
                  ? "Your brand is verified" 
                  : stats.verificationStatus === "pending"
                  ? "Verification in progress"
                  : "Complete verification to get the badge"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-24 flex-col justify-center" asChild>
                  <Link to="/brand/profile">
                    <MapPin className="mb-2 h-5 w-5" />
                    <span className="text-sm">Update Profile</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col justify-center" asChild>
                  <Link to="/brand/challenges">
                    <Award className="mb-2 h-5 w-5" />
                    <span className="text-sm">Create Challenge</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col justify-center" asChild>
                  <Link to="/brand/visitors">
                    <QrCode className="mb-2 h-5 w-5" />
                    <span className="text-sm">Generate QR Code</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!stats.totalChallenges ? (
                  <p className="text-sm text-muted-foreground">
                    No upcoming challenge deadlines. 
                    <Link to="/brand/challenges" className="text-primary ml-1">
                      Create one?
                    </Link>
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Challenge Dashboard</p>
                      <p className="text-xs text-muted-foreground">
                        View all {stats.totalChallenges} challenges
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link to="/brand/challenges">View all challenges</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </BrandLayout>
  );
};

export default BrandDashboard;
