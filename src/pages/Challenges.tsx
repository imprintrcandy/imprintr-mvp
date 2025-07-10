
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { LocationFilters } from "@/components/challenge/LocationFilters";
import { CHALLENGES } from "@/data/challenges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Map, Filter, Search } from "lucide-react";

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Location filter states
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState("");
  
  const filterChallenges = () => {
    let filtered = [...CHALLENGES];
    
    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter(challenge => challenge.status === activeTab);
    }
    
    // Filter by search query in title/description/category
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.title.toLowerCase().includes(query) || 
        challenge.description.toLowerCase().includes(query) ||
        challenge.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by region
    if (selectedRegion) {
      filtered = filtered.filter(challenge => challenge.location === selectedRegion);
    }
    
    // Filter by province (check if location includes the province name)
    if (selectedProvince) {
      filtered = filtered.filter(challenge => 
        challenge.location && challenge.location.toLowerCase().includes(selectedProvince.toLowerCase())
      );
    }
    
    // Filter by city search (check location and description)
    if (citySearch) {
      const cityQuery = citySearch.toLowerCase();
      filtered = filtered.filter(challenge => 
        (challenge.location && challenge.location.toLowerCase().includes(cityQuery)) ||
        challenge.description.toLowerCase().includes(cityQuery)
      );
    }
    
    return filtered;
  };

  const handleJoinChallenge = (challengeId: string) => {
    toast.success("You've joined the challenge!");
  };

  const handleContinueChallenge = (challengeId: string) => {
    toast.info("Continuing with your challenge!");
  };

  const handleViewResults = (challengeId: string) => {
    toast.info("Viewing challenge results!");
  };

  const handleClearLocationFilters = () => {
    setSelectedRegion(null);
    setSelectedProvince(null);
    setCitySearch("");
  };

  const filteredChallenges = filterChallenges();
  const hasLocationFilters = selectedRegion || selectedProvince || citySearch;

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

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="lg:col-span-1 space-y-6">
            <LocationFilters
              selectedRegion={selectedRegion}
              selectedProvince={selectedProvince}
              citySearch={citySearch}
              onRegionChange={setSelectedRegion}
              onProvinceChange={setSelectedProvince}
              onCitySearchChange={setCitySearch}
              onClearFilters={handleClearLocationFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Status Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {hasLocationFilters ? (
                  <>
                    Showing {filteredChallenges.length} challenges for{" "}
                    {[selectedRegion, selectedProvince, citySearch].filter(Boolean).join(" / ")}
                  </>
                ) : (
                  <>Showing {filteredChallenges.length} challenges across all regions</>
                )}
              </p>
              
              {hasLocationFilters && (
                <Button variant="outline" size="sm" onClick={handleClearLocationFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear Location Filters
                </Button>
              )}
            </div>
            
            {/* Challenge Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <div className="col-span-full text-center py-12">
                  <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No challenges found</h3>
                  <p className="text-muted-foreground mb-4">
                    {hasLocationFilters 
                      ? `No challenges match your location criteria.`
                      : "No challenges match your search criteria."
                    }
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                    handleClearLocationFilters();
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
