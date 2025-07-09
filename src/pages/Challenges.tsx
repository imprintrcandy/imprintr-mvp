
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { CHALLENGES } from "@/data/challenges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterChallenges = () => {
    let filtered = [...CHALLENGES];
    
    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter(challenge => challenge.status === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.title.toLowerCase().includes(query) || 
        challenge.description.toLowerCase().includes(query) ||
        challenge.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const handleJoinChallenge = (challengeId: string) => {
    toast.success("You've joined the challenge!");
    // In a real app, this would update the challenge status
  };

  const handleContinueChallenge = (challengeId: string) => {
    toast.info("Continuing with your challenge!");
    // In a real app, this would navigate to the challenge interface
  };

  const handleViewResults = (challengeId: string) => {
    toast.info("Viewing challenge results!");
    // In a real app, this would navigate to the results page
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Life <span className="text-gradient-warm">Challenges</span>
            </h1>
            <p className="text-muted-foreground">
              Join challenges • Earn badges • Build your legacy
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-gradient-memory text-white border-0 rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
            ✨ Create Challenge
          </Button>
        </div>
        
        <div className="bg-gradient-soft rounded-3xl p-8 mb-8 border border-blush/20">
          <div className="text-center">
            <h2 className="text-xl font-display font-semibold mb-2">🎯 Ready to leave your mark?</h2>
            <p className="text-muted-foreground">
              Complete challenges to unlock exclusive Digital Memory NFT Badges and grow your digital legacy
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-64">
              <Input
                placeholder="🔍 Search challenges..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-blush/30 focus:border-sunset"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full sm:w-auto bg-cream/50 rounded-2xl p-1">
                <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="not-started" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">Available</TabsTrigger>
                <TabsTrigger value="in-progress" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {['🔥 Trending', '✨ New', '🏃‍♀️ Solo', '👥 Group', '✈️ Travel', '🧘‍♀️ Self-Care', '🌍 Community', '🙏 Spiritual'].map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="rounded-full border-blush/30 hover:bg-blush/20 hover:border-blush text-xs px-4 py-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterChallenges().map(challenge => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              onJoin={handleJoinChallenge}
              onContinue={handleContinueChallenge}
              onView={handleViewResults}
            />
          ))}
          
          {filterChallenges().length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No challenges match your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
