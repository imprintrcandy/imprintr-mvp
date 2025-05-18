
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Imprint } from "./MemoryCard";
import { toast } from "@/components/ui/sonner";
import { BasicDetails } from "./form/BasicDetails";
import { ImageUpload } from "./form/ImageUpload";
import { FolderSelect } from "./form/FolderSelect";
import { TagsSection } from "./form/TagsSection";
import { RelationshipsSection } from "./form/RelationshipsSection";
import { PrivacySettings } from "./form/PrivacySettings";
import { EMOTIONAL_TAGS, RELATIONSHIP_TYPES } from "./form/constants";
import { ImprintFormProps } from "./form/types";

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
        <BasicDetails 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          location={location}
          setLocation={setLocation}
        />

        <ImageUpload 
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />

        <FolderSelect 
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          folders={folders}
        />

        <TagsSection 
          tags={tags}
          setTags={setTags}
          availableTags={EMOTIONAL_TAGS}
        />

        <RelationshipsSection 
          relationships={relationships}
          setRelationships={setRelationships}
          relationshipTypes={RELATIONSHIP_TYPES}
        />

        <PrivacySettings 
          privacy={privacy}
          setPrivacy={setPrivacy}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">
          Save Imprint
        </Button>
      </CardFooter>
    </Card>
  );
};
