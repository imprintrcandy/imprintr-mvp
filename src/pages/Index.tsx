
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Heart, Trophy, Users, Star, ArrowRight, Play, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  // Featured challenges for the carousel
  const featuredChallenges = [
    {
      id: 1,
      title: "Visit a New Coffee Shop",
      category: "Personal Growth",
      badgeColor: "bg-coral-400",
      icon: "☕",
      participants: 234,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Write a Letter to Future Self",
      category: "Self-Care", 
      badgeColor: "bg-lavender-400",
      icon: "💌",
      participants: 156,
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Learn 10 Words in a New Language",
      category: "Creativity",
      badgeColor: "bg-mint-400", 
      icon: "🌍",
      participants: 89,
      difficulty: "Medium"
    }
  ];

  // Recent badge feed
  const recentBadges = [
    { user: "Maria", badge: "First Hike", time: "2h ago", avatar: "🥾" },
    { user: "Alex", badge: "New Recipe", time: "4h ago", avatar: "🍳" },
    { user: "Sam", badge: "Book Club", time: "6h ago", avatar: "📚" },
  ];

  return (
    <MainLayout hideNav>
      {/* Hero Section with new Imprintr branding */}
      <section className="relative min-h-screen bg-gradient-to-br from-coral-50 via-peach-50 to-mint-50">
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 py-16 flex flex-col justify-center items-center text-center min-h-screen">
          <img 
            src="/lovable-uploads/4fee875d-fccc-4054-b0cb-81fc66458a43.png" 
            alt="Imprintr Logo" 
            className="h-24 w-auto mb-6 animate-fade-in"
          />
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 animate-fade-in">
            Where Your Memories 
            <span className="gradient-text block">Earn Meaning</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mb-8 animate-fade-in font-medium">
            Turn your bucket list into collectible badges — stored forever onchain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg"
              size="lg"
            >
              Start Your Digital Memory Passport
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/challenges")}
              variant="outline"
              className="text-lg px-8 py-6"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Challenges
            </Button>
          </div>

          {/* Demo passport preview */}
          <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-coral-200 max-w-md animate-fade-in">
            <h3 className="font-display font-semibold text-lg mb-4">Digital Memory Passport</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="w-12 h-12 bg-coral-400 rounded-full flex items-center justify-center text-white">☕</div>
              <div className="w-12 h-12 bg-lavender-400 rounded-full flex items-center justify-center text-white">💌</div>
              <div className="w-12 h-12 bg-mint-400 rounded-full flex items-center justify-center text-white">🌍</div>
              <div className="w-12 h-12 bg-peach-400 rounded-full flex items-center justify-center text-white">📚</div>
              <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white opacity-50">+</div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Collect badges by completing life challenges</p>
          </div>
        </div>
      </section>

      {/* Featured Challenges Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Popular <span className="gradient-text">Life Challenges</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands turning everyday moments into meaningful memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${challenge.badgeColor} rounded-full flex items-center justify-center text-white text-xl`}>
                    {challenge.icon}
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">{challenge.category}</span>
                    <h3 className="font-display font-semibold">{challenge.title}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{challenge.participants} joined</span>
                  <span className="px-2 py-1 bg-coral-100 text-coral-700 rounded-full">{challenge.difficulty}</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Join Challenge
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate("/challenges")}
              variant="outline" 
              className="text-lg px-8 py-4"
              size="lg"
            >
              View All Challenges
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-coral-50 to-peach-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              How It Works in <span className="gradient-text">3 Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start creating meaningful memories that last forever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-coral-400 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">1. Choose</h3>
              <p className="text-muted-foreground text-lg">
                Pick a life challenge that resonates with your goals and values
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-mint-400 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">2. Complete</h3>
              <p className="text-muted-foreground text-lg">
                Take action in real life and submit proof of your meaningful moment
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-lavender-400 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">3. Earn</h3>
              <p className="text-muted-foreground text-lg">
                Receive a collectible memory badge stored forever in your Digital Passport
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Badge Feed */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Live <span className="gradient-text">Badge Feed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See real people earning real memories right now
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {recentBadges.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center text-white text-xl">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.user} just earned the <span className="text-primary font-semibold">"{item.badge}"</span> badge!</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <Star className="h-5 w-5 text-coral-400" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/passport")}
              className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-white"
              size="lg"
            >
              View Community Passports
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Web3 Technology Footer */}
      <section className="py-16 bg-gradient-to-r from-mint-50 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Powered by <span className="gradient-text">Web3 Technology</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your memories are permanently secured on the blockchain, ensuring they last forever
            </p>
          </div>

          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-peach-400 rounded-lg"></div>
              <span className="font-display font-semibold text-lg">Aptos</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-mint-400 to-sky-400 rounded-lg"></div>
              <span className="font-display font-semibold text-lg">Base</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-lavender-400 to-coral-400 rounded-lg"></div>
              <span className="font-display font-semibold text-lg">NFT Badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-coral-400 via-peach-400 to-mint-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <img 
            src="/lovable-uploads/4fee875d-fccc-4054-b0cb-81fc66458a43.png" 
            alt="Imprintr Logo" 
            className="h-20 w-auto mb-6 mx-auto"
          />
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            Memories Worth Minting
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-medium">
            Start building your vault for the soul. Create, complete, and collect memories that last forever.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleGetStarted}
              className="text-lg px-10 py-6 bg-white hover:bg-white/90 text-coral-600 font-semibold shadow-xl"
              size="lg"
            >
              Create Your Memory Passport
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/challenges")}
              variant="outline"
              className="text-lg px-10 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold"
              size="lg"
            >
              Start A Challenge
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
