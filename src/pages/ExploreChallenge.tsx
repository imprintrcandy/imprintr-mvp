import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Users, Clock, Star, Zap } from "lucide-react";
import MobileNavigation from "@/components/layout/MobileNavigation";

const ExploreChallenge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "Personal Growth", "Travel", "Relationships", "Impact", 
    "Faith", "Fitness", "Creativity", "Milestones"
  ];

  const challenges = [
    {
      id: 1,
      title: "Visit 5 Local Coffee Shops",
      description: "Discover your neighborhood's unique coffee culture",
      category: "Personal Growth",
      difficulty: "Easy",
      participants: 1247,
      timeLeft: "5 days",
      badge: { color: "bg-coral-400", icon: "☕" },
      isSponsored: false,
      isTrending: true
    },
    {
      id: 2,
      title: "Write Letters to 3 People You Love",
      description: "Express gratitude and strengthen relationships",
      category: "Relationships", 
      difficulty: "Medium",
      participants: 892,
      timeLeft: "12 days",
      badge: { color: "bg-lavender-400", icon: "💌" },
      isSponsored: false,
      isTrending: true
    },
    {
      id: 3,
      title: "Complete a 30-Day Meditation Journey",
      description: "Build mindfulness through daily practice",
      category: "Faith",
      difficulty: "Epic",
      participants: 2156,
      timeLeft: "Always open",
      badge: { color: "bg-mint-400", icon: "🧘" },
      isSponsored: true,
      isTrending: false
    },
    {
      id: 4,
      title: "Learn to Cook Your Grandmother's Recipe",
      description: "Preserve family traditions through food",
      category: "Creativity",
      difficulty: "Medium", 
      participants: 634,
      timeLeft: "8 days",
      badge: { color: "bg-peach-400", icon: "🍳" },
      isSponsored: false,
      isTrending: false
    },
    {
      id: 5,
      title: "Visit a Museum You've Never Been To",
      description: "Expand your cultural horizons",
      category: "Personal Growth",
      difficulty: "Easy",
      participants: 1089,
      timeLeft: "15 days",
      badge: { color: "bg-sky-400", icon: "🏛️" },
      isSponsored: false,
      isTrending: true
    },
    {
      id: 6,
      title: "Volunteer for 10 Hours This Month",
      description: "Make a meaningful impact in your community",
      category: "Impact",
      difficulty: "Medium",
      participants: 743,
      timeLeft: "20 days",
      badge: { color: "bg-coral-400", icon: "❤️" },
      isSponsored: false,
      isTrending: false
    }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-mint-100 text-mint-700";
      case "Medium": return "bg-peach-100 text-peach-700";
      case "Epic": return "bg-coral-100 text-coral-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <MainLayout>
        <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Explore <span className="gradient-text">Challenges</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Discover meaningful life challenges and start building your memory collection
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Input
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Personal Growth">Growth</TabsTrigger>
                <TabsTrigger value="Relationships">Love</TabsTrigger>
                <TabsTrigger value="Impact">Impact</TabsTrigger>
                <TabsTrigger value="Creativity">Create</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Category pills for mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category 
                      ? "bg-primary text-white" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-coral-100">
              <Zap className="w-3 h-3 mr-1" />
              Trending
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-mint-100">
              <Clock className="w-3 h-3 mr-1" />
              Closing Soon
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-peach-100">
              <Star className="w-3 h-3 mr-1" />
              New
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-lavender-100">
              <Users className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Challenge Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${challenge.badge.color} rounded-full flex items-center justify-center text-white text-xl`}>
                      {challenge.badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {challenge.isSponsored && (
                          <Badge className="bg-gold-100 text-gold-700 text-xs">Sponsored</Badge>
                        )}
                        {challenge.isTrending && (
                          <Badge className="bg-coral-100 text-coral-700 text-xs">Trending</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{challenge.category}</span>
                    </div>
                  </div>
                </div>

                {/* Challenge Content */}
                <h3 className="font-display font-semibold text-lg mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{challenge.description}</p>

                {/* Challenge Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {challenge.participants} joined
                  </span>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {challenge.timeLeft}
                  </span>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Join Challenge
                </Button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredChallenges.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No challenges match your search.</p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </MainLayout>
      <MobileNavigation />
    </>
  );
};

export default ExploreChallenge;