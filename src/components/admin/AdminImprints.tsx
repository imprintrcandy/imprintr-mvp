import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, Flag, Trash2, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Imprint {
  id: string;
  content: string;
  type: string;
  created_at: string;
  from_user: {
    name: string;
    email: string;
  } | null;
  to_user: {
    name: string;
    email: string;
  } | null;
}

const AdminImprints = () => {
  const [imprints, setImprints] = useState<Imprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchImprints();
  }, []);

  const fetchImprints = async () => {
    try {
      const { data, error } = await supabase
        .from("imprints")
        .select(`
          *,
          from_user:Users!imprints_from_user_id_fkey (
            name,
            email
          ),
          to_user:Users!imprints_to_user_id_fkey (
            name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImprints(data as any || []);
    } catch (error) {
      console.error("Error fetching imprints:", error);
      toast({ title: "Error", description: "Failed to fetch imprints", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteImprint = async (imprintId: string) => {
    try {
      const { error } = await supabase
        .from("imprints")
        .delete()
        .eq("id", imprintId);

      if (error) throw error;

      toast({ title: "Success", description: "Imprint deleted successfully" });
      fetchImprints();
    } catch (error) {
      console.error("Error deleting imprint:", error);
      toast({ title: "Error", description: "Failed to delete imprint", variant: "destructive" });
    }
  };

  const filteredImprints = imprints.filter(imprint => {
    const searchLower = searchTerm.toLowerCase();
    return (
      imprint.content.toLowerCase().includes(searchLower) ||
      imprint.from_user?.name?.toLowerCase().includes(searchLower) ||
      imprint.from_user?.email?.toLowerCase().includes(searchLower) ||
      imprint.to_user?.name?.toLowerCase().includes(searchLower) ||
      imprint.to_user?.email?.toLowerCase().includes(searchLower)
    );
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "testimonial": return <MessageSquare className="h-4 w-4" />;
      case "appreciation": return <Heart className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "testimonial": return "default";
      case "appreciation": return "secondary";
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-coral-200 bg-gradient-to-br from-coral-50 to-coral-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-coral-700">Total Imprints</p>
                <p className="text-2xl font-bold text-coral-800">{imprints.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-coral-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-mint-200 bg-gradient-to-br from-mint-50 to-mint-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-mint-700">This Month</p>
                <p className="text-2xl font-bold text-mint-800">
                  {imprints.filter(i => {
                    const createdDate = new Date(i.created_at);
                    const now = new Date();
                    return createdDate.getMonth() === now.getMonth() && 
                           createdDate.getFullYear() === now.getFullYear();
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
                <p className="text-sm font-medium text-lavender-700">Avg per User</p>
                <p className="text-2xl font-bold text-lavender-800">
                  {imprints.length > 0 ? 
                    Math.round(imprints.length / new Set([...imprints.map(i => i.from_user?.email), ...imprints.map(i => i.to_user?.email)]).size * 10) / 10 
                    : 0}
                </p>
              </div>
              <Heart className="h-8 w-8 text-lavender-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Imprints Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search imprints..."
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
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImprints.map((imprint) => (
                <TableRow key={imprint.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {imprint.from_user?.name?.charAt(0).toUpperCase() || 
                           imprint.from_user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{imprint.from_user?.name || "Anonymous"}</div>
                        <div className="text-muted-foreground">{imprint.from_user?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {imprint.to_user?.name?.charAt(0).toUpperCase() || 
                           imprint.to_user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{imprint.to_user?.name || "Anonymous"}</div>
                        <div className="text-muted-foreground">{imprint.to_user?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm truncate">{imprint.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(imprint.type)} className="flex items-center gap-1">
                      {getTypeIcon(imprint.type)}
                      {imprint.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(imprint.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteImprint(imprint.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredImprints.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {imprints.length === 0 ? "No imprints have been created yet." : "No imprints found matching your search."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminImprints;