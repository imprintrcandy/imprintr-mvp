
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImprintCard, Imprint } from "@/components/memory/MemoryCard";
import { BadgeCard } from "@/components/badge/BadgeCard";
import { Button } from "@/components/ui/button";
import { SAMPLE_IMPRINTS } from "@/data/memories";
import { BADGES } from "@/data/badges";
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
            <TabsList className="grid grid-cols-5 mb-8">
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
            </TabsList>

            <TabsContent value="imprints" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium">Your Imprints</h2>
                <Link to="/new-memory">
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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-medium">Imprint Challenges</h2>
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
              </div>

              <h3 className="text-xl font-medium">Active Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold">30 Days of Gratitude</h4>
                    <div className="text-xs text-white bg-imprint-600 px-2 py-1 rounded-full">
                      In Progress
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Document one thing you're grateful for each day for 30 days.
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>15/30 days</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-imprint-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Continue Challenge</Button>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold">Family Photo Archive</h4>
                    <div className="text-xs text-white bg-imprint-600 px-2 py-1 rounded-full">
                      Just Started
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Digitize and document 50 family photos with stories.
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>3/50 photos</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-imprint-600 h-2.5 rounded-full" style={{ width: '6%' }}></div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Continue Challenge</Button>
                </div>
              </div>

              <h3 className="text-xl font-medium mt-8">Completed Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold">First Imprint Challenge</h4>
                    <div className="text-xs text-white bg-accent px-2 py-1 rounded-full">
                      Completed
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Create your first 5 imprints with photos and stories.
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>5/5 imprints</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-accent h-2.5 rounded-full w-full"></div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">View Results</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Passport;
