
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
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-memory"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
            Where imprints live forever
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10 animate-fade-in">
            Create a digital sanctuary for your most meaningful imprints, stories, and life experiences
          </p>
          <Button
            onClick={handleGetStarted}
            className="text-lg px-8 py-6 animate-fade-in"
            size="lg"
          >
            Start Your Imprints Now
          </Button>

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
            Your Digital Imprint <span className="text-gradient">Passport</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Preserve and organize your most meaningful life moments in one beautiful place
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
              <h3 className="text-xl font-display font-semibold mb-2">Capture Stories</h3>
              <p className="text-muted-foreground">
                Write or record meaningful stories and attach photos to preserve your most precious imprints
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
              <h3 className="text-xl font-display font-semibold mb-2">Earn Imprint Badges</h3>
              <p className="text-muted-foreground">
                Collect badges that represent meaningful moments and experiences in your life's journey
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
                  <path d="M3 8c0-3.5 2.5-6 6.5-6 4 0 4.5 3 4.5 5 0 2 0 3 4 8H7c-4 0-4-5-4-7Z" />
                  <path d="M13 6.5c1-1 2.58-1.29 4-1 3 .62 4 1.5 4 6 0 .5 0 4-4 5H7" />
                  <path d="M13 18v3" />
                  <path d="M17.8 18c.2 0 .5-.2.7-.4.2-.2.3-.4.3-.7.1-.3 0-.5-.1-.7-.2-.2-.4-.4-.7-.5-.3-.1-.6 0-.8.1-.3.1-.5.3-.6.6-.1.2-.1.5 0 .8.1.3.3.5.5.6.2.1.4.2.7.2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Share Your Legacy</h3>
              <p className="text-muted-foreground">
                Connect with loved ones by sharing your imprints and creating a lasting emotional legacy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Badge Showcase Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            Collect Imprint <span className="text-gradient">Badges</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Earn badges through real-life experiences and showcase them on your digital passport
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

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            Imprints That <span className="text-gradient">Moved</span> Others
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            See how Imprintr helps people preserve and share their most meaningful imprints
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
      <section className="bg-gradient-memory py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Start Preserving Your Meaningful Imprints
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join Imprintr today and create your digital sanctuary of imprints that last forever
          </p>
          <Button
            onClick={handleGetStarted}
            className="text-lg px-8 py-6 bg-white hover:bg-white/90 text-imprint-600"
            size="lg"
          >
            Start Your Imprints Now
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
