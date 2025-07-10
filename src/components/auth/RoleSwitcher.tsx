
import { useState, useEffect } from "react";
import { ChevronDown, User, Shield, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useSecureAuth } from "@/hooks/useSecureAuth";

interface Role {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  redirectPath: string;
}

const ROLE_CONFIG: Record<string, Role> = {
  user: {
    value: "user",
    label: "User",
    icon: User,
    color: "bg-pink-500",
    redirectPath: "/profile/@username"
  },
  super_admin: {
    value: "super_admin",
    label: "Super Admin",
    icon: Shield,
    color: "bg-red-500",
    redirectPath: "/admin"
  },
  brand: {
    value: "brand",
    label: "Partner Brand",
    icon: Building2,
    color: "bg-blue-500",
    redirectPath: "/brand/dashboard"
  }
};

export const RoleSwitcher = () => {
  const { user } = useAuth();
  const { userRole, isAdmin } = useSecureAuth();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<string>("user");
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && userRole) {
      // For super_admin users, give them access to both user and super_admin roles
      if (userRole === 'super_admin') {
        setUserRoles(['user', 'super_admin']);
        // Get active role from localStorage or default to current role
        const storedActiveRole = localStorage.getItem("active_role");
        setActiveRole(storedActiveRole && ['user', 'super_admin'].includes(storedActiveRole) ? storedActiveRole : 'super_admin');
      } else {
        // For regular users, only show their role if they have additional roles
        // This can be expanded later when you add brand partners, etc.
        setUserRoles([userRole]);
        setActiveRole(userRole);
      }
    }
  }, [user, userRole]);

  // Show role switcher for super_admin users (who have multiple roles available)
  if (!user || !isAdmin || userRoles.length <= 1) {
    return null;
  }

  const handleRoleSwitch = async (newRole: string) => {
    if (newRole === activeRole) return;

    setLoading(true);
    try {
      setActiveRole(newRole);
      
      // Store in localStorage
      localStorage.setItem("active_role", newRole);
      
      // Redirect to appropriate dashboard
      const roleConfig = ROLE_CONFIG[newRole];
      if (roleConfig) {
        navigate(roleConfig.redirectPath);
      }
      
      toast.success(`Switched to ${ROLE_CONFIG[newRole]?.label} role`);
    } catch (error: any) {
      toast.error("Failed to switch role: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const currentRoleConfig = ROLE_CONFIG[activeRole];
  const CurrentIcon = currentRoleConfig?.icon || User;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 min-w-fit">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentRoleConfig?.color || 'bg-gray-500'}`} />
            <CurrentIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Active Role: {currentRoleConfig?.label}</span>
            <span className="sm:hidden">{currentRoleConfig?.label}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
        <div className="p-2 border-b">
          <p className="text-sm font-medium text-muted-foreground">Switch Role</p>
        </div>
        
        {userRoles.map((role) => {
          const roleConfig = ROLE_CONFIG[role];
          if (!roleConfig) return null;
          
          const RoleIcon = roleConfig.icon;
          const isActive = role === activeRole;
          
          return (
            <DropdownMenuItem
              key={role}
              onClick={() => handleRoleSwitch(role)}
              disabled={loading}
              className={`cursor-pointer flex items-center gap-3 ${
                isActive ? 'bg-muted' : ''
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${roleConfig.color}`} />
              <RoleIcon className="h-4 w-4" />
              <span className="flex-1">{roleConfig.label}</span>
              {isActive && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
