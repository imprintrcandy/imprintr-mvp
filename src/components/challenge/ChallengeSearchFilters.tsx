
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";

interface ChallengeSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasLocationFilters: boolean;
  locationFilterText: string;
  onClearLocationFilters: () => void;
  filteredCount: number;
}

export const ChallengeSearchFilters = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  hasLocationFilters,
  locationFilterText,
  onClearLocationFilters,
  filteredCount
}: ChallengeSearchFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search and Status Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
              Showing {filteredCount} challenges for {locationFilterText}
            </>
          ) : (
            <>Showing {filteredCount} challenges across all regions</>
          )}
        </p>
        
        {hasLocationFilters && (
          <Button variant="outline" size="sm" onClick={onClearLocationFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Location Filters
          </Button>
        )}
      </div>
    </div>
  );
};
