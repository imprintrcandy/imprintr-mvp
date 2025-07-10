
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface RegionDropdownProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
  className?: string;
}

const PH_REGIONS = [
  { value: "NCR", label: "National Capital Region (NCR)" },
  { value: "CAR", label: "Cordillera Administrative Region (CAR)" },
  { value: "Ilocos Region", label: "Ilocos Region (Region I)" },
  { value: "Cagayan Valley", label: "Cagayan Valley (Region II)" },
  { value: "Central Luzon", label: "Central Luzon (Region III)" },
  { value: "CALABARZON", label: "CALABARZON (Region IV-A)" },
  { value: "MIMAROPA", label: "MIMAROPA (Region IV-B)" },
  { value: "Bicol Region", label: "Bicol Region (Region V)" },
  { value: "Western Visayas", label: "Western Visayas (Region VI)" },
  { value: "Central Visayas", label: "Central Visayas (Region VII)" },
  { value: "Eastern Visayas", label: "Eastern Visayas (Region VIII)" },
  { value: "Zamboanga Peninsula", label: "Zamboanga Peninsula (Region IX)" },
  { value: "Northern Mindanao", label: "Northern Mindanao (Region X)" },
  { value: "Davao Region", label: "Davao Region (Region XI)" },
  { value: "SOCCSKSARGEN", label: "SOCCSKSARGEN (Region XII)" },
  { value: "Caraga", label: "Caraga (Region XIII)" },
  { value: "Bangsamoro", label: "Bangsamoro (BARMM)" }
];

export const RegionDropdown = ({ selectedRegion, onRegionSelect, className }: RegionDropdownProps) => {
  return (
    <Select value={selectedRegion || ""} onValueChange={(value) => onRegionSelect(value)}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Filter by region..." />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All Regions</SelectItem>
        {PH_REGIONS.map((region) => (
          <SelectItem key={region.value} value={region.value}>
            {region.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
