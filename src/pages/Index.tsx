
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
      {/* Hero Section with new branding */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-[#1a1a2e]"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/6bb7a26a-c3b2-45cd-8e68-b0f2a36872e3.png')] bg-contain bg-center opacity-30 mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <img 
            src="/lovable-uploads/4fee875d-fccc-4054-b0cb-81fc66458a43.png" 
            alt="Imprintr Logo" 
            className="h-32 w-auto mb-6 animate-fade-in"
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
            <span className="text-gradient">Imprintr</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10 animate-fade-in font-medium">
            Where Imprints Live Forever
          </p>
          <div className="flex flex-col md:flex-row gap-4 animate-fade-in mt-8">
            <Button
              onClick={handleGetStarted}
              className="text-lg px-8 py-6"
              size="lg"
            >
              Start Your Imprint Journey
            </Button>
            <Button
              onClick={() => navigate("/features")}
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20"
              size="lg"
            >
              See How It Works
            </Button>
          </div>

          <div className="absolute bottom-10 w-full flex justify-center">
            <div className="animate-pulse-soft">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            Your Digital <span className="text-gradient">Memory Passport</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Build your story while you're living it — never lose a meaningful moment again
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-imprint-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-imprint-600"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Co-Create Stories</h3>
              <p className="text-muted-foreground">
                Invite friends and family to contribute their perspectives, making your memories richer and more meaningful
              </p>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-memory-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-memory-600"
                >
                  <path d="M12.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z" />
                  <path d="M13.5 2.06c4.65.47 8.44 4.26 8.91 8.91" />
                  <path d="M13.5 7.93a5.12 5.12 0 0 1 4.56 4.56" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Collect & Celebrate</h3>
              <p className="text-muted-foreground">
                Turn life's moments into badges and achievements that showcase your unique journey and milestones
              </p>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-warmth-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-warmth-600"
                >
                  <path d="M3 8c0-3.5 2.58-1.29 4-1 3 .62 4 1.5 4 6 0 .5 0 4-4 5H7c-4 0-4-5-4-7Z" />
                  <path d="M13 6.5c1-1 2.58-1.29 4-1 3 .62 4 1.5 4 6 0 .5 0 4-4 5H7" />
                  <path d="M13 18v3" />
                  <path d="M17.8 18c.2 0 .5-.2.7-.4.2-.2.3-.4.3-.7.1-.3 0-.5-.1-.7-.2-.2-.4-.4-.7-.5-.3-.1-.6 0-.8.1-.3.3.5.5.6.2.1.4.2.7.2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Move Hearts</h3>
              <p className="text-muted-foreground">
                Give and receive imprints that create emotional connections and meaningful legacy threads across generations
              </p>
            </div>
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

      {/* CTA Section */}
      <section className="bg-[#1a1a2e] py-16 relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/6bb7a26a-c3b2-45cd-8e68-b0f2a36872e3.png')] bg-contain bg-center opacity-20 mix-blend-soft-light"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <img 
            src="/lovable-uploads/4fee875d-fccc-4054-b0cb-81fc66458a43.png" 
            alt="Imprintr Logo" 
            className="h-16 w-auto mb-6 mx-auto"
          />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            Imprintr
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 font-medium">
            Where Imprints Live Forever
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 bg-white hover:bg-white/90 text-imprint-600"
              size="lg"
            >
              Create Your Memory Passport
            </Button>
            <Button
              onClick={() => navigate("/challenges")}
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white/10"
              size="lg"
            >
              Explore Challenges
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
