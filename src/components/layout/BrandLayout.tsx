
import { ReactNode, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Menu, Home, MapPin, Award, Users, ShieldCheck, Settings, LogOut, ChevronDown } from "lucide-react";

interface BrandLayoutProps {
  children: ReactNode;
}

const BrandLayout = ({ children }: BrandLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/brand/login");
  };

  const NavItem = ({ to, icon, label }: { to: string; icon: ReactNode; label: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {icon}
      {label}
    </NavLink>
  );

  return (
    <ProtectedRoute requiresBrand>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-56 border-r">
              <nav className="grid gap-2 text-lg font-medium">
                <NavItem to="/brand/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" />
                <NavItem to="/brand/profile" icon={<MapPin className="h-5 w-5" />} label="Profile" />
                <NavItem to="/brand/challenges" icon={<Award className="h-5 w-5" />} label="Challenges" />
                <NavItem to="/brand/visitors" icon={<Users className="h-5 w-5" />} label="Visitors" />
                <NavItem to="/brand/verification" icon={<ShieldCheck className="h-5 w-5" />} label="Verification" />
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Imprintr</span>
              <span className="text-sm font-medium px-2 py-1 bg-primary/10 text-primary rounded-md">Brand</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium">{user.user_metadata?.brandName || user.email}</span>
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden border-r bg-muted/40 md:block md:w-56 lg:w-72">
            <nav className="flex flex-col gap-2 p-4 text-sm">
              <NavItem to="/brand/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" />
              <NavItem to="/brand/profile" icon={<MapPin className="h-5 w-5" />} label="Profile" />
              <NavItem to="/brand/challenges" icon={<Award className="h-5 w-5" />} label="Challenges" />
              <NavItem to="/brand/visitors" icon={<Users className="h-5 w-5" />} label="Visitors" />
              <NavItem to="/brand/verification" icon={<ShieldCheck className="h-5 w-5" />} label="Verification" />
              <Separator className="my-2" />
              <button 
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted transition-all"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </aside>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BrandLayout;
