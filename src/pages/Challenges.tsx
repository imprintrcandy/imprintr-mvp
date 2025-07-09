
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
          <h1 className="text-3xl font-display font-bold">Imprint Challenges</h1>
          <Button className="mt-4 sm:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create Challenge
          </Button>
        </div>
        
        <div className="mb-6">
          <p className="text-muted-foreground">
            Join imprint challenges to document specific types of memories, earn badges, and connect with others. 
            Complete challenges to unlock exclusive badges and grow your digital legacy.
          </p>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="not-started">Available</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
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
