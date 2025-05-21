
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/MainLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const businessCategories = [
  { value: "food", label: "Food & Beverage" },
  { value: "retail", label: "Retail" },
  { value: "tourism", label: "Tourism & Travel" },
  { value: "events", label: "Events & Entertainment" },
  { value: "wellness", label: "Health & Wellness" },
  { value: "education", label: "Education" },
  { value: "tech", label: "Technology" },
  { value: "other", label: "Other" }
];

const signupSchema = z.object({
  brandName: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a business category",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

interface BrandSignupProps {
  embedded?: boolean;
}

const BrandSignup = ({ embedded = false }: BrandSignupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { brandSignUp } = useAuth();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      brandName: "",
      category: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      setIsSubmitting(true);
      await brandSignUp(values.email, values.password, values.brandName, values.category);
      toast.success("Account created successfully! Please check your email to verify your account.");
      navigate("/brand/dashboard");
    } catch (error) {
      console.error("Error creating brand account:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const signupForm = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Your brand or business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a business category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@business.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Brand Account"}
        </Button>
      </form>
    </Form>
  );

  if (embedded) {
    return (
      <>
        {signupForm}
        <div className="mt-4 text-center">
          <Link 
            to="/why-partner-with-us" 
            className="text-sm text-primary hover:underline"
            target="_blank"
          >
            Learn why brands partner with us →
          </Link>
        </div>
      </>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-muted shadow-soft">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-display">Create Your Brand Account</CardTitle>
              <CardDescription>
                Sign up to start creating memory experiences for your customers
              </CardDescription>
            </CardHeader>

            <CardContent>
              {signupForm}
            </CardContent>

            <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth?tab=brand" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
              <div className="mt-4 text-center">
                <Link to="/why-partner-with-us" className="text-sm text-muted-foreground hover:text-primary">
                  Learn why brands partner with us
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BrandSignup;
