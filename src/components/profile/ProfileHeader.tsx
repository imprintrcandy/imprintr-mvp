
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCard } from "@/components/badge/BadgeCard";
import { BADGES } from "@/data/badges";

interface ProfileHeaderProps {
  name: string;
  bio: string;
  avatarUrl: string;
  location?: string;
  featuredBadgeIds: string[];
  totalMemories: number;
  totalBadges: number;
  isCurrentUser?: boolean;
}

export const ProfileHeader = ({
  name,
  bio,
  avatarUrl,
  location,
  featuredBadgeIds,
  totalMemories,
  totalBadges,
  isCurrentUser = false,
}: ProfileHeaderProps) => {
  const featuredBadges = BADGES.filter((badge) => featuredBadgeIds.includes(badge.id));

  return (
    <div className="w-full bg-gradient-light p-6 rounded-lg shadow-soft">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-soft">
          <img
            src={avatarUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-display font-semibold">{name}</h1>
          
          {location && (
            <div className="flex items-center justify-center md:justify-start text-muted-foreground mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{location}</span>
            </div>
          )}
          
          <p className="mt-3 text-foreground">{bio}</p>

          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
            <Badge variant="outline">
              <span className="text-imprint-600 font-semibold mr-1">{totalMemories}</span> Memories
            </Badge>
            <Badge variant="outline">
              <span className="text-memory-600 font-semibold mr-1">{totalBadges}</span> Badges
            </Badge>
          </div>
          
          {isCurrentUser ? (
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button size="sm">
                Create Memory
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex justify-center md:justify-start">
              <Button>
                Follow
              </Button>
            </div>
          )}
        </div>
        
        <div className="hidden md:flex flex-col items-center">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">Featured Badges</h3>
          <div className="flex gap-2">
            {featuredBadges.slice(0, 3).map((badge) => (
              <BadgeCard key={badge.id} badge={badge} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
