
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImprintsList } from "./ImprintsList";
import { BadgesList } from "./BadgesList";
import { ImprintsMade } from "./ImprintsMade";
import { ImprintsReceived } from "./ImprintsReceived";
import { ChallengesList } from "./ChallengesList";
import { MemoryMapView } from "./MemoryMapView";
import { LegacyVault } from "@/components/legacy/LegacyVault";
import { Imprint } from "@/components/memory/MemoryCard";
import { Badge } from "@/components/badge/BadgeCard";
import { Challenge } from "@/components/challenge/ChallengeCard";
import { Testimonial } from "@/data/testimonials";

interface PassportTabsProps {
  imprints: Imprint[];
  badges: Badge[];
  challenges: Challenge[];
  testimonials: Testimonial[];
}

export const PassportTabs = ({ imprints, badges, challenges, testimonials }: PassportTabsProps) => {
  const [activeTab, setActiveTab] = useState("imprints");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-7 mb-8">
        <TabsTrigger value="imprints" className="font-medium">
          Imprints
        </TabsTrigger>
        <TabsTrigger value="badges" className="font-medium">
          Badges
        </TabsTrigger>
        <TabsTrigger value="imprints-made" className="font-medium">
          Imprints I've Made
        </TabsTrigger>
        <TabsTrigger value="imprints-received" className="font-medium">
          Imprints That Moved Me
        </TabsTrigger>
        <TabsTrigger value="challenges" className="font-medium">
          Challenges
        </TabsTrigger>
        <TabsTrigger value="map" className="font-medium">
          Memory Map
        </TabsTrigger>
        <TabsTrigger value="vault" className="font-medium">
          Legacy Vault
        </TabsTrigger>
      </TabsList>

      <TabsContent value="imprints" className="space-y-6">
        <ImprintsList imprints={imprints} />
      </TabsContent>

      <TabsContent value="badges" className="space-y-6">
        <BadgesList badges={badges} />
      </TabsContent>

      <TabsContent value="imprints-made" className="space-y-6">
        <ImprintsMade testimonials={testimonials.slice(0, 3)} />
      </TabsContent>

      <TabsContent value="imprints-received" className="space-y-6">
        <ImprintsReceived testimonials={testimonials.slice(3, 6)} />
      </TabsContent>

      <TabsContent value="challenges" className="space-y-6">
        <ChallengesList challenges={challenges} />
      </TabsContent>

      <TabsContent value="map" className="space-y-6">
        <MemoryMapView />
      </TabsContent>

      <TabsContent value="vault" className="space-y-6">
        <LegacyVault />
      </TabsContent>
    </Tabs>
  );
};
