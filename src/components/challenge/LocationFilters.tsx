
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { PH_REGIONS, REGION_PROVINCES, PhilippinesRegion } from "@/data/philippines-locations";

interface LocationFiltersProps {
  selectedRegion: string | null;
  selectedProvince: string | null;
  citySearch: string;
  onRegionChange: (region: string | null) => void;
  onProvinceChange: (province: string | null) => void;
  onCitySearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export const LocationFilters = ({
  selectedRegion,
  selectedProvince,
  citySearch,
  onRegionChange,
  onProvinceChange,
  onCitySearchChange,
  onClearFilters
}: LocationFiltersProps) => {
  const availableProvinces = selectedRegion ? REGION_PROVINCES[selectedRegion] || [] : [];
  const hasActiveFilters = selectedRegion || selectedProvince || citySearch;

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-imprint-600" />
          Filter by Location
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {/* Region Dropdown */}
        <div>
          <label className="text-sm font-medium mb-1 block">Region</label>
          <Select value={selectedRegion || ""} onValueChange={(value) => onRegionChange(value || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Select region..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Regions</SelectItem>
              {PH_REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Province Dropdown - Only show if region is selected */}
        {selectedRegion && availableProvinces.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-1 block">Province</label>
            <Select value={selectedProvince || ""} onValueChange={(value) => onProvinceChange(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Select province..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Provinces</SelectItem>
                {availableProvinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* City/Barangay Search */}
        <div>
          <label className="text-sm font-medium mb-1 block">City or Barangay</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search city, municipality, or barangay..."
              value={citySearch}
              onChange={(e) => onCitySearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-3 border-t">
          <p className="text-sm text-muted-foreground mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedRegion && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-imprint-100 text-imprint-700 rounded-full text-xs">
                Region: {selectedRegion}
                <button onClick={() => onRegionChange(null)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedProvince && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-imprint-100 text-imprint-700 rounded-full text-xs">
                Province: {selectedProvince}
                <button onClick={() => onProvinceChange(null)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {citySearch && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-imprint-100 text-imprint-700 rounded-full text-xs">
                City: {citySearch}
                <button onClick={() => onCitySearchChange("")}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
