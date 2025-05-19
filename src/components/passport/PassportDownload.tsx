
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Imprint } from "@/components/memory/MemoryCard";
import { Badge } from "@/components/badge/BadgeCard";
import { Challenge } from "@/components/challenge/ChallengeCard";
import { Testimonial } from "@/data/testimonials";
import { toast } from "@/components/ui/sonner";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
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
      
      // Create a new PDF document with custom styling
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Define common colors for consistency
      const accentColor = [242, 225, 211]; // soft muted gold
      const primaryTextColor = [70, 70, 70]; // dark gray
      const secondaryTextColor = [120, 120, 120]; // medium gray
      const accentBlue = [211, 228, 253]; // soft blue
      
      // Helper function to add page headers and footers
      const addPageDecorations = (pageNum, totalPages = 5) => {
        // Add subtle page border
        pdf.setDrawColor(230, 230, 230);
        pdf.setLineWidth(0.5);
        pdf.rect(10, 10, 190, 277, 'S');
        
        // Add page numbers
        pdf.setFontSize(9);
        pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
        pdf.text(`Page ${pageNum} of ${totalPages}`, 105, 287, { align: 'center' });
        
        // Add subtle branding
        pdf.setFontSize(8);
        pdf.text('Imprintr™ Digital Legacy', 190, 287, { align: 'right' });
      };
      
      // Set a nicer font if available
      pdf.setFont("helvetica", "normal");
      
      // ----- PAGE 1: IDENTITY PAGE -----
      pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.rect(0, 0, 210, 10, 'F'); // Top accent bar
      
      // Page title
      pdf.setFontSize(26);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text("Imprintr Passport™", 105, 30, { align: "center" });
      
      // Decorative line
      pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.setLineWidth(1);
      pdf.line(70, 35, 140, 35);
      
      // Try to add profile image if available
      let imageHeight = 0;
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = avatarUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        // Left side: Profile photo
        pdf.addImage(img, "JPEG", 25, 55, 60, 60);
        imageHeight = 60;
        
        // Add circular mask effect with a border
        pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        pdf.setLineWidth(1);
        pdf.circle(55, 85, 31);
      } catch (err) {
        console.error("Failed to load profile image", err);
      }
      
      // Right side: Identity information
      pdf.setFontSize(22);
      pdf.text(name, 105, 65, { align: "left" });
      
      // Location with icon placeholder
      pdf.setFontSize(12);
      pdf.text(`📍 ${location}`, 105, 75);
      
      // Date joined
      const dateJoined = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      pdf.setFontSize(10);
      pdf.text(`Member since: ${dateJoined}`, 105, 85);
      
      // Profile type
      const profileType = localStorage.getItem("userProfileVisibility") || "Public";
      pdf.setFontSize(10);
      pdf.text(`Profile type: ${profileType}`, 105, 95);
      
      // Badge level
      const achievedBadgesCount = badges.filter(b => b.achieved).length;
      let badgeLevel = "Explorer";
      if (achievedBadgesCount >= 5) badgeLevel = "Curator";
      if (achievedBadgesCount >= 10) badgeLevel = "Keeper";
      
      pdf.setFontSize(10);
      pdf.text(`Badge level: ${badgeLevel} (${achievedBadgesCount} badges)`, 105, 105);
      
      // Bio section
      pdf.setFillColor(245, 245, 245);
      pdf.rect(25, 130, 160, 60, 'F');
      
      pdf.setFontSize(14);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text("About Me", 30, 142);
      
      pdf.setFontSize(11);
      const bioLines = pdf.splitTextToSize(bio, 150);
      pdf.text(bioLines, 30, 152);
      
      // QR code placeholder (would require an actual QR generation library)
      pdf.setFillColor(240, 240, 240);
      pdf.rect(140, 210, 40, 40, 'F');
      pdf.setFontSize(8);
      pdf.text("Scan to view live profile", 160, 260, { align: "center" });
      
      // Date generated
      pdf.setFontSize(9);
      pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 30, 275);
      
      addPageDecorations(1);
      
      // ----- PAGE 2: MY LIFE IN IMPRINTS -----
      pdf.addPage();
      pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.rect(0, 0, 210, 10, 'F'); // Top accent bar
      
      // Page Title
      pdf.setFontSize(22);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text("My Life in Imprints", 105, 30, { align: "center" });
      
      // Decorative line
      pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.setLineWidth(1);
      pdf.line(70, 35, 140, 35);
      
      // Summary stats in a styled box
      pdf.setFillColor(245, 245, 245);
      pdf.rect(25, 45, 160, 25, 'F');
      
      pdf.setFontSize(11);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text(`Total Imprints: ${imprints.length}`, 35, 57);
      pdf.text(`Latest Memory: ${imprints.length > 0 ? new Date(imprints[0].date).toLocaleDateString() : "None yet"}`, 115, 57);
      
      // Memory cards in a timeline/grid layout
      let yPosition = 80;
      pdf.setFontSize(12);
      pdf.text("Selected Memories", 105, 75, { align: "center" });
      
      imprints.slice(0, 6).forEach((imprint, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          addPageDecorations(2);
          yPosition = 30;
        }
        
        // Memory card styling
        pdf.setFillColor(250, 250, 250);
        pdf.setDrawColor(230, 230, 230);
        pdf.roundedRect(25, yPosition, 160, 30, 2, 2, 'FD');
        
        // Title and date
        pdf.setFontSize(12);
        pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
        pdf.text(imprint.title, 30, yPosition + 8);
        
        // Date and location
        pdf.setFontSize(9);
        pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
        const formattedDate = new Date(imprint.date).toLocaleDateString();
        pdf.text(`${formattedDate} ${imprint.location ? `- ${imprint.location}` : ""}`, 30, yPosition + 16);
        
        // Tags
        pdf.setFontSize(8);
        pdf.text(`Tags: ${imprint.tags.join(", ")}`, 30, yPosition + 24);
        
        // Privacy indicator
        let privacyIcon = "🌎";
        if (imprint.privacy === "private") privacyIcon = "🔒";
        if (imprint.privacy === "family") privacyIcon = "👪";
        pdf.text(privacyIcon, 175, yPosition + 8);
        
        yPosition += 35;
      });
      
      addPageDecorations(2);
      
      // ----- PAGE 3: IMPRINTS THAT MOVED ME -----
      pdf.addPage();
      pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
      pdf.rect(0, 0, 210, 10, 'F'); // Top accent bar with different color
      
      // Page Title
      pdf.setFontSize(22);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text("Imprints That Moved Me", 105, 30, { align: "center" });
      
      // Decorative line
      pdf.setDrawColor(accentBlue[0], accentBlue[1], accentBlue[2]);
      pdf.setLineWidth(1);
      pdf.line(70, 35, 140, 35);
      
      // Testimonial cards
      yPosition = 50;
      
      testimonials.forEach((testimonial, index) => {
        if (yPosition > 240) {
          pdf.addPage();
          addPageDecorations(3);
          yPosition = 30;
        }
        
        // Testimonial card with soft styling
        pdf.setFillColor(250, 250, 250);
        pdf.setDrawColor(230, 230, 230);
        pdf.roundedRect(25, yPosition, 160, 45, 3, 3, 'FD');
        
        // Quote styling
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.5);
        pdf.line(35, yPosition + 5, 35, yPosition + 40);
        
        // From info
        pdf.setFontSize(11);
        pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
        pdf.text(`From: ${testimonial.name}`, 40, yPosition + 10);
        
        // Relationship
        pdf.setFontSize(9);
        pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
        pdf.text(`(${testimonial.relationship})`, 130, yPosition + 10);
        
        // Content
        pdf.setFontSize(9);
        pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
        const testimonialLines = pdf.splitTextToSize(testimonial.content, 140);
        pdf.text(testimonialLines, 40, yPosition + 18);
        
        yPosition += 55;
      });
      
      addPageDecorations(3);
      
      // ----- PAGE 4: ACHIEVEMENTS & CHALLENGES -----
      pdf.addPage();
      pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.rect(0, 0, 210, 10, 'F'); // Top accent bar
      
      // Page Title
      pdf.setFontSize(22);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text("Achievements & Challenges", 105, 30, { align: "center" });
      
      // Decorative line
      pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.setLineWidth(1);
      pdf.line(60, 35, 150, 35);
      
      // Badges section
      pdf.setFontSize(16);
      pdf.text("Earned Badges", 105, 50, { align: "center" });
      
      // Badges in a grid layout
      const achievedBadges = badges.filter(b => b.achieved);
      let badgeX = 30;
      let badgeY = 60;
      
      achievedBadges.forEach((badge, index) => {
        // We can only represent badges with text in basic jsPDF
        pdf.setFillColor(250, 250, 250);
        pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        pdf.circle(badgeX + 10, badgeY + 10, 10, 'FD');
        
        pdf.setFontSize(9);
        pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
        const shortName = badge.name.substring(0, 12);
        pdf.text(shortName, badgeX + 10, badgeY + 30, { align: "center" });
        
        // Move to next position in grid
        badgeX += 40;
        if (badgeX > 160) {
          badgeX = 30;
          badgeY += 40;
        }
      });
      
      // Challenges section
      badgeY = Math.max(badgeY + 40, 140); // Ensure enough space after badges
      
      pdf.setFontSize(16);
      pdf.text("Memory Challenges", 105, badgeY, { align: "center" });
      
      // Active challenges
      yPosition = badgeY + 10;
      const activeChallenges = challenges.filter(c => c.status !== "not-started");
      
      activeChallenges.forEach((challenge, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          addPageDecorations(4);
          yPosition = 30;
        }
        
        // Challenge card
        const status = challenge.status === "completed" ? "Completed" : "In Progress";
        const progress = Math.round((challenge.progress / challenge.target) * 100);
        
        pdf.setFillColor(245, 245, 245);
        pdf.roundedRect(30, yPosition, 150, 25, 2, 2, 'F');
        
        pdf.setFontSize(11);
        pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
        pdf.text(challenge.title, 35, yPosition + 8);
        
        pdf.setFontSize(9);
        pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
        pdf.text(`Status: ${status} (${progress}%)`, 35, yPosition + 16);
        pdf.text(`Goal: ${challenge.target} ${challenge.category}`, 100, yPosition + 16);
        
        // Progress bar
        pdf.setFillColor(220, 220, 220);
        pdf.rect(35, yPosition + 20, 140, 3, 'F');
        
        pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
        pdf.rect(35, yPosition + 20, 140 * (progress/100), 3, 'F');
        
        yPosition += 30;
      });
      
      // Reflection box
      if (yPosition < 230) {
        pdf.setFontSize(12);
        pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
        pdf.text("The biggest lesson I've learned so far...", 105, yPosition + 10, { align: "center" });
        
        pdf.setDrawColor(200, 200, 200);
        pdf.setFillColor(250, 250, 250);
        pdf.roundedRect(30, yPosition + 15, 150, 40, 2, 2, 'FD');
        pdf.setFontSize(9);
        pdf.text("(This space is for your personal reflection)", 105, yPosition + 35, { align: "center" });
      }
      
      addPageDecorations(4);
      
      // ----- PAGE 5: LEGACY PAGE -----
      pdf.addPage();
      pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.rect(0, 0, 210, 10, 'F'); // Top accent bar
      
      // Decorative elements for legacy page
      pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.setLineWidth(0.5);
      pdf.line(30, 50, 180, 50);
      pdf.line(30, 240, 180, 240);
      
      // Page Title - make this one special
      pdf.setFontSize(24);
      pdf.setTextColor(primaryTextColor[0], primaryTextColor[1], primaryTextColor[2]);
      pdf.text("What I Want To Be Remembered For", 105, 30, { align: "center" });
      
      // Legacy message
      const legacyMessage = localStorage.getItem("userLegacyMessage") || 
        "This space is for capturing your thoughts about your legacy and how you wish to be remembered by future generations. Click edit on your profile to add your legacy message.";
      
      pdf.setFontSize(11);
      const legacyLines = pdf.splitTextToSize(legacyMessage, 150);
      pdf.text(legacyLines, 105, 80, { align: "center" });
      
      // Legacy vault preview section
      pdf.setFontSize(12);
      pdf.text("Legacy Vault Letters", 105, 160, { align: "center" });
      
      // Blurred preview representation
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(55, 170, 100, 60, 3, 3, 'F');
      
      pdf.setFontSize(9);
      pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      pdf.text("(Legacy vault letters preview)", 105, 200, { align: "center" });
      
      pdf.setFontSize(8);
      pdf.text("These letters will be delivered according to your preferences", 105, 210, { align: "center" });
      
      // Final footer note
      pdf.setFontSize(10);
      pdf.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
      pdf.text("Your digital legacy, preserved with Imprintr™", 105, 250, { align: "center" });
      
      addPageDecorations(5);
      
      // Save the PDF with user's name
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
