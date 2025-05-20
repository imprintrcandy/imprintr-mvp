
import { useState } from "react";
import BrandLayout from "@/components/layout/BrandLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Award, Clock, Users, Edit, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

const BrandChallenges = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateChallenge = () => {
    toast.info("Challenge creation will be implemented in the next phase");
  };

  return (
    <BrandLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
            <p className="text-muted-foreground">
              Create and manage visitor challenges for your brand
            </p>
          </div>
          <Button onClick={handleCreateChallenge}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Challenge
          </Button>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Photo Challenge</CardTitle>
                    <Badge>Active</Badge>
                  </div>
                  <CardDescription>Take a photo with our brand mascot</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Ends in 5 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>25 completions</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Award className="h-4 w-4 mr-1" /> View Badge
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Secret Menu Item</CardTitle>
                    <Badge>Active</Badge>
                  </div>
                  <CardDescription>Order our secret menu item to unlock this badge</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>No expiration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>13 completions</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Award className="h-4 w-4 mr-1" /> View Badge
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex items-center justify-center h-full">
                <Button variant="outline" onClick={handleCreateChallenge} className="h-[90%] w-full border-dashed flex flex-col gap-2">
                  <PlusCircle className="h-6 w-6" />
                  <span>Add Challenge</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex items-center justify-center h-60">
              <div className="text-center space-y-2">
                <Award className="h-8 w-8 mx-auto text-muted-foreground" />
                <h3 className="font-medium">No upcoming challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule future challenges to engage with visitors
                </p>
                <Button variant="outline" onClick={handleCreateChallenge} size="sm" className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Challenge
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="flex items-center justify-center h-60">
              <div className="text-center space-y-2">
                <Award className="h-8 w-8 mx-auto text-muted-foreground" />
                <h3 className="font-medium">No completed challenges yet</h3>
                <p className="text-sm text-muted-foreground">
                  Your past challenges will appear here
                </p>
                <Button variant="outline" onClick={handleCreateChallenge} size="sm" className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Challenge
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-4">
            <div className="flex items-center justify-center h-60">
              <div className="text-center space-y-2">
                <Award className="h-8 w-8 mx-auto text-muted-foreground" />
                <h3 className="font-medium">No draft challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Save challenges as drafts to edit later
                </p>
                <Button variant="outline" onClick={handleCreateChallenge} size="sm" className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Challenge
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BrandLayout>
  );
};

export default BrandChallenges;
