
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import BrandLogin from "./brand/BrandLogin";
import BrandSignup from "./brand/BrandSignup";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"visitor" | "brand">("visitor");
  const [visitorMode, setVisitorMode] = useState<"login" | "signup">("login");
  const [brandMode, setBrandMode] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card className="border-muted shadow-soft">
            <Tabs 
              defaultValue="visitor" 
              onValueChange={(value) => setActiveTab(value as "visitor" | "brand")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="visitor">Visitor</TabsTrigger>
                <TabsTrigger value="brand">Brand</TabsTrigger>
              </TabsList>
              
              <TabsContent value="visitor" className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex rounded-md border border-muted p-1">
                    <button
                      onClick={() => setVisitorMode("login")}
                      className={`px-4 py-2 text-sm rounded-md ${
                        visitorMode === "login"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      }`}
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => setVisitorMode("signup")}
                      className={`px-4 py-2 text-sm rounded-md ${
                        visitorMode === "signup"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  {visitorMode === "login" ? (
                    <>
                      <Login embedded={true} />
                      <SocialLoginButtons isLoading={isLoading} />
                    </>
                  ) : (
                    <>
                      <SignupForm embedded={true} />
                      <SocialLoginButtons isLoading={isLoading} />
                    </>
                  )}
                </CardContent>
              </TabsContent>
              
              <TabsContent value="brand" className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex rounded-md border border-muted p-1">
                    <button
                      onClick={() => setBrandMode("login")}
                      className={`px-4 py-2 text-sm rounded-md ${
                        brandMode === "login"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      }`}
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => setBrandMode("signup")}
                      className={`px-4 py-2 text-sm rounded-md ${
                        brandMode === "signup"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  {brandMode === "login" ? (
                    <BrandLogin embedded={true} />
                  ) : (
                    <BrandSignup embedded={true} />
                  )}
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
