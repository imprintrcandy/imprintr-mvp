import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await resetPassword(values.email);
      setEmailSent(true);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="w-full max-w-md px-4">
            <Card className="border-muted shadow-soft">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-display">Check Your Email</CardTitle>
                <CardDescription>
                  We've sent you a password reset link
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  If an account with that email exists, you'll receive a password reset link shortly.
                </p>
                <p className="text-sm text-muted-foreground">
                  Don't see the email? Check your spam folder.
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card className="border-muted shadow-soft">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-display">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a reset link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;