
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Activity {
  id: string;
  type: "new_imprint" | "challenge_completed" | "badge_earned" | "comment" | "like";
  actorName: string;
  actorImage?: string;
  content: string;
  target?: {
    type: "imprint" | "challenge" | "badge";
    title: string;
    id: string;
  };
  timestamp: string;
}

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    type: "new_imprint",
    actorName: "Jane Doe",
    actorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3",
    content: "created a new imprint",
    target: {
      type: "imprint",
      title: "Summer Vacation in Greece",
      id: "imprint-new-1"
    },
    timestamp: "2023-12-01T14:30:00"
  },
  {
    id: "act-2",
    type: "badge_earned",
    actorName: "Alex Johnson",
    actorImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3",
    content: "earned a new badge",
    target: {
      type: "badge",
      title: "World Traveler",
      id: "badge-3"
    },
    timestamp: "2023-12-01T10:15:00"
  },
  {
    id: "act-3",
    type: "challenge_completed",
    actorName: "Mark Wilson",
    actorImage: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-4.0.3",
    content: "completed the challenge",
    target: {
      type: "challenge",
      title: "30 Days of Gratitude",
      id: "challenge-1"
    },
    timestamp: "2023-11-30T16:45:00"
  },
  {
    id: "act-4",
    type: "comment",
    actorName: "Linda Chen",
    actorImage: "https://images.unsplash.com/photo-1594750852563-5ed8a1fd25eb?ixlib=rb-4.0.3",
    content: "commented on your imprint",
    target: {
      type: "imprint",
      title: "Dad's 60th Birthday",
      id: "imprint-3"
    },
    timestamp: "2023-11-29T09:20:00"
  },
  {
    id: "act-5",
    type: "like",
    actorName: "Sarah Miller",
    actorImage: "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-4.0.3",
    content: "liked your imprint",
    target: {
      type: "imprint",
      title: "First Marathon Completion",
      id: "imprint-4"
    },
    timestamp: "2023-11-29T08:05:00"
  }
];

export const ActivityFeed = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const filterActivities = () => {
    if (activeTab === "all") return SAMPLE_ACTIVITIES;
    return SAMPLE_ACTIVITIES.filter(activity => activity.type === activeTab);
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "new_imprint":
        return (
          <div className="bg-primary/20 text-primary p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        );
      case "badge_earned":
        return (
          <div className="bg-accent/20 text-accent p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7" />
              <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
            </svg>
          </div>
        );
      case "challenge_completed":
        return (
          <div className="bg-secondary/20 text-secondary p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
        );
      case "comment":
        return (
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        );
      case "like":
        return (
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new_imprint">Imprints</TabsTrigger>
          <TabsTrigger value="badge_earned">Badges</TabsTrigger>
          <TabsTrigger value="challenge_completed">Challenges</TabsTrigger>
          <TabsTrigger value="comment">Social</TabsTrigger>
        </TabsList>
        
        <CardContent className="p-4">
          <TabsContent value={activeTab} className="mt-0 space-y-4">
            {filterActivities().map((activity) => (
              <div key={activity.id} className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.actorImage} alt={activity.actorName} />
                  <AvatarFallback>{activity.actorName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p>
                      <span className="font-medium">{activity.actorName}</span>{" "}
                      <span className="text-muted-foreground">{activity.content}</span>{" "}
                      {activity.target && (
                        <span className="font-medium">"{activity.target.title}"</span>
                      )}
                    </p>
                    <Badge variant="outline" className="text-xs font-normal">
                      {formatTimestamp(activity.timestamp)}
                    </Badge>
                  </div>
                  
                  {activity.target && (
                    <Button variant="ghost" size="sm" className="mt-1 h-7 px-2 text-xs">
                      View {activity.target.type}
                    </Button>
                  )}
                </div>
                
                <div className="flex items-start">{getTypeIcon(activity.type)}</div>
              </div>
            ))}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
