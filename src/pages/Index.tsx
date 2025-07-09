
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { BadgeCard } from "@/components/badge/BadgeCard";
import { BADGES } from "@/data/badges";
import { SAMPLE_TESTIMONIALS } from "@/data/testimonials";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const featuredBadges = BADGES.slice(0, 3);

  return (
    <MainLayout hideNav>
      {/* Hero Section - Gen Z meets Apple meets Notion */}
      <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/6bb7a26a-c3b2-45cd-8e68-b0f2a36872e3.png')] bg-contain bg-center opacity-10 mix-blend-soft-light"></div>
        
        <div className="relative container mx-auto px-4 min-h-screen flex flex-col justify-center items-center text-center z-10">
          <div className="animate-fade-in mb-8">
            <img 
              src="/lovable-uploads/4fee875d-fccc-4054-b0cb-81fc66458a43.png" 
              alt="Imprintr Logo" 
              className="h-20 md:h-28 w-auto mb-6 mx-auto"
            />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-4 tracking-tight">
              Imprintr
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-semibold">
              Where Your Memories Earn Meaning —
            </p>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-semibold">
              and Badges That Last Forever.
            </p>
          </div>

          <div className="animate-fade-in max-w-5xl mb-12">
            <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed font-medium">
              🎮 Create life challenges • 🏆 Earn Digital Memory NFT Badges • 📖 Build your Digital Memory Passport<br />
              ✨ It's like Pokémon GO for purpose-driven bucket lists + Instagram for core memories
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in mb-16">
            <Button
              onClick={handleGetStarted}
              className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/95 rounded-3xl font-bold shadow-floating hover:shadow-coral transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              🌟 Start Earning Memory Badges
            </Button>
            <Button
              onClick={() => navigate("/challenges")}
              variant="outline"
              className="text-lg px-10 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-3xl backdrop-blur-md font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              🎯 Explore Challenges
            </Button>
          </div>

          {/* Digital Memory Passport Mock Preview */}
          <div className="card-floating max-w-4xl w-full animate-fade-in bg-white/15 backdrop-blur-lg border border-white/20 p-8">
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              ✨ Your Digital Memory Passport Preview
            </h3>
            
            {/* Mock passport with badges */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl border-4 border-white/30">
                    👤
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white">Your Name</h4>
                    <p className="text-white/70">Digital Memory Keeper</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-white/70 text-sm">Badges Earned</div>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-3 mb-4">
                {featuredBadges.concat(Array(3).fill(null)).map((badge, index) => (
                  <div key={index} className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 border-white/30 ${
                      badge ? 'bg-gradient-primary' : 'bg-white/10'
                    }`}>
                      {badge ? ['🏔️', '📸', '✈️', '🎯', '🌟', '💝'][index] : '🔒'}
                    </div>
                    {badge && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border border-white text-xs flex items-center justify-center text-white font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Progress to Legacy Level 1</span>
                  <span className="text-white/80 text-sm">12/15 badges</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-gradient-primary h-3 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                </div>
                <p className="text-white/80 text-sm mt-2">3 more badges until you unlock Legacy Level 1! 🏆</p>
              </div>
            </div>
            
            <p className="text-white/90 text-base font-medium">
              🎮 Gamify your life • 🌍 Make memories meaningful • ⚡ Leave a legacy worth remembering
            </p>
          </div>

          <div className="absolute bottom-8 w-full flex justify-center">
            <div className="animate-pulse-soft">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-soft py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
              How It Works in <span className="text-gradient-primary">3 Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turn your life into a game worth playing — where every moment counts toward your legacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="card-coral p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-coral rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-coral group-hover:shadow-floating">
                1
              </div>
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-display font-bold mb-4">Join a Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pick from hundreds of life challenges — from "30 Days of Gratitude" to "Travel to 3 Countries" — and start your journey.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card-mint p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-mint rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-mint group-hover:shadow-floating">
                2
              </div>
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-display font-bold mb-4">Earn NFT Badges</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete challenges to unlock unique Digital Memory NFT Badges — collectible proof of your growth and adventures.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card-lavender p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-lavender rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lavender group-hover:shadow-floating">
                3
              </div>
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-2xl font-display font-bold mb-4">Build Your Legacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Store badges forever in your Digital Memory Passport — a beautiful, shareable record of your most meaningful moments.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-8 bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="text-2xl">⚡</div>
                <span className="font-semibold text-foreground">Earn</span>
              </div>
              <div className="w-8 h-1 bg-gradient-primary rounded-full"></div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">📤</div>
                <span className="font-semibold text-foreground">Share</span>
              </div>
              <div className="w-8 h-1 bg-gradient-primary rounded-full"></div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🌟</div>
                <span className="font-semibold text-foreground">Be Remembered Forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Challenges Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
              Popular Life <span className="text-gradient-coral">Challenges</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of people making their bucket lists come alive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🙏", title: "30 Days of Gratitude", participants: "1,247 joined", bg: "bg-gradient-coral" },
              { emoji: "📸", title: "Family Photo Archive", participants: "456 joined", bg: "bg-gradient-mint" },
              { emoji: "✈️", title: "Travel 3 Countries", participants: "689 joined", bg: "bg-gradient-lavender" },
              { emoji: "🧸", title: "Childhood Reflection", participants: "234 joined", bg: "bg-gradient-primary" }
            ].map((challenge, index) => (
              <div key={index} className="card-floating p-6 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className={`w-16 h-16 mx-auto mb-4 ${challenge.bg} rounded-full flex items-center justify-center text-2xl shadow-card group-hover:shadow-floating`}>
                  {challenge.emoji}
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{challenge.participants}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full border-coral/30 text-coral-foreground hover:bg-coral/10"
                  onClick={() => navigate("/challenges")}
                >
                  Join Challenge
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/challenges")}
              className="text-lg px-10 py-6 bg-gradient-primary text-white border-0 rounded-3xl font-bold shadow-floating hover:shadow-coral transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              🎮 Explore All Challenges
            </Button>
          </div>
        </div>
      </section>

      {/* Badge Showcase Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            Make Memories <span className="text-gradient">Playful</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Turn life adventures into digital achievements and showcase them on your memory passport
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {featuredBadges.map((badge) => (
              <div key={badge.id} className="text-center">
                <BadgeCard badge={badge} size="lg" />
                <h3 className="mt-4 text-lg font-medium">{badge.name}</h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Brands Featured Section */}
      <section className="py-20 bg-gradient-to-r from-memory-50 to-warmth-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            <span className="text-gradient">Partner Brands</span> Creating Memories
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Join leading brands creating meaningful memory experiences that customers never forget
          </p>
          
          <div className="flex justify-center items-center mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {/* Placeholder brand logos - would be replaced with actual partner logos */}
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="text-2xl text-muted-foreground font-medium">Brand 1</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="text-2xl text-muted-foreground font-medium">Brand 2</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="text-2xl text-muted-foreground font-medium">Brand 3</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="text-2xl text-muted-foreground font-medium">Brand 4</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate("/why-partner-with-us")}
              className="text-lg px-8 py-6"
              size="lg"
            >
              Partner Your Brand With Us
            </Button>
            <p className="mt-4 text-muted-foreground">
              Create memory experiences that customers will cherish forever
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            Imprints That <span className="text-gradient">Connect</span> Hearts
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            See how people are creating meaningful emotional connections through shared memories
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-muted/30 p-6 rounded-lg">
                <div className="flex items-center mb-4">
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
                <p className="text-foreground italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-hero py-20 relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/6bb7a26a-c3b2-45cd-8e68-b0f2a36872e3.png')] bg-contain bg-center opacity-10 mix-blend-soft-light"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <img 
            src="/lovable-uploads/4fee875d-fccc-4054-b0cb-81fc66458a43.png" 
            alt="Imprintr Logo" 
            className="h-20 w-auto mb-6 mx-auto"
          />
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Ready to Leave Your Mark?
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
            Join the movement where memories become meaningful, moments become badges,<br />
            and your story becomes an immortal legacy on the blockchain.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <Button
              onClick={handleGetStarted}
              className="text-lg px-12 py-6 bg-white text-primary hover:bg-white/95 rounded-3xl font-black shadow-floating hover:shadow-coral transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              🌟 Start Your Memory Passport
            </Button>
            <Button
              onClick={() => navigate("/challenges")}
              variant="outline"
              className="text-lg px-12 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-3xl backdrop-blur-md font-black shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              🎮 Explore Life Challenges
            </Button>
          </div>

          {/* Web3 Technology Footer */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-6 font-medium">Powered by cutting-edge Web3 technology</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-white font-bold text-lg">⚡ Aptos</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-white font-bold text-lg">🔷 Base</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-white font-bold text-lg">🎯 NFT</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-white font-bold text-lg">🌐 Web3</span>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-6">Your badges live forever on the blockchain — truly owned by you.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
