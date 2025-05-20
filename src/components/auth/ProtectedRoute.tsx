
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
  requiresBrand?: boolean;
};

export const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  requiresBrand = false,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  // If this route requires brand access, check if user is a brand owner
  if (requiresBrand && !user.user_metadata?.isBrand) {
    return <Navigate to="/brand/login" />;
  }

  return <>{children}</>;
};
