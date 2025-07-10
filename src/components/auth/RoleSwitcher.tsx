
import { useState, useEffect } from "react";
import { ChevronDown, User, Shield, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useSecureAuth } from "@/hooks/useSecureAuth";

interface Role {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
  redirectPath: string;
}

const ROLE_CONFIG: Record<string, Role> = {
  user: {
    value: "user",
    label: "Attendee",
    icon: User,
    bgColor: "bg-green-600",
    textColor: "text-white",
    redirectPath: "/profile/@username"
  },
  super_admin: {
    value: "super_admin",
    label: "Admin",
    icon: Shield,
    bgColor: "bg-red-600",
    textColor: "text-white",
    redirectPath: "/admin"
  },
  brand: {
    value: "brand",
    label: "Exhibitor",
    icon: Building2,
    bgColor: "bg-blue-600",
    textColor: "text-white",
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
        <Button 
          variant="outline" 
          className={`gap-3 min-w-[200px] justify-between h-12 rounded-lg border-2 ${currentRoleConfig?.bgColor} ${currentRoleConfig?.textColor} hover:opacity-90 transition-all`}
          disabled={loading}
        >
          <div className="flex items-center gap-3">
            <CurrentIcon className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs opacity-80">Active Role:</span>
              <span className="font-medium">{currentRoleConfig?.label}</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg p-2">        
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
              className={`cursor-pointer rounded-lg mb-2 last:mb-0 p-4 h-auto ${
                roleConfig.bgColor
              } ${roleConfig.textColor} hover:opacity-90 transition-all ${
                isActive ? 'ring-2 ring-white ring-opacity-50' : ''
              }`}
              asChild
            >
              <div className="flex items-center gap-3 w-full">
                <RoleIcon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium flex-1">{roleConfig.label}</span>
                {isActive && (
                  <div className="flex items-center justify-center w-5 h-5 bg-white bg-opacity-20 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
