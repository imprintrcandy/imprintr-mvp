
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import SignupForm from "@/components/auth/SignupForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card className="border-muted shadow-soft">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-display">Create an Account</CardTitle>
              <CardDescription>
                Enter your information to get started with Imprintr
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm embedded={true} />
              <SocialLoginButtons isLoading={isLoading} />
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Log in
                </Link>
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Are you a business?{" "}
                <Link
                  to="/auth?tab=brand"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Register as brand
                </Link>
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="hover:text-foreground underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="hover:text-foreground underline">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
