
import { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateFile } from "@/lib/security";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const ImageUpload = ({ imageUrl, setImageUrl }: ImageUploadProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file security
      const validation = validateFile(file);
      if (!validation.valid) {
        toast({
          title: "Invalid File",
          description: validation.error,
          variant: "destructive",
        });
        e.target.value = ''; // Clear the input
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
  );
};
