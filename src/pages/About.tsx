
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
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">About The Founder</h2>
            <div className="bg-muted/30 p-6 rounded-lg my-6 border border-border">
              <div className="italic text-muted-foreground mb-4">
                "I created Imprintr because I was terrified of being forgotten — and heartbroken by the memories I'd already lost. 
                After grief, regret, and years of hiding, I realized: we don't just need a photo app. We need a sanctuary.
              </div>
              
              <div className="italic text-muted-foreground mb-4">
                Imprintr is that sanctuary — a platform where people can preserve stories that matter, earn memory badges from real-life moments, 
                and receive testimonials from the lives they've touched. It's a digital memory passport where legacy, not likes, leads the way.
              </div>
              
              <div className="italic text-muted-foreground mb-4">
                This isn't just a journaling tool. It's a movement to honor healing, family, milestones, and meaning — all in one sacred space.
              </div>
              
              <div className="italic text-muted-foreground">
                Because when we lose people… or parts of ourselves…<br />
                We still deserve a place where our imprints live forever."
              </div>
            </div>
            
            <h2 className="text-2xl font-display font-semibold mt-12 mb-4">The Story Behind Imprintr</h2>
            
            <div className="bg-[#F1F0FB] p-8 rounded-xl my-6 border border-[#9b87f5]/20 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FFDEE2]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#9b87f5]/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-[#7E69AB] mb-4">A Journey Born from Loss</h3>
                <p className="mb-6">
                  Imprintr was born from a deeply personal place. Our founder noticed how easily precious memories 
                  slip away over time – the details of cherished moments fading, the emotions dulling, and the 
                  significance diminishing. After losing a close family member, she realized how many stories were 
                  lost forever.
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-16 bg-gradient-to-b from-[#9b87f5] to-[#FFDEE2]"></div>
                  <p className="text-lg font-medium text-[#7E69AB] italic">
                    "Every time I tried to recall my grandmother's voice or her favorite stories, the memories seemed to grow dimmer. 
                    I realized that without a dedicated space to preserve these precious moments, they would eventually fade away completely."
                  </p>
                </div>
                
                <h3 className="text-xl font-medium text-[#7E69AB] mb-4">From Personal Project to Shared Mission</h3>
                <p className="mb-6">
                  What began as a personal project to record family stories transformed into a mission to help 
                  everyone preserve their most meaningful memories, achievements, and life lessons in a digital 
                  format that could be shared across generations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                    <div className="w-12 h-12 bg-[#9b87f5]/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#7E69AB] text-xl font-bold">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Recognition</h4>
                    <p className="text-sm text-muted-foreground">Acknowledging the importance of preserving meaningful life moments</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                    <div className="w-12 h-12 bg-[#9b87f5]/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#7E69AB] text-xl font-bold">2</span>
                    </div>
                    <h4 className="font-medium mb-2">Connection</h4>
                    <p className="text-sm text-muted-foreground">Creating a platform that fosters deeper human connections through shared stories</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                    <div className="w-12 h-12 bg-[#9b87f5]/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-[#7E69AB] text-xl font-bold">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Legacy</h4>
                    <p className="text-sm text-muted-foreground">Building a digital legacy that transcends generations and preserves what matters most</p>
                  </div>
                </div>
                
                <p>
                  Today, Imprintr stands as a testament to the power of personal stories and their ability to connect us 
                  across time and space, ensuring that the most meaningful parts of our lives are never forgotten.
                </p>
              </div>
            </div>
            
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
