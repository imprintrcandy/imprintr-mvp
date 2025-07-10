import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, Calendar, User, Trophy } from "lucide-react";

interface BadgeEntry {
  id: string;
  title: string;
  description: string | null;
  story: string | null;
  nft_token_id: string | null;
  nft_transaction_hash: string | null;
  earned_at: string;
  user: {
    name: string;
    email: string;
  } | null;
  challenge: {
    title: string;
    category: string;
  } | null;
}

const AdminBadges = () => {
  const [badges, setBadges] = useState<BadgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const { data, error } = await supabase
        .from("badges")
        .select(`
          *,
          user:user_id (
            name,
            email
          ),
          challenge:challenge_id (
            title,
            category
          )
        `)
        .order("earned_at", { ascending: false });

      if (error) throw error;
      setBadges(data || []);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBadges = badges.filter(badge => {
    const searchLower = searchTerm.toLowerCase();
    return (
      badge.title.toLowerCase().includes(searchLower) ||
      badge.user?.name?.toLowerCase().includes(searchLower) ||
      badge.user?.email?.toLowerCase().includes(searchLower) ||
      badge.challenge?.title?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin w-8 h-8 border-4 border-coral-300 border-t-coral-600 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-coral-200 bg-gradient-to-br from-coral-50 to-coral-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-coral-700">Total Badges</p>
                <p className="text-2xl font-bold text-coral-800">{badges.length}</p>
              </div>
              <Award className="h-8 w-8 text-coral-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-mint-200 bg-gradient-to-br from-mint-50 to-mint-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-mint-700">This Month</p>
                <p className="text-2xl font-bold text-mint-800">
                  {badges.filter(b => {
                    const earnedDate = new Date(b.earned_at);
                    const now = new Date();
                    return earnedDate.getMonth() === now.getMonth() && 
                           earnedDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-mint-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-lavender-200 bg-gradient-to-br from-lavender-50 to-lavender-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-lavender-700">Unique Users</p>
                <p className="text-2xl font-bold text-lavender-800">
                  {new Set(badges.map(b => b.user?.email)).size}
                </p>
              </div>
              <User className="h-8 w-8 text-lavender-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-peach-200 bg-gradient-to-br from-peach-50 to-peach-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-peach-700">Categories</p>
                <p className="text-2xl font-bold text-peach-800">
                  {new Set(badges.map(b => b.challenge?.category)).size}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-peach-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Badge Activity Log</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search badges, users, or challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Badge</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Earned Date</TableHead>
                <TableHead>NFT Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBadges.map((badge) => (
                <TableRow key={badge.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{badge.title}</div>
                        {badge.story && (
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {badge.story}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {badge.user?.name?.charAt(0).toUpperCase() || 
                           badge.user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{badge.user?.name || "Anonymous"}</div>
                        <div className="text-muted-foreground">{badge.user?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{badge.challenge?.title || "Unknown Challenge"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {badge.challenge?.category || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(badge.earned_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badge.nft_token_id ? "default" : "secondary"}>
                      {badge.nft_token_id ? "Minted" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredBadges.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {badges.length === 0 ? "No badges have been earned yet." : "No badges found matching your search."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBadges;