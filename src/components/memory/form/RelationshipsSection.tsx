
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RelationshipsSectionProps {
  relationships: string[];
  setRelationships: React.Dispatch<React.SetStateAction<string[]>>;
  relationshipTypes: string[];
}

export const RelationshipsSection = ({ relationships, setRelationships, relationshipTypes }: RelationshipsSectionProps) => {
  const [relationshipName, setRelationshipName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");

  const addRelationship = () => {
    if (relationshipName && relationshipType) {
      const relationship = `${relationshipType} ${relationshipName}`;
      if (!relationships.includes(relationship)) {
        setRelationships([...relationships, relationship]);
        setRelationshipName("");
        setRelationshipType("");
      }
    }
  };

  const removeRelationship = (relationshipToRemove: string) => {
    setRelationships(relationships.filter((rel) => rel !== relationshipToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Relationship Tags (Optional)</Label>
        <div className="flex items-center space-x-2">
          <Select value={relationshipType} onValueChange={setRelationshipType}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Relationship type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {relationshipTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            value={relationshipName}
            onChange={(e) => setRelationshipName(e.target.value)}
            placeholder="Name"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={addRelationship}
            disabled={!relationshipType || !relationshipName}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {relationships.map((relationship) => (
            <Badge key={relationship} variant="outline" className="py-1">
              {relationship}
              <button
                type="button"
                onClick={() => removeRelationship(relationship)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
