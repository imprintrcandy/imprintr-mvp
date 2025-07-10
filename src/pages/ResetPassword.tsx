import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const { updatePassword, session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Check if we have the proper hash fragment for password reset
    const hashFragment = window.location.hash;
    if (hashFragment.includes('access_token') && hashFragment.includes('type=recovery')) {
      setIsValidToken(true);
    }
    setIsCheckingToken(false);
  }, []);

  useEffect(() => {
    // If user is authenticated and we have a valid session, they can reset password
    if (session && !isCheckingToken) {
      setIsValidToken(true);
    }
  }, [session, isCheckingToken]);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      await updatePassword(values.password);
      navigate("/passport");
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingToken) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="w-full max-w-md px-4">
            <Card className="border-muted shadow-soft">
              <CardContent className="pt-6 text-center">
                <p>Verifying reset token...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isValidToken) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="w-full max-w-md px-4">
            <Card className="border-muted shadow-soft">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-display text-destructive">Invalid Reset Link</CardTitle>
                <CardDescription>
                  This password reset link is invalid or has expired
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={() => navigate("/forgot-password")} className="w-full">
                  Request New Reset Link
                </Button>
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
              <CardTitle className="text-3xl font-display">Set New Password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;