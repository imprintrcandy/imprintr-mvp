
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Import Lucide icons
import { TrendingUp, Users, Clock, Filter } from "lucide-react";
import { SAMPLE_IMPRINTS } from "@/data/memories";
import { CHALLENGES } from "@/data/challenges";

// Custom type for our Imprint display format
interface DiscoverImprint {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  impressions: number;
  type: "personal" | "brand" | "audio";
  author?: string;
  brandName?: string;
}

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "personal" | "brand" | "audio">("all");

  // Convert sample imprints to discover format
  const trendingImprints: DiscoverImprint[] = SAMPLE_IMPRINTS.map((imprint, index) => ({
    id: imprint.id,
    title: imprint.title,
    description: imprint.description,
    imageUrl: imprint.imageUrl,
    date: imprint.date,
    impressions: Math.floor(Math.random() * 120) + 5, // Random number for demo
    type: index % 3 === 0 ? "brand" : index % 5 === 0 ? "audio" : "personal",
    author: imprint.relationships?.[0]?.split(" of ")[1] || "Anonymous User",
  })).sort((a, b) => b.impressions - a.impressions); // Sort by impressions

  // Filter imprints based on active filter
  const filteredImprints = activeFilter === "all"
    ? trendingImprints
    : trendingImprints.filter(imprint => imprint.type === activeFilter);

  // Get recent imprints sorted by date
  const recentImprints = [...trendingImprints].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Handle imprint reaction
  const handleImprint = (id: string) => {
    // In real app, this would call an API to record the impression
    console.log(`Imprinted on memory: ${id}`);
  };

  // Handle challenge join
  const handleJoinChallenge = (id: string) => {
    // In real app, this would navigate to challenge details or registration
    console.log(`Joined challenge: ${id}`);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-imprint-100/80 via-warmth-50/50 to-memory-100/80 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
            Discover Imprints That Moved Others
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-muted-foreground">
            Explore real stories, trending challenges, and brand memories that left
            a mark on people's hearts.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content Area */}
            <div className="w-full md:w-3/4">
              {/* Trending Imprints Section with Filters */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-imprint-600" />
                    <h2 className="text-2xl font-display font-semibold">Trending Imprints</h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="text-muted-foreground h-4 w-4" />
                    <Tabs defaultValue="all" className="w-[400px]">
                      <TabsList>
                        <TabsTrigger 
                          value="all" 
                          onClick={() => setActiveFilter("all")}
                          className={activeFilter === "all" ? "bg-primary text-primary-foreground" : ""}
                        >
                          All
                        </TabsTrigger>
                        <TabsTrigger 
                          value="personal" 
                          onClick={() => setActiveFilter("personal")}
                          className={activeFilter === "personal" ? "bg-primary text-primary-foreground" : ""}
                        >
                          Personal Stories
                        </TabsTrigger>
                        <TabsTrigger 
                          value="brand" 
                          onClick={() => setActiveFilter("brand")}
                          className={activeFilter === "brand" ? "bg-primary text-primary-foreground" : ""}
                        >
                          Brand Challenges
                        </TabsTrigger>
                        <TabsTrigger 
                          value="audio" 
                          onClick={() => setActiveFilter("audio")}
                          className={activeFilter === "audio" ? "bg-primary text-primary-foreground" : ""}
                        >
                          Audio Memories
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredImprints.slice(0, 6).map((imprint) => (
                    <Card key={imprint.id} className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={imprint.imageUrl}
                          alt={imprint.title}
                          className="w-full h-full object-cover"
                        />
                        {imprint.type === "audio" && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12"></path><path d="M6 12h12"></path></svg>
                          </div>
                        )}
                        <Badge className="absolute top-2 right-2" variant={imprint.type === "personal" ? "outline" : "default"}>
                          {imprint.type === "personal" ? "Personal Story" : imprint.type === "brand" ? "Brand Challenge" : "Audio Memory"}
                        </Badge>
                      </div>
                      <CardContent className="py-4 flex-1">
                        <h3 className="text-lg font-semibold mb-2">{imprint.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{imprint.description}</p>
                        
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{imprint.author}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-4 flex justify-between items-center border-t border-muted/40 pt-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{new Date(imprint.date).toLocaleDateString()}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleImprint(imprint.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                          </svg>
                          <span className="ml-1">{imprint.impressions}</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Top Brand Challenges */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-memory-600">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <h2 className="text-2xl font-display font-semibold">Top Brand Challenges</h2>
                </div>

                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex space-x-4">
                    {CHALLENGES.map((challenge) => (
                      <Card key={challenge.id} className="w-[300px] flex-shrink-0">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                              <span className="text-xl font-bold">{challenge.title.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{challenge.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                {challenge.participants} participants
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {challenge.description}
                          </p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Challenge Goal</span>
                              <span>{challenge.progress}/{challenge.target} {challenge.category}</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-memory-500 rounded-full" 
                                style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={() => handleJoinChallenge(challenge.id)}
                          >
                            Join Challenge
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <path d="m9 18 6-6-6-6"/>
                            </svg>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Recently Added Imprints */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="text-warmth-600" />
                  <h2 className="text-2xl font-display font-semibold">Recently Added Imprints</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentImprints.slice(0, 4).map((imprint) => (
                    <Card key={imprint.id} className="overflow-hidden flex">
                      <div className="w-1/3">
                        <img
                          src={imprint.imageUrl}
                          alt={imprint.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="font-semibold mb-1">{imprint.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(imprint.date).toLocaleDateString()} • {imprint.author}
                        </p>
                        <p className="text-sm line-clamp-2 mb-3">{imprint.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{imprint.type}</Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleImprint(imprint.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                            </svg>
                            <span className="ml-1">{imprint.impressions}</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Only on desktop */}
            <div className="hidden md:block w-full md:w-1/4">
              <div className="sticky top-20">
                {/* Top Contributors */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-display font-semibold text-lg mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-imprint-600" />
                      Top Contributors
                    </h3>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted">
                            {/* Placeholder for user avatar */}
                          </div>
                          <div>
                            <p className="text-sm font-medium">User Name {i}</p>
                            <p className="text-xs text-muted-foreground">
                              {Math.floor(Math.random() * 50) + 10} imprints
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-display font-semibold text-lg mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-memory-600" />
                      Impact Leaderboard
                    </h3>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-6 text-center font-medium text-muted-foreground">#{i}</div>
                          <div className={cn(
                            "ml-2 flex-1 h-8 rounded-md flex items-center px-2",
                            i === 1 ? "bg-accent/50" : "bg-muted"
                          )}>
                            <span className="text-sm truncate">
                              {["Travel Memories", "Childhood Stories", "Family Recipes", "Artistic Journeys", "Legacy Letters"][i-1]}
                            </span>
                          </div>
                          <div className="ml-2 text-sm font-medium">
                            {(6 - i) * 125}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Discover;
