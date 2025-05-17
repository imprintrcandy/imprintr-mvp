
import { MainLayout } from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-6">About Imprintr</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-8 text-muted-foreground">
              Imprintr is a digital sanctuary where meaningful moments live forever, 
              helping you preserve and share the stories that matter most.
            </p>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">Our Mission</h2>
            <p>
              We believe that every life contains countless meaningful moments that deserve to be preserved. 
              Our mission is to create a beautiful digital space where these memories can be captured, 
              organized, and shared with those who matter most to you.
            </p>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">The Story Behind Imprintr</h2>
            <p>
              Imprintr was born from a deeply personal place. Our founder noticed how easily precious memories 
              slip away over time – the details of cherished moments fading, the emotions dulling, and the 
              significance diminishing. After losing a close family member, she realized how many stories were 
              lost forever.
            </p>
            <p className="mt-4">
              What began as a personal project to record family stories transformed into a mission to help 
              everyone preserve their most meaningful memories, achievements, and life lessons in a digital 
              format that could be shared across generations.
            </p>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">How Imprintr Works</h2>
            <p>
              Imprintr offers a beautiful, intuitive platform where you can:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Capture memories through photos, written stories, or audio recordings</li>
              <li>Organize memories into customized folders based on themes, relationships, or time periods</li>
              <li>Tag memories with emotional categories that help you reflect on your journey</li>
              <li>Earn memory badges that celebrate and visualize your life experiences</li>
              <li>Create a Digital Memory Passport that showcases your unique life journey</li>
              <li>Connect with loved ones through shared memories and testimonials</li>
              <li>Set privacy controls to determine who can access different memories</li>
              <li>Participate in memory challenges to create more meaningful connections</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-medium mb-2">Authenticity</h3>
                <p className="text-muted-foreground">
                  We believe in capturing real moments and genuine emotions, not curated perfection.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Connection</h3>
                <p className="text-muted-foreground">
                  We're dedicated to strengthening bonds between people through shared memories and stories.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Legacy</h3>
                <p className="text-muted-foreground">
                  We're committed to helping you create a meaningful digital legacy that can be shared across generations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Healing</h3>
                <p className="text-muted-foreground">
                  We recognize that reflecting on and sharing memories can be a powerful tool for emotional healing and growth.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">Join Our Community</h2>
            <p className="mb-8">
              Imprintr is more than just a platform – it's a community of people who value meaningful connection and 
              personal storytelling. We invite you to join us in creating a world where no important memory is forgotten 
              and every life story is honored.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
