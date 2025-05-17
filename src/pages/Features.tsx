
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold mb-6">Imprintr Features</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover all the ways Imprintr helps you preserve, organize, and share your most meaningful memories.
          </p>
        </div>

        {/* Feature Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 border-b">
          <div>
            <h2 className="text-3xl font-display font-semibold mb-4">Digital Memory Passport</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Your personal Memory Passport is the digital representation of your life journey, featuring your most meaningful moments, badges, and connections.
            </p>
            <ul className="space-y-3">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Showcase your Memory Badges and achievements</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Feature your most significant life moments</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Display testimonials from those you've impacted</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Visualize your memories through interactive boards</span>
              </li>
            </ul>
          </div>
          <div className="bg-muted/50 rounded-lg overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3"
              alt="Digital Memory Passport"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Feature Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 border-b md:flex-row-reverse">
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-display font-semibold mb-4">Memory Creation & Organization</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Capture and organize your memories in ways that are meaningful to you, with options for categorization, emotional tagging, and privacy controls.
            </p>
            <ul className="space-y-3">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-memory-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Upload photos and write or record stories</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-memory-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Organize memories into customized folders</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-memory-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Tag with emotional categories like Grief, Growth, Family</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-memory-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Set privacy controls (Public, Private, Family-only)</span>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-1 bg-muted/50 rounded-lg overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3"
              alt="Memory Creation"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Feature Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 border-b">
          <div>
            <h2 className="text-3xl font-display font-semibold mb-4">Memory Badges & Challenges</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Earn badges through real-life experiences and participate in memory challenges to document meaningful aspects of your journey.
            </p>
            <ul className="space-y-3">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-warmth-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Collect badges representing life milestones and experiences</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-warmth-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Track progress on incomplete badge journeys</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-warmth-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Join challenges to create focused memory collections</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-warmth-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Participate in community memory challenges</span>
              </li>
            </ul>
          </div>
          <div className="bg-muted/50 rounded-lg overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3"
              alt="Memory Badges"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Feature Section 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 border-b md:flex-row-reverse">
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-display font-semibold mb-4">Relational Connections</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Connect memories to relationships and people, creating a web of shared experiences and emotional legacies.
            </p>
            <ul className="space-y-3">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Tag relationships in memories ("daughter of," "mentored by")</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Leave testimonials for others as "Imprints I've Made"</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Receive "Imprints That Moved Me" from others</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-imprint-600 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span>Create family memory collections with shared access</span>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-1 bg-muted/50 rounded-lg overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3"
              alt="Relational Connections"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-display font-semibold mb-4">Ready to Preserve Your Meaningful Memories?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Start creating your digital memory sanctuary today and ensure your most meaningful moments live forever.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Start Your Imprints Now</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More About Imprintr
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Features;
