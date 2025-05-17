
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Imprint } from "./MemoryCard";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

const EMOTIONAL_TAGS = [
  "Joy", "Growth", "Grief", "Family", "Gratitude", "Love",
  "Hope", "Reflection", "Celebration", "Friendship", "Challenge", "Self-love"
];

const RELATIONSHIP_TYPES = [
  "parent of", "child of", "sibling of", "friend of", 
  "mentored by", "mentor to", "partner of", "colleague of"
];

interface ImprintFormProps {
  onSave: (imprint: Imprint) => void;
  folders?: string[];
}

export const ImprintForm = ({ onSave, folders = ["Family", "Self-love", "Grief", "Travel", "Growth"] }: ImprintFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "family">("private");
  const [location, setLocation] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [relationships, setRelationships] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [relationshipName, setRelationshipName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

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

  const handleSave = () => {
    if (!title) {
      toast.error("Please enter a title for your imprint.");
      return;
    }
    
    if (!date) {
      toast.error("Please select a date for your imprint.");
      return;
    }

    if (!imageUrl) {
      toast.error("Please upload an image for your imprint.");
      return;
    }

    const newImprint: Imprint = {
      id: Date.now().toString(),
      title,
      description,
      date,
      imageUrl,
      privacy,
      location,
      tags: selectedFolder ? [...tags, selectedFolder] : tags,
      relationships,
    };

    onSave(newImprint);
    toast.success("Imprint saved successfully!");
    
    // Reset form
    setTitle("");
    setDescription("");
    setDate("");
    setImageUrl("");
    setPrivacy("private");
    setLocation("");
    setSelectedFolder("");
    setTags([]);
    setRelationships([]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Imprint</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this imprint"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share the story behind this imprint..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where did this happen?"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <div className="flex items-center space-x-4">
            {imageUrl ? (
              <div className="relative h-24 w-24 rounded-md overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Imprint preview"
                  className="h-full w-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                  onClick={() => setImageUrl("")}
                >
                  ✕
                </Button>
              </div>
            ) : (
              <div className="h-24 w-24 border-2 border-dashed border-muted-foreground/50 rounded-md flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="max-w-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Organize in Folder (Optional)</Label>
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger>
              <SelectValue placeholder="Select a folder" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {folders.map((folder) => (
                  <SelectItem key={folder} value={folder}>
                    {folder}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

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
                    {EMOTIONAL_TAGS.filter((tag) => !tags.includes(tag)).map((tag) => (
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
                    {RELATIONSHIP_TYPES.map((type) => (
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">
          Save Imprint
        </Button>
      </CardFooter>
    </Card>
  );
};
