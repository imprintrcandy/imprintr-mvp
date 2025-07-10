
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { CHALLENGES } from "@/data/challenges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { PhilippinesMap } from "@/components/map/PhilippinesMap";
import { RegionDropdown } from "@/components/map/RegionDropdown";
import { Map, Filter } from "lucide-react";

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  
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
    
    // Filter by region (mock implementation - in real app this would use challenge.location)
    if (selectedRegion) {
      // For demo purposes, randomly assign some challenges to regions
      const regionChallenges = {
        "NCR": ["challenge-1", "challenge-3"],
        "Central Visayas": ["challenge-2", "challenge-4"],
        "Davao Region": ["challenge-5", "challenge-6"]
      };
      
      const challengeIds = regionChallenges[selectedRegion as keyof typeof regionChallenges] || [];
      filtered = filtered.filter(challenge => challengeIds.includes(challenge.id));
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

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region || null);
  };

  const filteredChallenges = filterChallenges();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Imprint Challenges</h1>
            <p className="text-muted-foreground mt-2">
              Discover location-based challenges across the Philippines
            </p>
          </div>
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

        {/* Map and Region Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-imprint-600" />
                Explore by Region
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={showMap ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMap(true)}
                  className="hidden md:flex"
                >
                  <Map className="h-4 w-4 mr-2" />
                  Map View
                </Button>
                <Button
                  variant={!showMap ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMap(false)}
                  className="hidden md:flex"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  List View
                </Button>
              </div>
            </div>
            {selectedRegion && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Filtering by:</span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setSelectedRegion(null)}
                  className="h-6 px-2 text-xs"
                >
                  {selectedRegion} ✕
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {/* Desktop Map View */}
            <div className="hidden md:block">
              {showMap ? (
                <PhilippinesMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={handleRegionSelect}
                  className="max-w-lg mx-auto"
                />
              ) : (
                <RegionDropdown
                  selectedRegion={selectedRegion}
                  onRegionSelect={handleRegionSelect}
                  className="max-w-md mx-auto"
                />
              )}
            </div>
            
            {/* Mobile Dropdown */}
            <div className="md:hidden">
              <RegionDropdown
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
        
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
        
        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {selectedRegion ? (
              <>Showing {filteredChallenges.length} challenges in <strong>{selectedRegion}</strong></>
            ) : (
              <>Showing {filteredChallenges.length} challenges across all regions</>
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              onJoin={handleJoinChallenge}
              onContinue={handleContinueChallenge}
              onView={handleViewResults}
            />
          ))}
          
          {filteredChallenges.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No challenges found</h3>
              <p className="text-muted-foreground mb-4">
                {selectedRegion 
                  ? `No challenges match your criteria in ${selectedRegion}.`
                  : "No challenges match your criteria."
                }
              </p>
              {selectedRegion && (
                <Button variant="outline" onClick={() => setSelectedRegion(null)}>
                  View All Regions
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
