
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TagsSectionProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  availableTags: string[];
}

export const TagsSection = ({ tags, setTags, availableTags }: TagsSectionProps) => {
  const [selectedTag, setSelectedTag] = useState("");

  const addTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Emotional Tags</Label>
        <div className="flex items-center space-x-2">
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select emotional tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableTags.filter((tag) => !tags.includes(tag)).map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="button" onClick={addTag} disabled={!selectedTag}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="py-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
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
