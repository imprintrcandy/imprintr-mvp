
import { Button } from "@/components/ui/button";
import { WorldMap } from "@/components/map/WorldMap";

export const MemoryMapView = () => {
  return (
    <div className="space-y-6">
      <WorldMap />
      <div className="flex justify-center mt-4">
        <Button variant="outline">View Full Travel History</Button>
      </div>
    </div>
  );
};
