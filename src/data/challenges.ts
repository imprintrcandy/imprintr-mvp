
import { Challenge } from "@/components/challenge/ChallengeCard";

export const CHALLENGES: Challenge[] = [
  {
    id: "challenge-1",
    title: "30 Days of Gratitude",
    description: "Document one thing you're grateful for each day for 30 days.",
    category: "imprints",
    progress: 15,
    target: 30,
    status: "in-progress",
    participants: 128,
    badgeId: "badge-gratitude"
  },
  {
    id: "challenge-2",
    title: "Family Photo Archive",
    description: "Digitize and document 50 family photos with stories.",
    category: "photos",
    progress: 3,
    target: 50,
    status: "in-progress",
    participants: 74,
    badgeId: "badge-family"
  },
  {
    id: "challenge-3",
    title: "First Imprint Challenge",
    description: "Create your first 5 imprints with photos and stories.",
    category: "imprints",
    progress: 5,
    target: 5,
    status: "completed",
    participants: 543,
    badgeId: "badge-firststeps"
  },
  {
    id: "challenge-4",
    title: "Travel Memories",
    description: "Document imprints from 3 different countries you've visited.",
    category: "imprints",
    progress: 0,
    target: 3,
    status: "not-started",
    participants: 89,
    badgeId: "badge-3"
  },
  {
    id: "challenge-5",
    title: "Childhood Reflection",
    description: "Create 10 imprints about your most formative childhood experiences.",
    category: "imprints",
    progress: 0,
    target: 10,
    status: "not-started",
    participants: 156,
    badgeId: "badge-childhood"
  },
  {
    id: "challenge-6",
    title: "Legacy Letters",
    description: "Write 5 legacy letters to future generations of your family.",
    category: "imprints",
    progress: 1,
    target: 5,
    status: "in-progress",
    deadline: "2025-12-31",
    participants: 42,
    badgeId: "badge-legacy"
  }
];
