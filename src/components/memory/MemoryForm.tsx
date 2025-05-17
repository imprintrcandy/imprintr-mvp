import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Memory } from "./MemoryCard";

interface MemoryFormProps {
  onSave: (memory: Memory) => void;
}

export const MemoryForm = ({ onSave }: MemoryFormProps) => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");
  const [emotions, setEmotions] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMemory: Memory = {
      id: Date.now().toString(),
      title,
      story,
      date,
      location,
      people,
      emotions,
      photos,
    };

    onSave(newMemory);

    // Clear the form
    setTitle("");
    setStory("");
    setDate("");
    setLocation("");
    setPeople("");
    setEmotions("");
    setPhotos([]);
  };

  return (
    <Card className="w-full">
      <Tabs defaultValue="memory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="memory">Memory Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        <TabsContent value="memory">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter memory title"
                required
              />
            </div>
            <div>
              <Label htmlFor="story">Story</Label>
              <Textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Write your memory story"
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div>
              <Label htmlFor="people">People</Label>
              <Input
                type="text"
                id="people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="Enter people involved"
              />
            </div>
            <div>
              <Label htmlFor="emotions">Emotions</Label>
              <Input
                type="text"
                id="emotions"
                value={emotions}
                onChange={(e) => setEmotions(e.target.value)}
                placeholder="Enter emotions felt"
              />
            </div>

            <Button type="submit">Save Memory</Button>
          </form>
        </TabsContent>
        <TabsContent value="media">
          <div>
            <Label htmlFor="photos">Photos</Label>
            <Input
              type="file"
              id="photos"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  // For simplicity, we'll just store the file names
                  const photoNames = files.map((file) => file.name);
                  setPhotos(photoNames);
                }
              }}
            />
            {photos.length > 0 && (
              <div className="mt-2">
                <p>Selected Photos:</p>
                <div className="flex space-x-2">
                  {photos.map((photo, index) => (
                    <Badge key={index}>{photo}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
