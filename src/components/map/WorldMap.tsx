
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SAMPLE_IMPRINTS } from "@/data/memories";

export const WorldMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Filter imprints that have locations
  const imprintsWithLocations = SAMPLE_IMPRINTS.filter(imprint => imprint.location);
  
  // Group imprints by location
  const imprints = imprintsWithLocations.reduce((acc, imprint) => {
    const location = imprint.location as string;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(imprint);
    return acc;
  }, {} as Record<string, typeof SAMPLE_IMPRINTS>);

  const handleLocationClick = (location: string) => {
    setSelectedLocation(selectedLocation === location ? null : location);
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-display font-semibold mb-4">Memory Map</h2>
      
      <div className="relative bg-muted rounded-xl overflow-hidden h-[500px] mb-4">
        {/* This is a placeholder for an actual map implementation */}
        <div ref={mapContainerRef} className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="World Map"
              className="w-full h-full object-cover opacity-70" 
            />
            
            {/* Location pins */}
            {Object.keys(imprints).map((location, index) => {
              // These positions would normally be calculated from geocoordinates
              // For now, we're placing pins at predetermined positions
              const positions = [
                { top: '30%', left: '20%' },
                { top: '40%', left: '50%' },
                { top: '35%', left: '80%' },
                { top: '60%', left: '30%' },
                { top: '50%', left: '70%' },
                { top: '20%', left: '60%' }
              ];
              const position = positions[index % positions.length];
              
              return (
                <div 
                  key={location}
                  className={`absolute cursor-pointer transition-all duration-300 ${selectedLocation === location ? 'scale-125' : 'scale-100'}`}
                  style={{ top: position.top, left: position.left }}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-imprint-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {imprints[location].length}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-t-imprint-600 border-l-transparent border-r-transparent"></div>
                    
                    {selectedLocation === location && (
                      <div className="absolute top-8 -left-32 w-64 bg-white rounded-lg shadow-lg p-2 z-10">
                        <p className="font-medium text-sm">{location}</p>
                        <p className="text-xs text-muted-foreground mb-1">{imprints[location].length} imprints</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {imprints[location].slice(0, 3).map((imprint) => (
                            <Badge key={imprint.id} variant="outline" className="text-xs">
                              {imprint.title}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="link" className="text-xs p-0 h-auto mt-1">View all</Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Map controls - placeholder */}
        <div className="absolute top-2 right-2 bg-background/80 rounded-md p-1 backdrop-blur-sm">
          <Button variant="ghost" size="icon" className="h-8 w-8">+</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">-</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {Object.keys(imprints).map(location => (
          <Badge 
            key={location} 
            variant={selectedLocation === location ? "default" : "outline"}
            className="cursor-pointer justify-center py-1.5"
            onClick={() => handleLocationClick(location)}
          >
            {location} <span className="ml-1 opacity-70">({imprints[location].length})</span>
          </Badge>
        ))}
      </div>
    </Card>
  );
};
