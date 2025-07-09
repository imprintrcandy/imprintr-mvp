import { Home, Search, Plus, BookOpen, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/challenges" },
    { icon: Plus, label: "Create", path: "/create-challenge" },
    { icon: BookOpen, label: "Passport", path: "/passport" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 mobile-safe-area z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;