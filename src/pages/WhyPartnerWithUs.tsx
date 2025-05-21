
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandshakeIcon, BadgeIcon, StarIcon, UsersIcon, LinkIcon, MessageSquareIcon, CheckIcon } from "lucide-react";

const WhyPartnerWithUs = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-imprint-50 to-memory-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 py-1.5 text-imprint-600 border-imprint-200 bg-imprint-50">
            For Brands & Businesses
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Why Brands <span className="text-gradient">Partner with Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Create lasting connections through meaningful experiences that customers remember forever
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate("/brand/signup")}
              size="lg"
              className="text-lg px-8 py-6"
            >
              Apply as a Partner Brand
            </Button>
            <Button
              onClick={() => navigate("/brand/login")}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              Sign In to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
            Our <span className="text-gradient">Mission</span>
          </h2>
          <div className="bg-muted/30 rounded-xl p-8 text-center">
            <p className="text-xl md:text-2xl italic font-medium leading-relaxed">
              "Imprintr helps people preserve memories that matter. By partnering with brands, we create life-changing 
              memory experiences rooted in emotion, community, and meaning."
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-warmth-100 rounded-full flex items-center justify-center">
                <HandshakeIcon className="text-warmth-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emotional Connections</h3>
              <p className="text-muted-foreground">
                Build authentic relationships with customers through shared experiences
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-imprint-100 rounded-full flex items-center justify-center">
                <BadgeIcon className="text-imprint-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meaningful Engagement</h3>
              <p className="text-muted-foreground">
                Create brand interactions that stand out and stay in people's memories
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-memory-100 rounded-full flex items-center justify-center">
                <StarIcon className="text-memory-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Legacy Building</h3>
              <p className="text-muted-foreground">
                Become part of people's life stories and cherished memories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's In It for Brands Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            What's In It for <span className="text-gradient">Brands</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Imprintr offers brands a unique way to connect with customers through meaningful experiences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <BadgeIcon className="h-10 w-10 text-imprint-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Co-branded Memory Badges</h3>
              <p className="text-muted-foreground mb-4">
                Create exclusive badges that users earn through interactions with your brand
              </p>
              <div className="bg-muted/30 p-4 rounded-md text-sm italic">
                <span className="font-medium">Example:</span> Stay at Amanpulo → Earn 'Island Serenity' badge
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <LinkIcon className="h-10 w-10 text-imprint-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Featured Brand Stories</h3>
              <p className="text-muted-foreground mb-4">
                Get highlighted on our Brand Stories page, showcasing your brand's connection to meaningful experiences
              </p>
              <div className="bg-muted/30 p-4 rounded-md text-sm italic">
                <span className="font-medium">Benefit:</span> Increased visibility within a community of memory-makers
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <MessageSquareIcon className="h-10 w-10 text-imprint-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Emotional Brand Recall</h3>
              <p className="text-muted-foreground mb-4">
                Create stronger brand recall through purposeful storytelling and emotional connections
              </p>
              <div className="bg-muted/30 p-4 rounded-md text-sm italic">
                <span className="font-medium">Outcome:</span> Customers remember your brand because of how you made them feel
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <UsersIcon className="h-10 w-10 text-imprint-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gamified User Engagement</h3>
              <p className="text-muted-foreground mb-4">
                Boost brand loyalty through challenges that turn brand interactions into collectable memories
              </p>
              <div className="bg-muted/30 p-4 rounded-md text-sm italic">
                <span className="font-medium">Result:</span> Increased repeat visits and stronger customer relationships
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <CheckIcon className="h-10 w-10 text-imprint-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ethical Data Insights</h3>
              <p className="text-muted-foreground mb-4">
                Gain valuable insights on emotional triggers tied to user memories with your brand
              </p>
              <div className="bg-muted/30 p-4 rounded-md text-sm italic">
                <span className="font-medium">Promise:</span> All data is ethically collected with user consent
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <StarIcon className="h-10 w-10 text-imprint-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Differentiated Positioning</h3>
              <p className="text-muted-foreground mb-4">
                Stand out from competitors by associating your brand with meaningful life moments
              </p>
              <div className="bg-muted/30 p-4 rounded-md text-sm italic">
                <span className="font-medium">Advantage:</span> Deeper customer connections beyond transactional relationships
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            A simple process to create memorable experiences for your customers
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-imprint-100 text-imprint-600 flex items-center justify-center text-4xl font-bold">1</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3">Submit a Challenge</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Create an experience tied to your brand that resonates with your values and audience
                  </p>
                  <div className="bg-muted/30 p-4 rounded-md italic">
                    Example: "Donate to a rescue shelter → Earn 'Hero of the Strays' badge"
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-memory-100 text-memory-600 flex items-center justify-center text-4xl font-bold">2</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3">We Design the Experience</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Our team develops a custom badge, memory prompt, and brand integration
                  </p>
                  <div className="bg-muted/30 p-4 rounded-md italic">
                    Our designers create assets that resonate with both your brand identity and our platform's memory-focused approach
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-warmth-100 text-warmth-600 flex items-center justify-center text-4xl font-bold">3</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3">Users Engage & Memories Form</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Users engage with your brand, complete challenges, and create lasting memories
                  </p>
                  <div className="bg-muted/30 p-4 rounded-md italic">
                    Users engage. Memories get made. Brands get remembered.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Purpose Section */}
      <section className="py-16 bg-gradient-to-br from-imprint-400/90 via-imprint-500/80 to-memory-500/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Partner With Purpose
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            "We only work with brands who care about legacy, impact, and real human connection. 
            If your brand stands for something bigger — we want to make memories with you."
          </p>
          <Button
            onClick={() => navigate("/brand/signup")}
            size="lg"
            className="text-lg px-8 py-6 bg-white text-imprint-600 hover:bg-white/90"
          >
            Apply as a Partner Brand
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default WhyPartnerWithUs;
