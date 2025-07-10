
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChallengePageHeader } from "@/components/challenge/ChallengePageHeader";
import { ChallengeSearchFilters } from "@/components/challenge/ChallengeSearchFilters";
import { ChallengeGrid } from "@/components/challenge/ChallengeGrid";
import { useChallengeFilters } from "@/hooks/useChallengeFilters";
import { Challenge } from "@/components/challenge/ChallengeCard";

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
    clearAllFilters
  } = useChallengeFilters();

  // Transform Supabase challenge data to match ChallengeCard interface
  const transformChallengeData = (supabaseChallenge: any): Challenge => {
    return {
      id: supabaseChallenge.id,
      title: supabaseChallenge.title,
      description: supabaseChallenge.description,
      category: supabaseChallenge.category,
      progress: 0, // Default progress since not tracked in Supabase yet
      target: 1, // Default target
      status: "not-started" as const,
      participants: supabaseChallenge.participants_count || 0,
      location: supabaseChallenge.region,
      badgeId: supabaseChallenge.id // Use challenge id as badge id for now
    };
  };

  const { data: supabaseChallenges = [], isLoading, error } = useQuery({
    queryKey: ['challenges', selectedRegion, selectedProvince, citySearch, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('challenges')
        .select('*')
        .eq('status', 'active');

      if (selectedRegion) {
        query = query.eq('region', selectedRegion);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Transform and filter challenges
  const transformedChallenges = supabaseChallenges.map(transformChallengeData);
  const finalChallenges = filteredChallenges.length > 0 ? filteredChallenges : transformedChallenges;

  const handleJoin = (challengeId: string) => {
    console.log('Joining challenge:', challengeId);
    // TODO: Implement challenge joining logic
  };

  const handleContinue = (challengeId: string) => {
    console.log('Continuing challenge:', challengeId);
    // TODO: Implement challenge continuation logic
  };

  const handleView = (challengeId: string) => {
    console.log('Viewing challenge:', challengeId);
    // TODO: Implement challenge viewing logic
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-lavender-50">
        <div className="container mx-auto px-4 py-8">
          <ChallengePageHeader />
          
          <ChallengeSearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasLocationFilters={!!hasLocationFilters}
            locationFilterText={locationFilterText}
            onClearLocationFilters={clearLocationFilters}
            filteredCount={finalChallenges.length}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChallengeGrid 
              challenges={finalChallenges}
              hasLocationFilters={!!hasLocationFilters}
              onJoin={handleJoin}
              onContinue={handleContinue}
              onView={handleView}
              onClearAllFilters={clearAllFilters}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
