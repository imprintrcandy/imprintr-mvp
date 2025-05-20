
import { useState } from "react";
import BrandLayout from "@/components/layout/BrandLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Download, Users, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";

const BrandVisitors = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGenerateQR = () => {
    toast.info("QR code generation will be implemented in the next phase");
  };
  
  return (
    <BrandLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visitor Management</h1>
          <p className="text-muted-foreground">
            Track visitors and generate QR codes for check-ins
          </p>
        </div>
        
        <Separator />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Generator</CardTitle>
              <CardDescription>
                Create QR codes for visitors to scan at your location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted aspect-square max-w-xs mx-auto flex items-center justify-center rounded-md">
                <QrCode className="h-24 w-24 text-muted-foreground/50" />
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="qrType">Challenge</label>
                  <select 
                    id="qrType" 
                    className="w-full p-2 rounded-md border border-input bg-background"
                    defaultValue="location"
                  >
                    <option value="location">Location Check-in</option>
                    <option value="photo_challenge">Photo Challenge</option>
                    <option value="secret_menu">Secret Menu Item</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="validDays">Valid for</label>
                  <select 
                    id="validDays" 
                    className="w-full p-2 rounded-md border border-input bg-background"
                    defaultValue="30"
                  >
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="permanent">Always</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button onClick={handleGenerateQR} className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR
              </Button>
              <Button variant="outline" disabled className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visitor Analytics</CardTitle>
              <CardDescription>
                Track visitor engagement and badge awards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Total Visits</span>
                  <div className="text-3xl font-bold">38</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Badges Awarded</span>
                  <div className="text-3xl font-bold">24</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <div className="text-3xl font-bold">12</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="text-3xl font-bold">4.7</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Visitor History</h3>
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    Detailed visitor analytics will be available in the next update
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                <Users className="h-4 w-4 mr-2" />
                View All Visitors
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Location Settings</CardTitle>
            <CardDescription>
              Configure your physical location for badge unlocking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground/50" />
              <span className="ml-2 text-muted-foreground">Map integration will be available soon</span>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="latitude">Latitude</label>
                <Input id="latitude" placeholder="e.g. 37.7749" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="longitude">Longitude</label>
                <Input id="longitude" placeholder="e.g. -122.4194" disabled />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="radius">Check-in Radius (meters)</label>
                <Input id="radius" type="number" defaultValue={100} min={10} max={1000} disabled />
                <p className="text-xs text-muted-foreground">
                  How close visitors need to be to unlock location-based badges
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">Save Location Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </BrandLayout>
  );
};

export default BrandVisitors;
