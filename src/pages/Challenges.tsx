
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MainLayout from "@/components/layout/MainLayout";
import { ChallengePageHeader } from "@/components/challenge/ChallengePageHeader";
import { ChallengeSearchFilters } from "@/components/challenge/ChallengeSearchFilters";
import { ChallengeGrid } from "@/components/challenge/ChallengeGrid";
import { useChallengeFilters } from "@/hooks/useChallengeFilters";

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedDifficulty, 
    setSelectedDifficulty,
    selectedRegion,
    setSelectedRegion,
    showFeaturedOnly,
    setShowFeaturedOnly,
    showCompletedOnly,
    setShowCompletedOnly
  } = useChallengeFilters();

  const { data: challenges = [], isLoading, error } = useQuery({
    queryKey: ['challenges', selectedCategory, selectedDifficulty, selectedRegion, searchTerm, showFeaturedOnly, showCompletedOnly],
    queryFn: async () => {
      let query = supabase
        .from('challenges')
        .select('*')
        .eq('status', 'active');

      if (selectedCategory && selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      if (selectedDifficulty && selectedDifficulty !== 'all') {
        query = query.eq('difficulty', selectedDifficulty);
      }
      
      if (selectedRegion && selectedRegion !== 'all') {
        query = query.eq('region', selectedRegion);
      }
      
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }
      
      if (showFeaturedOnly) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleFeaturedToggle = (featured: boolean) => {
    setShowFeaturedOnly(featured);
  };

  const handleCompletedToggle = (completed: boolean) => {
    setShowCompletedOnly(completed);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-lavender-50">
        <div className="container mx-auto px-4 py-8">
          <ChallengePageHeader />
          
          <ChallengeSearchFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={handleDifficultyChange}
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            showFeaturedOnly={showFeaturedOnly}
            onFeaturedToggle={handleFeaturedToggle}
            showCompletedOnly={showCompletedOnly}
            onCompletedToggle={handleCompletedToggle}
          />

          <ChallengeGrid 
            challenges={challenges}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
