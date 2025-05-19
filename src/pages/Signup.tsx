
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { toast } from "@/components/ui/sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define a user profile type for better structure
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  referrer: string;
  signupDate: string;
  profileVisibility: "public" | "private" | "family";
  userReferralCode: string;
}

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [profileVisibility, setProfileVisibility] = useState<"public" | "private" | "family">("private");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);

      if (firstName && lastName && email && password) {
        // Generate unique referral code for this user
        const userReferralCode = `${firstName.toLowerCase()}-${Math.random().toString(36).substring(2, 8)}`;
        
        // Create a structured user profile object
        const userProfile: UserProfile = {
          firstName,
          lastName,
          email,
          referralCode: userReferralCode,
          referrer: referralCode,
          signupDate: new Date().toISOString(),
          profileVisibility,
          userReferralCode
        };

        // Store user authentication state
        localStorage.setItem("isAuthenticated", "true");
        
        // Store structured user profile as JSON
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        
        // Store individual fields for backward compatibility
        localStorage.setItem("userFirstName", firstName);
        localStorage.setItem("userLastName", lastName);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userReferrer", referralCode);
        localStorage.setItem("userSignupDate", new Date().toISOString());
        localStorage.setItem("userReferralCode", userReferralCode);
        localStorage.setItem("userProfileVisibility", profileVisibility);
        
        // Export user data to console for demonstration (in real app, this would be an API call)
        console.log("User registered:", userProfile);
        exportUserForCRM(userProfile);
        
        toast.success("Welcome to Imprintr! Your account has been created.");
        navigate("/passport");
      } else {
        toast.error("Please fill out all fields.");
      }
    }, 1000);
  };

  // Function to demonstrate CRM export capability (would be a server-side API call in production)
  const exportUserForCRM = (user: UserProfile) => {
    // This is a placeholder - in a real application, this would be an API call to your backend
    console.log("CRM export data:", {
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      signupDate: user.signupDate,
      profileType: user.profileVisibility,
      referralSource: user.referrer || "direct",
      // Add any other fields needed for CRM
    });
  };

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Profile Visibility</Label>
                  <RadioGroup
                    value={profileVisibility}
                    onValueChange={(value) => setProfileVisibility(value as "public" | "private" | "family")}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="private" id="private-profile" />
                      <Label htmlFor="private-profile" className="font-normal cursor-pointer">
                        🔒 Private (Only you can see)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="family" id="family-profile" />
                      <Label htmlFor="family-profile" className="font-normal cursor-pointer">
                        👪 Family Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="public" id="public-profile" />
                      <Label htmlFor="public-profile" className="font-normal cursor-pointer">
                        🌎 Public (Anyone can see)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="referralCode">Were you invited by someone? (Optional)</Label>
                  <Input
                    id="referralCode"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Enter referral code"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
              
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" type="button" disabled={isLoading}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.481 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Log in
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
