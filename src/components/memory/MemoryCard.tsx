
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Imprint {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  tags: string[];
  privacy: "public" | "private" | "family";
  location?: string;
  relationships?: string[];
}

interface ImprintCardProps {
  imprint: Imprint;
  className?: string;
}

export const ImprintCard = ({ imprint, className }: ImprintCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const privacyIndicator = {
    public: { icon: "🌎", label: "Public" },
    private: { icon: "🔒", label: "Private" },
    family: { icon: "👪", label: "Family Only" },
  };

  const { icon, label } = privacyIndicator[imprint.privacy];

  return (
    <Card
      className={cn(
        "imprint-card overflow-hidden h-full",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imprint.imageUrl}
          alt={imprint.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-105"
          )}
        />
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <Badge variant="secondary" className="bg-background/80 hover:bg-background/90 text-xs">
            <span className="mr-1">{icon}</span>
            {label}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="text-lg font-semibold line-clamp-1">{imprint.title}</h3>
        <p className="text-sm text-muted-foreground">{new Date(imprint.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm line-clamp-2">{imprint.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {imprint.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="bg-muted/50 text-xs">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};
