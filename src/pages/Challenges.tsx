
import { MainLayout } from "@/components/layout/MainLayout";
import { LocationFilters } from "@/components/challenge/LocationFilters";
import { ChallengePageHeader } from "@/components/challenge/ChallengePageHeader";
import { ChallengeSearchFilters } from "@/components/challenge/ChallengeSearchFilters";
import { ChallengeGrid } from "@/components/challenge/ChallengeGrid";
import { toast } from "@/components/ui/sonner";
import { useChallengeFilters } from "@/hooks/useChallengeFilters";

const Challenges = () => {
  const {
    activeTab,
    searchQuery,
    selectedRegion,
    selectedProvince,
    citySearch,
    filteredChallenges,
    hasLocationFilters,
    locationFilterText,
    setActiveTab,
    setSearchQuery,
    setSelectedRegion,
    setSelectedProvince,
    setCitySearch,
    clearLocationFilters,
    clearAllFilters,
  } = useChallengeFilters();

  const handleJoinChallenge = (challengeId: string) => {
    toast.success("You've joined the challenge!");
  };

  const handleContinueChallenge = (challengeId: string) => {
    toast.info("Continuing with your challenge!");
  };

  const handleViewResults = (challengeId: string) => {
    toast.info("Viewing challenge results!");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <ChallengePageHeader />
        
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
              onClearFilters={clearLocationFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <ChallengeSearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hasLocationFilters={hasLocationFilters}
              locationFilterText={locationFilterText}
              onClearLocationFilters={clearLocationFilters}
              filteredCount={filteredChallenges.length}
            />
            
            {/* Challenge Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ChallengeGrid
                challenges={filteredChallenges}
                hasLocationFilters={hasLocationFilters}
                onJoin={handleJoinChallenge}
                onContinue={handleContinueChallenge}
                onView={handleViewResults}
                onClearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
