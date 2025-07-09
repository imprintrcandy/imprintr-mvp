import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Eye, Palette, Calendar } from "lucide-react";
import { toast } from "sonner";
import MobileNavigation from "@/components/layout/MobileNavigation";

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [challengeData, setChallengeData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    badgeIcon: "🏆",
    badgeColor: "bg-coral-400",
    privacy: "public",
    deadline: "",
    rules: ""
  });

  const categories = [
    "Personal Growth", "Travel", "Relationships", "Impact", 
    "Faith", "Fitness", "Creativity", "Milestones"
  ];

  const badgeIcons = [
    "🏆", "⭐", "🎯", "❤️", "🌟", "🔥", "💎", "🎨",
    "📚", "🌱", "🎵", "☕", "🥾", "🍳", "🧘", "✈️"
  ];

  const badgeColors = [
    { name: "Coral", class: "bg-coral-400" },
    { name: "Mint", class: "bg-mint-400" },
    { name: "Lavender", class: "bg-lavender-400" },
    { name: "Peach", class: "bg-peach-400" },
    { name: "Sky", class: "bg-sky-400" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setChallengeData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return challengeData.title && challengeData.description && challengeData.category && challengeData.difficulty;
      case 2:
        return challengeData.badgeIcon && challengeData.badgeColor;
      case 3:
        return challengeData.privacy;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      toast.success("Challenge created successfully!");
      navigate("/challenges");
    }
  };

  return (
    <>
      <MainLayout>
        <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/challenges")}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Create <span className="gradient-text">Challenge</span>
              </h1>
              <p className="text-muted-foreground">Design a meaningful life challenge for yourself or others</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? "bg-primary text-white" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 ${
                      currentStep > step ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-2">Challenge Details</h2>
                  <p className="text-muted-foreground">Tell us about your challenge idea</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Challenge Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Visit 5 Local Coffee Shops"
                      value={challengeData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this challenge involves and why it's meaningful..."
                      value={challengeData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Category *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleInputChange("category", category)}
                          className={`p-3 rounded-lg border text-left transition-colors ${
                            challengeData.category === category
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Difficulty *</Label>
                    <RadioGroup
                      value={challengeData.difficulty}
                      onValueChange={(value) => handleInputChange("difficulty", value)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Easy" id="easy" />
                        <Label htmlFor="easy">Easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Epic" id="epic" />
                        <Label htmlFor="epic">Epic</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Badge Design */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-2">Design Your Badge</h2>
                  <p className="text-muted-foreground">Choose an icon and color for your completion badge</p>
                </div>

                {/* Badge Preview */}
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 ${challengeData.badgeColor} rounded-full flex items-center justify-center text-white text-4xl mx-auto badge-glow`}>
                    {challengeData.badgeIcon}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Badge Preview</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>Choose Icon</Label>
                    <div className="grid grid-cols-8 gap-2 mt-2">
                      {badgeIcons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => handleInputChange("badgeIcon", icon)}
                          className={`w-12 h-12 rounded-lg border flex items-center justify-center text-2xl transition-colors ${
                            challengeData.badgeIcon === icon
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Choose Color</Label>
                    <div className="flex gap-3 mt-2">
                      {badgeColors.map((color) => (
                        <button
                          key={color.class}
                          onClick={() => handleInputChange("badgeColor", color.class)}
                          className={`w-12 h-12 ${color.class} rounded-full border-2 transition-all ${
                            challengeData.badgeColor === color.class
                              ? "border-foreground scale-110"
                              : "border-gray-200 hover:scale-105"
                          }`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Privacy & Rules */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-2">Privacy & Rules</h2>
                  <p className="text-muted-foreground">Set privacy level and completion rules</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>Privacy Setting *</Label>
                    <RadioGroup
                      value={challengeData.privacy}
                      onValueChange={(value) => handleInputChange("privacy", value)}
                      className="space-y-3 mt-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="public" id="public" />
                        <div className="flex-1">
                          <Label htmlFor="public" className="font-medium">Public</Label>
                          <p className="text-sm text-muted-foreground">Anyone can join this challenge</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="friends" id="friends" />
                        <div className="flex-1">
                          <Label htmlFor="friends" className="font-medium">Friends Only</Label>
                          <p className="text-sm text-muted-foreground">Only your friends can join</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="private" id="private" />
                        <div className="flex-1">
                          <Label htmlFor="private" className="font-medium">Private</Label>
                          <p className="text-sm text-muted-foreground">Just for you</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="deadline">Deadline (Optional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={challengeData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rules">Completion Rules (Optional)</Label>
                    <Textarea
                      id="rules"
                      placeholder="What proof is needed to complete this challenge? (photos, videos, written reflection, etc.)"
                      value={challengeData.rules}
                      onChange={(e) => handleInputChange("rules", e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Challenge Preview */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="font-display font-semibold mb-4">Challenge Preview</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${challengeData.badgeColor} rounded-full flex items-center justify-center text-white`}>
                        {challengeData.badgeIcon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{challengeData.title || "Challenge Title"}</h4>
                        <Badge className="text-xs">{challengeData.category || "Category"}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{challengeData.description || "Challenge description will appear here..."}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button onClick={nextStep} disabled={!validateStep(currentStep)}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                  Create Challenge
                </Button>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
      <MobileNavigation />
    </>
  );
};

export default CreateChallenge;