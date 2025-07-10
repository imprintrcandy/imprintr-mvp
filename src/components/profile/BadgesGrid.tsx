import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Share, Users, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface BadgeItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  story: string | null;
  earned_at: string;
  challenge: {
    title: string;
    category: string;
  } | null;
}

interface BadgesGridProps {
  badges: BadgeItem[];
}

const BadgesGrid = ({ badges }: BadgesGridProps) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Personal Growth": "from-purple-400 to-purple-600",
      "Travel": "from-blue-400 to-blue-600",
      "Relationships": "from-pink-400 to-pink-600",
      "Impact": "from-green-400 to-green-600",
      "Faith": "from-yellow-400 to-yellow-600",
      "Fitness": "from-orange-400 to-orange-600",
      "Creativity": "from-indigo-400 to-indigo-600",
      "Milestones": "from-red-400 to-red-600",
    };
    return colors[category as keyof typeof colors] || "from-gray-400 to-gray-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleShareBadge = async (badge: BadgeItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I earned the "${badge.title}" badge!`,
          text: badge.story || `Check out my latest memory badge on Imprintr!`,
          url: window.location.href
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (badges.length === 0) {
    return (
      <Card className="p-12 text-center bg-gradient-to-br from-mint-50 to-lavender-50 border-2 border-dashed border-gray-200">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center">
            <Award className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No badges yet</h3>
            <p className="text-gray-600 mb-4">Start your first challenge to earn your first memory badge!</p>
            <Button className="bg-gradient-to-r from-coral-500 to-peach-500 hover:from-coral-600 hover:to-peach-600">
              Explore Challenges
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Award className="h-6 w-6 text-coral-500" />
          Memory Badges ({badges.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setSelectedBadge(badge)}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className={`h-32 bg-gradient-to-br ${getCategoryColor(badge.challenge?.category || '')} p-4 relative`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {badge.challenge?.category || "Badge"}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {badge.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(badge.earned_at)}</span>
                </div>

                {badge.story && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {badge.story}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {badge.challenge?.title || "Challenge"}
                  </span>
                  <div className="flex items-center gap-1 text-coral-500 group-hover:text-coral-600 transition-colors">
                    <span className="text-xs font-medium">View</span>
                    <Award className="h-3 w-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Badge Detail Modal */}
      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="max-w-2xl">
          {selectedBadge && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(selectedBadge.challenge?.category || '')} rounded-full flex items-center justify-center`}>
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  {selectedBadge.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Earned on {formatDate(selectedBadge.earned_at)}</span>
                  </div>
                  
                  {selectedBadge.challenge && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Challenge: {selectedBadge.challenge.title}</span>
                    </div>
                  )}
                </div>

                {selectedBadge.story && (
                  <div className="bg-gradient-to-r from-mint-50 to-lavender-50 p-6 rounded-2xl">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-coral-500" />
                      My Memory Story
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedBadge.story}</p>
                  </div>
                )}

                {selectedBadge.description && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Badge Description</h4>
                    <p className="text-gray-600">{selectedBadge.description}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleShareBadge(selectedBadge)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Share className="h-4 w-4" />
                    Share Badge
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Nominate Friend
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Award className="h-4 w-4" />
                    Remix Challenge
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BadgesGrid;