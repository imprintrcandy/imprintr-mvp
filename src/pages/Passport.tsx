
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImprintCard, Imprint } from "@/components/memory/MemoryCard";
import { BadgeCard } from "@/components/badge/BadgeCard";
import { Button } from "@/components/ui/button";
import { WorldMap } from "@/components/map/WorldMap";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { LegacyVault } from "@/components/legacy/LegacyVault";
import { SAMPLE_IMPRINTS } from "@/data/memories";
import { BADGES } from "@/data/badges";
import { CHALLENGES } from "@/data/challenges";
import { SAMPLE_TESTIMONIALS } from "@/data/testimonials";

const Passport = () => {
  const [activeTab, setActiveTab] = useState("imprints");

  // In a real app, this would come from user data
  const firstName = localStorage.getItem("userFirstName") || "Jane";
  const lastName = localStorage.getItem("userLastName") || "Doe";
  const userProfile = {
    name: `${firstName} ${lastName}`,
    bio: "Digital imprint keeper, storyteller, and life explorer. I'm passionate about preserving meaningful moments and sharing the journey with loved ones.",
    avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3",
    location: "San Francisco, CA",
    featuredBadgeIds: ["badge-1", "badge-3", "badge-5"],
    totalImprints: SAMPLE_IMPRINTS.length,
    totalBadges: BADGES.filter(b => b.achieved).length,
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Digital Imprint Passport</h1>

        <ProfileHeader
          {...userProfile}
          isCurrentUser={true}
        />

        <div className="mt-8">
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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium">Your Imprints</h2>
                <Link to="/new-imprint">
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    New Imprint
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_IMPRINTS.map((imprint) => (
                  <ImprintCard key={imprint.id} imprint={imprint} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium">Imprint Badges</h2>
                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Browse Available Badges
                </Button>
              </div>

              <h3 className="text-xl font-medium">Earned Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {BADGES.filter(badge => badge.achieved).map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <BadgeCard badge={badge} size="md" />
                    <p className="mt-2 text-center text-sm font-medium">{badge.name}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-medium mt-8">In Progress</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {BADGES.filter(badge => !badge.achieved && badge.progress > 0).map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <BadgeCard badge={badge} size="md" />
                    <p className="mt-2 text-center text-sm font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.progress}% complete</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="imprints-made" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium">Imprints I've Made</h2>
                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Create New Imprint
                </Button>
              </div>

              <div className="space-y-4">
                {SAMPLE_TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.relationship}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-4">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="imprints-received" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium">Imprints That Moved Me</h2>
              </div>

              <div className="space-y-4">
                {SAMPLE_TESTIMONIALS.slice(3, 6).map((testimonial, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.relationship}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-4">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-display font-medium">Imprint Challenges</h2>
                <Link to="/challenges">
                  <Button variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Browse Challenges
                  </Button>
                </Link>
              </div>

              <h3 className="text-xl font-medium">Active Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CHALLENGES.filter(c => c.status === "in-progress").slice(0, 2).map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>

              <h3 className="text-xl font-medium mt-8">Completed Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CHALLENGES.filter(c => c.status === "completed").slice(0, 1).map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <WorldMap />
              <div className="flex justify-center mt-4">
                <Button variant="outline">View Full Travel History</Button>
              </div>
            </TabsContent>

            <TabsContent value="vault" className="space-y-6">
              <LegacyVault />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-display font-medium">Recent Activity</h2>
          <ActivityFeed />
        </div>
      </div>
    </MainLayout>
  );
};

export default Passport;
