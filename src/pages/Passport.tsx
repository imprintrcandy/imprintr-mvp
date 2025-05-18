
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PassportTabs } from "@/components/passport/PassportTabs";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { SAMPLE_IMPRINTS } from "@/data/memories";
import { BADGES } from "@/data/badges";
import { CHALLENGES } from "@/data/challenges";
import { SAMPLE_TESTIMONIALS } from "@/data/testimonials";

const Passport = () => {
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
          <PassportTabs 
            imprints={SAMPLE_IMPRINTS}
            badges={BADGES}
            challenges={CHALLENGES}
            testimonials={SAMPLE_TESTIMONIALS}
          />
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
