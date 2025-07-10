
import { useState } from "react";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ImprintsList } from "./ImprintsList";
import { BadgesList } from "./BadgesList";
import { ImprintsMade } from "./ImprintsMade";
import { ImprintsReceived } from "./ImprintsReceived";
import { ChallengesList } from "./ChallengesList";
import { MemoryMapView } from "./MemoryMapView";
import { ReferralStatus } from "./ReferralStatus";
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

  const renderContent = () => {
    switch (activeTab) {
      case "imprints":
        return <ImprintsList imprints={imprints} />;
      case "badges":
        return <BadgesList badges={badges} />;
      case "imprints-made":
        return <ImprintsMade testimonials={testimonials.slice(0, 3)} />;
      case "imprints-received":
        return <ImprintsReceived testimonials={testimonials.slice(3, 6)} />;
      case "challenges":
        return <ChallengesList challenges={challenges} />;
      case "map":
        return <MemoryMapView />;
      case "referrals":
        return <ReferralStatus />;
      case "vault":
        return <LegacyVault />;
      default:
        return <ImprintsList imprints={imprints} />;
    }
  };

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <ProfileSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
