
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LegacyMessage {
  id: string;
  title: string;
  recipient: string;
  createdAt: string;
  deliveryType: "date" | "condition";
  deliveryDate?: string;
  condition?: string;
  status: "draft" | "scheduled" | "delivered";
}

const SAMPLE_MESSAGES: LegacyMessage[] = [
  {
    id: "msg-1",
    title: "To my children on their wedding days",
    recipient: "My children",
    createdAt: "2023-10-15",
    deliveryType: "condition",
    condition: "When each of my children gets married",
    status: "scheduled"
  },
  {
    id: "msg-2",
    title: "Life lessons I've learned",
    recipient: "My grandchildren",
    createdAt: "2023-11-20",
    deliveryType: "date",
    deliveryDate: "2040-01-01",
    status: "scheduled"
  },
  {
    id: "msg-3",
    title: "My hopes for your future",
    recipient: "Family",
    createdAt: "2023-09-05",
    deliveryType: "date",
    deliveryDate: "2030-12-25",
    status: "draft"
  }
];

export const LegacyVault = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const getFilteredMessages = () => {
    if (activeTab === "all") return SAMPLE_MESSAGES;
    return SAMPLE_MESSAGES.filter(msg => msg.status === activeTab);
  };
  
  const statusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>;
      case "delivered":
        return <Badge variant="default">Delivered</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Legacy Message Vault</span>
          <Button size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Message
          </Button>
        </CardTitle>
        <CardDescription>
          Create private messages to be delivered in the future or upon specific conditions.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
          
          <div className="flex justify-between mb-4">
            <Input placeholder="Search messages..." className="max-w-xs" />
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">By Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {getFilteredMessages().map((message) => (
                <div key={message.id} className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{message.title}</h3>
                      <p className="text-sm text-muted-foreground">To: {message.recipient}</p>
                    </div>
                    {statusBadge(message.status)}
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center text-sm">
                    <div>
                      <span className="text-muted-foreground">Delivery: </span>
                      <span>
                        {message.deliveryType === "date" 
                          ? `On ${new Date(message.deliveryDate!).toLocaleDateString()}` 
                          : message.condition}
                      </span>
                    </div>
                    <span className="text-muted-foreground">Created: {new Date(message.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              
              {getFilteredMessages().length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No messages found.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-center">
        <Button variant="outline">View Message Archive</Button>
      </CardFooter>
    </Card>
  );
};
