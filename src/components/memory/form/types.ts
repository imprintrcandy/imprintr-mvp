
import { Imprint } from "../MemoryCard";

export interface ImprintFormProps {
  onSave: (imprint: Imprint) => void;
  folders?: string[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  legacyMessage?: string;
  dateOfBirth?: string;
  profileVisibility: "public" | "private" | "family";
}
