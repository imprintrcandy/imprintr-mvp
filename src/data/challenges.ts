
import { Challenge } from "@/components/challenge/ChallengeCard";

export const CHALLENGES: Challenge[] = [
  {
    id: "challenge-1",
    title: "30 Days of Gratitude",
    description: "Document one thing you're grateful for each day for 30 days in Metro Manila.",
    category: "imprints",
    progress: 15,
    target: 30,
    status: "in-progress",
    participants: 128,
    badgeId: "badge-gratitude",
    location: "NCR"
  },
  {
    id: "challenge-2",
    title: "Family Photo Archive",
    description: "Digitize and document 50 family photos with stories from Cebu City.",
    category: "photos",
    progress: 3,
    target: 50,
    status: "in-progress",
    participants: 74,
    badgeId: "badge-family",
    location: "Central Visayas"
  },
  {
    id: "challenge-3",
    title: "First Imprint Challenge",
    description: "Create your first 5 imprints with photos and stories in Makati.",
    category: "imprints",
    progress: 5,
    target: 5,
    status: "completed",
    participants: 543,
    badgeId: "badge-firststeps",
    location: "NCR"
  },
  {
    id: "challenge-4",
    title: "Travel Memories",
    description: "Document imprints from 3 different countries you've visited, starting from Bohol.",
    category: "imprints",
    progress: 0,
    target: 3,
    status: "not-started",
    participants: 89,
    badgeId: "badge-3",
    location: "Central Visayas"
  },
  {
    id: "challenge-5",
    title: "Childhood Reflection",
    description: "Create 10 imprints about your most formative childhood experiences in Davao City.",
    category: "imprints",
    progress: 0,
    target: 10,
    status: "not-started",
    participants: 156,
    badgeId: "badge-childhood",
    location: "Davao Region"
  },
  {
    id: "challenge-6",
    title: "Legacy Letters",
    description: "Write 5 legacy letters to future generations of your family from Zamboanga.",
    category: "imprints",
    progress: 1,
    target: 5,
    status: "in-progress",
    deadline: "2025-12-31",
    participants: 42,
    badgeId: "badge-legacy",
    location: "Zamboanga Peninsula"
  },
  {
    id: "challenge-7",
    title: "Baguio Heritage Walk",
    description: "Document 15 heritage sites and local stories in Baguio City.",
    category: "imprints",
    progress: 0,
    target: 15,
    status: "not-started",
    participants: 67,
    badgeId: "badge-heritage",
    location: "CAR"
  },
  {
    id: "challenge-8",
    title: "Iloilo Food Journey",
    description: "Create imprints of traditional Ilonggo dishes and their family recipes.",
    category: "imprints",
    progress: 2,
    target: 10,
    status: "in-progress",
    participants: 34,
    badgeId: "badge-food",
    location: "Western Visayas"
  }
];
