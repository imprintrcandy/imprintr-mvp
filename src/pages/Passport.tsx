
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PassportTabs } from "@/components/passport/PassportTabs";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { PassportDownload } from "@/components/passport/PassportDownload";
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
      <div className="min-h-screen bg-gradient-soft">
        {/* Cover Photo Section */}
        <div className="relative h-80 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/6bb7a26a-c3b2-45cd-8e68-b0f2a36872e3.png')] bg-contain bg-center opacity-20 mix-blend-soft-light"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Digital Memory Passport ✨
            </h1>
            <p className="text-lg opacity-90">Your story, your legacy, your imprints</p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10" id="passport-content">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-blush/20">
            <ProfileHeader
              {...userProfile}
              isCurrentUser={true}
            />
            
            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-gradient-to-br from-blush/20 to-transparent rounded-2xl">
                <div className="text-3xl font-bold text-memory-600 mb-2">{userProfile.totalImprints}</div>
                <div className="text-sm text-muted-foreground">Imprints Created</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-lavender/20 to-transparent rounded-2xl">
                <div className="text-3xl font-bold text-imprint-600 mb-2">{userProfile.totalBadges}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-sunset/20 to-transparent rounded-2xl">
                <div className="text-3xl font-bold text-sunset-foreground mb-2">12</div>
                <div className="text-sm text-muted-foreground">Challenges Completed</div>
              </div>
            </div>

            {/* Progress to Next Level */}
            <div className="mt-8 p-6 bg-gradient-badge rounded-2xl text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Progress to Legacy Level 1</span>
                <span className="text-sm opacity-90">12/15 badges</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
              </div>
              <p className="text-sm opacity-90 mt-2">3 more badges until you unlock Legacy Level 1! 🏆</p>
            </div>
          </div>

          <PassportDownload
            name={userProfile.name}
            bio={userProfile.bio}
            avatarUrl={userProfile.avatarUrl}
            location={userProfile.location}
            imprints={SAMPLE_IMPRINTS}
            badges={BADGES}
            challenges={CHALLENGES}
            testimonials={SAMPLE_TESTIMONIALS}
          />

          {/* Scrapbook-style Tabs */}
          <div className="bg-white rounded-3xl shadow-lg border border-blush/20 overflow-hidden">
            <PassportTabs 
              imprints={SAMPLE_IMPRINTS}
              badges={BADGES}
              challenges={CHALLENGES}
              testimonials={SAMPLE_TESTIMONIALS}
            />
          </div>
          
          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-8 border border-blush/20">
            <h2 className="text-2xl font-display font-bold mb-6 text-gradient-memory">
              Recent Activity 📝
            </h2>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Passport;
