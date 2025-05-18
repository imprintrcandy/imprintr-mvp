
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-6">About Imprintr</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              A joyful digital passport where your life's most meaningful moments become 
              living imprints - celebrated, shared, and brought to life.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">Our Purpose</h2>
            <p>
              Imprintr exists to transform how we capture and share life's meaningful moments. 
              We believe memories aren't meant to be stored away - they should be <strong>celebrated</strong>, 
              <strong>shared</strong>, and <strong>brought to life</strong> through connection.
            </p>
            
            <div className="my-10 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-medium mb-3 text-center">Our Vision</h3>
              <p className="text-lg italic text-center">
                "A world where no meaningful moment goes uncelebrated, and every life story 
                becomes a rich tapestry of shared experiences and emotional connections."
              </p>
            </div>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">The Story Behind Imprintr</h2>
            <p>
              Imprintr began when our founder realized how we often wait until someone is gone to celebrate 
              their impact on our lives. Why not create those beautiful tapestries of memories, tributes, and 
              connections while we're all here to enjoy them together?
            </p>
            <p className="mt-4">
              What started as a project to create "living tributes" evolved into a dynamic platform where people 
              can build their story while they're living it - earning badges for experiences, participating in 
              memory challenges, and weaving meaningful connections with loved ones.
            </p>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">How Imprintr Brings Memories to Life</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Memory Gamification</h3>
                <p>
                  Turn life experiences into badges and achievements that showcase your unique journey. 
                  Complete memory challenges that inspire meaningful reflection and connection.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Co-Created Stories</h3>
                <p>
                  Invite friends and family to contribute their perspectives, making your memories 
                  richer and creating a social tapestry woven with love and shared experiences.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Memory Mapping</h3>
                <p>
                  See your life story unfold across a world map. Tag memories by person, place, and theme 
                  to discover patterns and connections in your journey.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Legacy Threads</h3>
                <p>
                  Create time-capsule messages, gather testimonials, and build meaningful legacy threads 
                  that connect across generations and preserve what matters most.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-medium mb-2">Joy & Celebration</h3>
                <p className="text-muted-foreground">
                  We believe memories should be celebrated with joy, not just preserved with solemnity. Every moment captured is a celebration of life.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Meaningful Connection</h3>
                <p className="text-muted-foreground">
                  We're passionate about creating emotional bonds through shared memories and collaborative storytelling.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Living Legacy</h3>
                <p className="text-muted-foreground">
                  We're committed to helping you build your legacy while you're living it - not just leaving it behind.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Discovery & Growth</h3>
                <p className="text-muted-foreground">
                  We believe in the power of reflection to reveal patterns, insights, and growth opportunities in our life stories.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">Join Our Community</h2>
            <p className="mb-8">
              Imprintr is more than a platform - it's a community of people who believe in celebrating life's meaningful moments and creating emotional connections through shared memories. 
              We invite you to join us in building a world where memories come alive through joyful sharing and meaningful connection.
            </p>
            
            <div className="flex justify-center mt-10">
              <Button 
                onClick={() => navigate("/signup")} 
                size="lg" 
                className="px-8 py-6"
              >
                Start Your Memory Passport
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
