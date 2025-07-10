import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Archive, Star, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  region: string;
  status: string;
  participants_count: number;
  featured: boolean;
  created_at: string;
  creator: {
    name: string;
    email: string;
  } | null;
}

const AdminChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from("challenges")
        .select(`
          *,
          creator:creator_id (
            name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      toast({ title: "Error", description: "Failed to fetch challenges", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (challengeId: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from("challenges")
        .update({ featured: !currentFeatured })
        .eq("id", challengeId);

      if (error) throw error;
      
      toast({ 
        title: "Success", 
        description: `Challenge ${!currentFeatured ? 'featured' : 'unfeatured'} successfully` 
      });
      fetchChallenges();
    } catch (error) {
      console.error("Error updating challenge:", error);
      toast({ title: "Error", description: "Failed to update challenge", variant: "destructive" });
    }
  };

  const updateChallengeStatus = async (challengeId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("challenges")
        .update({ status: newStatus })
        .eq("id", challengeId);

      if (error) throw error;
      
      toast({ title: "Success", description: "Challenge status updated successfully" });
      fetchChallenges();
    } catch (error) {
      console.error("Error updating challenge status:", error);
      toast({ title: "Error", description: "Failed to update challenge status", variant: "destructive" });
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || challenge.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || challenge.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "default";
      case "medium": return "secondary";
      case "epic": return "destructive";
      default: return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "outline";
    }
  };

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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Challenge Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Personal Growth">Personal Growth</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Relationships">Relationships</SelectItem>
                <SelectItem value="Impact">Impact</SelectItem>
                <SelectItem value="Faith">Faith</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Creativity">Creativity</SelectItem>
                <SelectItem value="Milestones">Milestones</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Challenge</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{challenge.title}</span>
                        {challenge.featured && <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />}
                      </div>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {challenge.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{challenge.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getDifficultyBadgeVariant(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{challenge.creator?.name || "Anonymous"}</div>
                      <div className="text-muted-foreground">{challenge.creator?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={challenge.status}
                      onValueChange={(newStatus) => updateChallengeStatus(challenge.id, newStatus)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.participants_count}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleFeatured(challenge.id, challenge.featured)}
                        className={challenge.featured ? "text-yellow-600" : ""}
                      >
                        <Star className="h-4 w-4" fill={challenge.featured ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredChallenges.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No challenges found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminChallenges;