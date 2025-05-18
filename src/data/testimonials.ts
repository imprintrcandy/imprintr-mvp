
export interface Testimonial {
  name: string;
  relationship: string;
  content: string;
  avatarUrl: string;
}

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Johnson",
    relationship: "Friend",
    content: "I've known Jane for over 15 years, and she's always been the one who remembers every detail of our adventures together. Her kindness and thoughtful nature have made a lasting imprint on my life.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
  },
  {
    name: "Michael Chen",
    relationship: "Colleague",
    content: "Working with Jane transformed my professional life. Her mentorship and guidance helped me navigate difficult career decisions with confidence and purpose.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
  },
  {
    name: "Emma Rodriguez",
    relationship: "Sister",
    content: "My sister has always been my rock. Through every up and down, she's been there with unconditional support and love that I cherish deeply.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3"
  },
  {
    name: "Robert Taylor",
    relationship: "Father",
    content: "Jane, your courage during difficult times has inspired our entire family. The way you've faced challenges has taught me more than you'll ever know.",
    avatarUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3"
  },
  {
    name: "Olivia Parker",
    relationship: "Friend",
    content: "That road trip we took through the mountains changed something in me. Your perspective on life and ability to find beauty everywhere is contagious.",
    avatarUrl: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3"
  },
  {
    name: "Daniel Washington",
    relationship: "Mentor",
    content: "Watching you grow from a tentative intern to a confident professional has been one of the highlights of my career. Your dedication continues to inspire me.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
  }
];
