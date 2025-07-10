
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Plus, Calendar, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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

interface ProfileImprintsProps {
  userId: string;
  isOwnProfile: boolean;
}

export const ProfileImprints = ({ userId, isOwnProfile }: ProfileImprintsProps) => {
  const [imprintsMade, setImprintsMade] = useState<Imprint[]>([]);
  const [imprintsReceived, setImprintsReceived] = useState<Imprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImprints();
  }, [userId]);

  const fetchImprints = async () => {
    try {
      const [madeResponse, receivedResponse] = await Promise.all([
        supabase
          .from("imprints")
          .select(`
            *,
            to_user:Users!imprints_to_user_id_fkey (
              name,
              email
            )
          `)
          .eq("from_user_id", userId)
          .order("created_at", { ascending: false }),
        
        supabase
          .from("imprints")
          .select(`
            *,
            from_user:Users!imprints_from_user_id_fkey (
              name,
              email
            )
          `)
          .eq("to_user_id", userId)
          .order("created_at", { ascending: false })
      ]);

      if (madeResponse.data) {
        setImprintsMade(madeResponse.data as any);
      }

      if (receivedResponse.data) {
        setImprintsReceived(receivedResponse.data as any);
      }
    } catch (error) {
      console.error("Error fetching imprints:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const ImprintCard = ({ imprint, type }: { imprint: Imprint; type: "made" | "received" }) => {
    const otherUser = type === "made" ? imprint.to_user : imprint.from_user;
    
    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-coral-400 to-peach-400 text-white">
                {otherUser?.name?.charAt(0).toUpperCase() || otherUser?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">
                  {otherUser?.name || "Anonymous"}
                </span>
                <span className="text-sm text-gray-500">
                  {type === "made" ? "received your imprint" : "left you an imprint"}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                  <Calendar className="h-3 w-3" />
                  {formatDate(imprint.created_at)}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-mint-50 to-lavender-50 p-3 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{imprint.content}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {imprint.type === "testimonial" ? (
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                ) : (
                  <Heart className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-gray-600 capitalize">{imprint.type}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ type }: { type: "made" | "received" }) => (
    <div className="text-center py-8 space-y-4">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-mint-400 to-lavender-400 rounded-full flex items-center justify-center">
        {type === "made" ? (
          <Send className="h-8 w-8 text-white" />
        ) : (
          <Heart className="h-8 w-8 text-white" />
        )}
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-1">
          {type === "made" ? 
            (isOwnProfile ? "No imprints made yet" : "No imprints made") :
            (isOwnProfile ? "No imprints received yet" : "No imprints received")
          }
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {type === "made" 
            ? (isOwnProfile ? "Start leaving meaningful imprints for others!" : "This user hasn't made any imprints yet")
            : (isOwnProfile ? "Imprints from others will appear here" : "This user hasn't received any imprints yet")
          }
        </p>
        {type === "made" && isOwnProfile && (
          <Link to="/new-imprint">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Write Imprint
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-coral-500" />
            Imprints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-coral-500" />
          Imprints
        </h2>
        {isOwnProfile && (
          <Link to="/new-imprint">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Write Imprint
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="received" className="w-full">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="received" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {isOwnProfile ? "That Moved Me" : "Received"} ({imprintsReceived.length})
              </TabsTrigger>
              <TabsTrigger value="made" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {isOwnProfile ? "I've Made" : "Made"} ({imprintsMade.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="received" className="p-4 pt-4">
              {imprintsReceived.length > 0 ? (
                <div className="space-y-3">
                  {imprintsReceived.map((imprint) => (
                    <ImprintCard key={imprint.id} imprint={imprint} type="received" />
                  ))}
                </div>
              ) : (
                <EmptyState type="received" />
              )}
            </TabsContent>
            
            <TabsContent value="made" className="p-4 pt-4">
              {imprintsMade.length > 0 ? (
                <div className="space-y-3">
                  {imprintsMade.map((imprint) => (
                    <ImprintCard key={imprint.id} imprint={imprint} type="made" />
                  ))}
                </div>
              ) : (
                <EmptyState type="made" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
