import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Globe, Users, Trophy, Award, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FranchiseRegion {
  id: string;
  name: string;
  code: string;
  subdomain: string;
  admin_id: string | null;
  created_at: string;
  admin: {
    name: string;
    email: string;
  } | null;
  stats?: {
    users: number;
    challenges: number;
    badges: number;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminFranchise = () => {
  const [regions, setRegions] = useState<FranchiseRegion[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [newRegion, setNewRegion] = useState({
    name: "",
    code: "",
    subdomain: "",
    admin_id: ""
  });

  useEffect(() => {
    fetchRegions();
    fetchUsers();
  }, []);

  const fetchRegions = async () => {
    try {
      const { data, error } = await supabase
        .from("franchise_regions")
        .select(`
          *,
          admin:admin_id (
            name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch stats for each region
      const regionsWithStats = await Promise.all(
        (data || []).map(async (region) => {
          const [usersRes, challengesRes, badgesRes] = await Promise.all([
            supabase.from("Users").select("id", { count: "exact" }),
            supabase.from("challenges").select("id", { count: "exact" }).eq("region", region.code),
            supabase.from("badges").select("id", { count: "exact" })
          ]);

          return {
            ...region,
            stats: {
              users: usersRes.count || 0,
              challenges: challengesRes.count || 0,
              badges: badgesRes.count || 0
            }
          };
        })
      );

      setRegions(regionsWithStats);
    } catch (error) {
      console.error("Error fetching regions:", error);
      toast({ title: "Error", description: "Failed to fetch franchise regions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("id, name, email, role")
        .in("role", ["franchise_admin", "moderator", "user"]);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddRegion = async () => {
    if (!newRegion.name || !newRegion.code || !newRegion.subdomain) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    try {
      const { error } = await supabase
        .from("franchise_regions")
        .insert({
          name: newRegion.name,
          code: newRegion.code,
          subdomain: newRegion.subdomain,
          admin_id: newRegion.admin_id || null
        });

      if (error) throw error;

      toast({ title: "Success", description: "Franchise region added successfully" });
      setIsAddingRegion(false);
      setNewRegion({ name: "", code: "", subdomain: "", admin_id: "" });
      fetchRegions();
    } catch (error) {
      console.error("Error adding region:", error);
      toast({ title: "Error", description: "Failed to add franchise region", variant: "destructive" });
    }
  };

  const updateRegionAdmin = async (regionId: string, adminId: string) => {
    try {
      const { error } = await supabase
        .from("franchise_regions")
        .update({ admin_id: adminId || null })
        .eq("id", regionId);

      if (error) throw error;

      toast({ title: "Success", description: "Region admin updated successfully" });
      fetchRegions();
    } catch (error) {
      console.error("Error updating region admin:", error);
      toast({ title: "Error", description: "Failed to update region admin", variant: "destructive" });
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Franchise Management</CardTitle>
              <p className="text-muted-foreground">Manage regional operations and franchise admins</p>
            </div>
            <Dialog open={isAddingRegion} onOpenChange={setIsAddingRegion}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Region
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Franchise Region</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="region-name">Region Name</Label>
                    <Input
                      id="region-name"
                      placeholder="e.g., Philippines"
                      value={newRegion.name}
                      onChange={(e) => setNewRegion(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="region-code">Region Code</Label>
                    <Input
                      id="region-code"
                      placeholder="e.g., ph"
                      value={newRegion.code}
                      onChange={(e) => setNewRegion(prev => ({ ...prev, code: e.target.value.toLowerCase() }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <Input
                      id="subdomain"
                      placeholder="e.g., ph.imprintr.com"
                      value={newRegion.subdomain}
                      onChange={(e) => setNewRegion(prev => ({ ...prev, subdomain: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin">Franchise Admin (Optional)</Label>
                    <Select value={newRegion.admin_id} onValueChange={(value) => setNewRegion(prev => ({ ...prev, admin_id: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an admin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No admin assigned</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name || user.email} ({user.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddRegion} className="flex-1">
                      Add Region
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingRegion(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Subdomain</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regions.map((region) => (
                <TableRow key={region.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center">
                        <Globe className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <Badge variant="outline" className="mt-1">{region.code}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={`https://${region.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {region.subdomain}
                    </a>
                  </TableCell>
                  <TableCell>
                    {region.admin ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {region.admin.name?.charAt(0).toUpperCase() || 
                             region.admin.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{region.admin.name}</div>
                          <div className="text-muted-foreground">{region.admin.email}</div>
                        </div>
                      </div>
                    ) : (
                      <Badge variant="secondary">No admin assigned</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{region.stats?.users || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>{region.stats?.challenges || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>{region.stats?.badges || 0}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(region.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        value={region.admin_id || ""}
                        onValueChange={(adminId) => updateRegionAdmin(region.id, adminId)}
                      >
                        <SelectTrigger className="w-32">
                          <Edit className="h-4 w-4 mr-1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No admin</SelectItem>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name || user.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {regions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No franchise regions found. Add your first region to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFranchise;