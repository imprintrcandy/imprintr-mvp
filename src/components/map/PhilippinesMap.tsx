
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PhilippinesMapProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
  className?: string;
}

const REGIONS = [
  { id: "ncr", name: "NCR", displayName: "National Capital Region" },
  { id: "car", name: "CAR", displayName: "Cordillera Administrative Region" },
  { id: "ilocos", name: "Ilocos Region", displayName: "Ilocos Region (Region I)" },
  { id: "cagayan", name: "Cagayan Valley", displayName: "Cagayan Valley (Region II)" },
  { id: "central-luzon", name: "Central Luzon", displayName: "Central Luzon (Region III)" },
  { id: "calabarzon", name: "CALABARZON", displayName: "CALABARZON (Region IV-A)" },
  { id: "mimaropa", name: "MIMAROPA", displayName: "MIMAROPA (Region IV-B)" },
  { id: "bicol", name: "Bicol Region", displayName: "Bicol Region (Region V)" },
  { id: "western-visayas", name: "Western Visayas", displayName: "Western Visayas (Region VI)" },
  { id: "central-visayas", name: "Central Visayas", displayName: "Central Visayas (Region VII)" },
  { id: "eastern-visayas", name: "Eastern Visayas", displayName: "Eastern Visayas (Region VIII)" },
  { id: "zamboanga", name: "Zamboanga Peninsula", displayName: "Zamboanga Peninsula (Region IX)" },
  { id: "northern-mindanao", name: "Northern Mindanao", displayName: "Northern Mindanao (Region X)" },
  { id: "davao", name: "Davao Region", displayName: "Davao Region (Region XI)" },
  { id: "soccsksargen", name: "SOCCSKSARGEN", displayName: "SOCCSKSARGEN (Region XII)" },
  { id: "caraga", name: "Caraga", displayName: "Caraga (Region XIII)" },
  { id: "barmm", name: "Bangsamoro", displayName: "Bangsamoro (BARMM)" }
];

export const PhilippinesMap = ({ selectedRegion, onRegionSelect, className }: PhilippinesMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    console.log("Map region clicked:", regionName); // Debug log
    if (selectedRegion === regionName) {
      onRegionSelect(""); // Deselect if already selected
    } else {
      onRegionSelect(regionName);
    }
  };

  const getRegionStyle = (regionName: string) => {
    const isSelected = selectedRegion === regionName;
    const isHovered = hoveredRegion === regionName;
    
    if (isSelected) {
      return "fill-imprint-600 stroke-imprint-700 stroke-2 drop-shadow-lg";
    }
    if (isHovered) {
      return "fill-imprint-200 stroke-imprint-400 stroke-1 drop-shadow-md";
    }
    return "fill-muted hover:fill-imprint-100 stroke-border hover:stroke-imprint-300 stroke-1 transition-all duration-200";
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto bg-background", className)}>
      {/* Debug info */}
      <div className="mb-2 text-xs text-muted-foreground text-center">
        Map loaded • Selected: {selectedRegion || "None"} • Hover: {hoveredRegion || "None"}
      </div>
      
      {/* Philippines SVG Map */}
      <svg
        viewBox="0 0 400 600"
        className="w-full h-auto border border-border rounded-lg bg-background"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minHeight: "300px" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        {/* Luzon */}
        <g id="luzon">
          {/* NCR */}
          <circle
            cx="200"
            cy="280"
            r="12"
            className={cn("cursor-pointer", getRegionStyle("NCR"))}
            onClick={() => handleRegionClick("NCR")}
            onMouseEnter={() => setHoveredRegion("NCR")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "NCR" ? "url(#glow)" : ""}
          />
          
          {/* CAR */}
          <polygon
            points="180,200 220,200 210,240 190,240"
            className={cn("cursor-pointer", getRegionStyle("CAR"))}
            onClick={() => handleRegionClick("CAR")}
            onMouseEnter={() => setHoveredRegion("CAR")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "CAR" ? "url(#glow)" : ""}
          />
          
          {/* Ilocos */}
          <polygon
            points="160,180 180,160 200,180 180,220 160,200"
            className={cn("cursor-pointer", getRegionStyle("Ilocos Region"))}
            onClick={() => handleRegionClick("Ilocos Region")}
            onMouseEnter={() => setHoveredRegion("Ilocos Region")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Ilocos Region" ? "url(#glow)" : ""}
          />
          
          {/* Cagayan Valley */}
          <polygon
            points="220,140 260,140 250,180 230,180"
            className={cn("cursor-pointer", getRegionStyle("Cagayan Valley"))}
            onClick={() => handleRegionClick("Cagayan Valley")}
            onMouseEnter={() => setHoveredRegion("Cagayan Valley")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Cagayan Valley" ? "url(#glow)" : ""}
          />
          
          {/* Central Luzon */}
          <polygon
            points="170,240 230,240 220,280 180,280"
            className={cn("cursor-pointer", getRegionStyle("Central Luzon"))}
            onClick={() => handleRegionClick("Central Luzon")}
            onMouseEnter={() => setHoveredRegion("Central Luzon")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Central Luzon" ? "url(#glow)" : ""}
          />
          
          {/* CALABARZON */}
          <polygon
            points="180,300 230,300 240,340 170,340"
            className={cn("cursor-pointer", getRegionStyle("CALABARZON"))}
            onClick={() => handleRegionClick("CALABARZON")}
            onMouseEnter={() => setHoveredRegion("CALABARZON")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "CALABARZON" ? "url(#glow)" : ""}
          />
          
          {/* MIMAROPA */}
          <polygon
            points="140,320 170,320 160,360 130,360"
            className={cn("cursor-pointer", getRegionStyle("MIMAROPA"))}
            onClick={() => handleRegionClick("MIMAROPA")}
            onMouseEnter={() => setHoveredRegion("MIMAROPA")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "MIMAROPA" ? "url(#glow)" : ""}
          />
          
          {/* Bicol */}
          <polygon
            points="240,360 280,360 270,400 250,400"
            className={cn("cursor-pointer", getRegionStyle("Bicol Region"))}
            onClick={() => handleRegionClick("Bicol Region")}
            onMouseEnter={() => setHoveredRegion("Bicol Region")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Bicol Region" ? "url(#glow)" : ""}
          />
        </g>
        
        {/* Visayas */}
        <g id="visayas">
          {/* Western Visayas */}
          <polygon
            points="120,420 160,420 150,460 130,460"
            className={cn("cursor-pointer", getRegionStyle("Western Visayas"))}
            onClick={() => handleRegionClick("Western Visayas")}
            onMouseEnter={() => setHoveredRegion("Western Visayas")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Western Visayas" ? "url(#glow)" : ""}
          />
          
          {/* Central Visayas */}
          <polygon
            points="180,440 220,440 210,480 190,480"
            className={cn("cursor-pointer", getRegionStyle("Central Visayas"))}
            onClick={() => handleRegionClick("Central Visayas")}
            onMouseEnter={() => setHoveredRegion("Central Visayas")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Central Visayas" ? "url(#glow)" : ""}
          />
          
          {/* Eastern Visayas */}
          <polygon
            points="240,420 280,420 270,460 250,460"
            className={cn("cursor-pointer", getRegionStyle("Eastern Visayas"))}
            onClick={() => handleRegionClick("Eastern Visayas")}
            onMouseEnter={() => setHoveredRegion("Eastern Visayas")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Eastern Visayas" ? "url(#glow)" : ""}
          />
        </g>
        
        {/* Mindanao */}
        <g id="mindanao">
          {/* Zamboanga */}
          <polygon
            points="100,480 140,480 130,520 110,520"
            className={cn("cursor-pointer", getRegionStyle("Zamboanga Peninsula"))}
            onClick={() => handleRegionClick("Zamboanga Peninsula")}
            onMouseEnter={() => setHoveredRegion("Zamboanga Peninsula")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Zamboanga Peninsula" ? "url(#glow)" : ""}
          />
          
          {/* Northern Mindanao */}
          <polygon
            points="160,500 200,500 190,540 170,540"
            className={cn("cursor-pointer", getRegionStyle("Northern Mindanao"))}
            onClick={() => handleRegionClick("Northern Mindanao")}
            onMouseEnter={() => setHoveredRegion("Northern Mindanao")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Northern Mindanao" ? "url(#glow)" : ""}
          />
          
          {/* Davao */}
          <polygon
            points="220,520 260,520 250,560 230,560"
            className={cn("cursor-pointer", getRegionStyle("Davao Region"))}
            onClick={() => handleRegionClick("Davao Region")}
            onMouseEnter={() => setHoveredRegion("Davao Region")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Davao Region" ? "url(#glow)" : ""}
          />
          
          {/* SOCCSKSARGEN */}
          <polygon
            points="180,540 220,540 210,580 190,580"
            className={cn("cursor-pointer", getRegionStyle("SOCCSKSARGEN"))}
            onClick={() => handleRegionClick("SOCCSKSARGEN")}
            onMouseEnter={() => setHoveredRegion("SOCCSKSARGEN")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "SOCCSKSARGEN" ? "url(#glow)" : ""}
          />
          
          {/* Caraga */}
          <polygon
            points="260,480 300,480 290,520 270,520"
            className={cn("cursor-pointer", getRegionStyle("Caraga"))}
            onClick={() => handleRegionClick("Caraga")}
            onMouseEnter={() => setHoveredRegion("Caraga")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Caraga" ? "url(#glow)" : ""}
          />
          
          {/* BARMM */}
          <polygon
            points="140,540 180,540 170,580 150,580"
            className={cn("cursor-pointer", getRegionStyle("Bangsamoro"))}
            onClick={() => handleRegionClick("Bangsamoro")}
            onMouseEnter={() => setHoveredRegion("Bangsamoro")}
            onMouseLeave={() => setHoveredRegion(null)}
            filter={selectedRegion === "Bangsamoro" ? "url(#glow)" : ""}
          />
        </g>
        
        {/* Labels for major regions */}
        <text x="200" y="200" textAnchor="middle" className="fill-muted-foreground text-xs font-medium pointer-events-none">Luzon</text>
        <text x="200" y="450" textAnchor="middle" className="fill-muted-foreground text-xs font-medium pointer-events-none">Visayas</text>
        <text x="200" y="520" textAnchor="middle" className="fill-muted-foreground text-xs font-medium pointer-events-none">Mindanao</text>
      </svg>
      
      {/* Legend */}
      {hoveredRegion && (
        <div className="mt-4 p-3 bg-background border rounded-lg shadow-sm">
          <p className="text-sm font-medium text-center">
            {REGIONS.find(r => r.name === hoveredRegion)?.displayName || hoveredRegion}
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Click to filter challenges
          </p>
        </div>
      )}
    </div>
  );
};
