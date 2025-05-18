
import { Imprint } from "../MemoryCard";

export interface ImprintFormProps {
  onSave: (imprint: Imprint) => void;
  folders?: string[];
}
