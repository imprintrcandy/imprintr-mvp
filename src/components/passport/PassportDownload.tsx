
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Imprint } from "@/components/memory/MemoryCard";
import { Badge } from "@/components/badge/BadgeCard";
import { Challenge } from "@/components/challenge/ChallengeCard";
import { Testimonial } from "@/data/testimonials";
import { toast } from "@/components/ui/sonner";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PassportDownloadProps {
  name: string;
  bio: string;
  avatarUrl: string;
  location: string;
  imprints: Imprint[];
  badges: Badge[];
  challenges: Challenge[];
  testimonials: Testimonial[];
}

export const PassportDownload = ({
  name,
  bio,
  avatarUrl,
  location,
  imprints,
  badges,
  challenges,
  testimonials,
}: PassportDownloadProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassportPDF = async () => {
    try {
      setIsGenerating(true);
      toast.info("Preparing your Imprintr Passport™...");
      
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Capture the current passport content as an image
      const passportElement = document.getElementById("passport-content");
      if (!passportElement) {
        throw new Error("Passport content element not found");
      }
      
      // Title page
      pdf.setFontSize(24);
      pdf.setTextColor(51, 51, 51);
      pdf.text("Imprintr Passport™", 105, 40, { align: "center" });
      
      pdf.setFontSize(18);
      pdf.text(name, 105, 60, { align: "center" });
      
      // Try to add profile image if available
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = avatarUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        pdf.addImage(img, "JPEG", 75, 70, 60, 60);
      } catch (err) {
        console.error("Failed to load profile image", err);
      }
      
      // Add bio
      pdf.setFontSize(12);
      pdf.text("About", 20, 150);
      
      const bioLines = pdf.splitTextToSize(bio, 170);
      pdf.text(bioLines, 20, 160);
      
      // Add location
      pdf.text(`Location: ${location}`, 20, 180);
      
      // Date generated
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 190);
      
      // Memory summary
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.text("Your Imprints", 105, 20, { align: "center" });
      
      // Summary stats
      pdf.setFontSize(12);
      pdf.text(`Total Imprints: ${imprints.length}`, 20, 40);
      pdf.text(`Badges Earned: ${badges.filter(b => b.achieved).length}`, 20, 50);
      pdf.text(`Active Challenges: ${challenges.filter(c => c.status === "in-progress").length}`, 20, 60);
      pdf.text(`Completed Challenges: ${challenges.filter(c => c.status === "completed").length}`, 20, 70);
      
      // List imprints
      pdf.setFontSize(14);
      pdf.text("Your Memory Collection", 20, 90);
      
      let yPosition = 100;
      imprints.slice(0, 10).forEach((imprint, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(12);
        pdf.text(`${index + 1}. ${imprint.title}`, 20, yPosition);
        pdf.setFontSize(10);
        pdf.text(`${imprint.date} - ${imprint.location || "No location"}`, 30, yPosition + 5);
        pdf.text(`Tags: ${imprint.tags.join(", ")}`, 30, yPosition + 10);
        
        yPosition += 20;
      });
      
      // Badges page
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.text("Your Badges", 105, 20, { align: "center" });
      
      yPosition = 40;
      badges.filter(b => b.achieved).forEach((badge, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(12);
        pdf.text(`${index + 1}. ${badge.name}`, 20, yPosition);
        pdf.setFontSize(10);
        pdf.text(`${badge.description}`, 30, yPosition + 5);
        
        yPosition += 15;
      });
      
      // Testimonials page
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.text("Imprints That Moved Me", 105, 20, { align: "center" });
      
      yPosition = 40;
      testimonials.forEach((testimonial, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(12);
        pdf.text(`From: ${testimonial.name} (${testimonial.relationship})`, 20, yPosition);
        
        pdf.setFontSize(10);
        const testimonialLines = pdf.splitTextToSize(testimonial.content, 170);
        pdf.text(testimonialLines, 20, yPosition + 10);
        
        yPosition += 10 + testimonialLines.length * 5 + 10;
      });
      
      // Legacy page
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.text("What I Want To Be Remembered For", 105, 20, { align: "center" });
      
      pdf.setFontSize(12);
      const legacyMessage = localStorage.getItem("userLegacyMessage") || 
        "This space is for capturing your thoughts about your legacy and how you wish to be remembered by future generations. Click edit on your profile to add your legacy message.";
      
      const legacyLines = pdf.splitTextToSize(legacyMessage, 170);
      pdf.text(legacyLines, 20, 40);
      
      // Save the PDF
      pdf.save(`${name.replace(/\s+/g, "_")}_Imprintr_Passport.pdf`);
      
      toast.success("Passport successfully downloaded!");
    } catch (error) {
      console.error("Error generating passport:", error);
      toast.error("There was a problem generating your passport. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <Button 
        onClick={generatePassportPDF}
        disabled={isGenerating}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        {isGenerating ? "Generating Passport..." : "Download Imprintr Passport™"}
      </Button>
    </div>
  );
};
