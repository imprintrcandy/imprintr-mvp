
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PrivacySettingsProps {
  privacy: "public" | "private" | "family";
  setPrivacy: React.Dispatch<React.SetStateAction<"public" | "private" | "family">>;
}

export const PrivacySettings = ({ privacy, setPrivacy }: PrivacySettingsProps) => {
  return (
    <div className="space-y-2">
      <Label>Privacy Setting</Label>
      <RadioGroup
        value={privacy}
        onValueChange={(value) => setPrivacy(value as "public" | "private" | "family")}
        className="flex flex-col space-y-3"
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private" className="font-normal cursor-pointer">
            🔒 Private (Only you can see)
          </Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="family" id="family" />
          <Label htmlFor="family" className="font-normal cursor-pointer">
            👪 Family Only
          </Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="public" id="public" />
          <Label htmlFor="public" className="font-normal cursor-pointer">
            🌎 Public (Anyone can see)
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
