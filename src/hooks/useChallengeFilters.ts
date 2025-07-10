
import { useState, useMemo } from "react";
import { Challenge } from "@/components/challenge/ChallengeCard";
import { CHALLENGES } from "@/data/challenges";

export const useChallengeFilters = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState("");

  const filteredChallenges = useMemo(() => {
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
  }, [activeTab, searchQuery, selectedRegion, selectedProvince, citySearch]);

  const hasLocationFilters = Boolean(selectedRegion || selectedProvince || citySearch);
  const locationFilterText = [selectedRegion, selectedProvince, citySearch].filter(Boolean).join(" / ");

  const clearLocationFilters = () => {
    setSelectedRegion(null);
    setSelectedProvince(null);
    setCitySearch("");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
    clearLocationFilters();
  };

  return {
    // State
    activeTab,
    searchQuery,
    selectedRegion,
    selectedProvince,
    citySearch,
    
    // Computed
    filteredChallenges,
    hasLocationFilters,
    locationFilterText,
    
    // Actions
    setActiveTab,
    setSearchQuery,
    setSelectedRegion,
    setSelectedProvince,
    setCitySearch,
    clearLocationFilters,
    clearAllFilters,
  };
};
