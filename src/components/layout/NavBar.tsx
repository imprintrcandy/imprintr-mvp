
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Settings, Trophy, Target, Users, FileText, Award, Globe, Cog, BarChart3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSecureAuth } from "@/hooks/useSecureAuth";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useSecureAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/discover" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Challenges", path: "/challenges" },
    { name: "Partner Brand", path: "/why-partner-with-us" },
  ];

  const authLinks = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup", primary: true },
  ];

  // User dashboard menu items
  const userMenuItems = [
    { name: "My Profile", path: "/profile/@username", icon: User },
    { name: "My Passport (Badges)", path: "/passport", icon: Trophy },
    { name: "My Challenges", path: "/my-challenges", icon: Target },
    { name: "Imprints", path: "/profile/@username/imprints", icon: FileText },
    { name: "Explore Challenges", path: "/challenges", icon: Target },
    { name: "Referrals", path: "/referrals", icon: Users },
    { name: "Account Settings", path: "/settings", icon: Settings },
  ];

  // Super admin menu items
  const adminMenuItems = [
    { name: "Admin Dashboard", path: "/admin", icon: BarChart3 },
    { name: "Manage Users", path: "/admin/users", icon: Users },
    { name: "Manage Challenges", path: "/admin/challenges", icon: Target },
    { name: "Review Proof Submissions", path: "/admin/submissions", icon: FileText },
    { name: "Badge Log", path: "/admin/badges", icon: Award },
    { name: "Franchise Admins", path: "/admin/franchise", icon: Globe },
    { name: "System Settings", path: "/admin/settings", icon: Cog },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Get user display name and role
  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.name || user.email?.split('@')[0] || "User";
  };

  const getUserRole = () => {
    if (isAdmin) return "Super Admin";
    return "User";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/94f5a903-86c9-45e8-ba9f-09cc9d91ad91.png" 
              alt="Imprintr Logo" 
              className="h-8 w-auto hover:animate-pulse transition-all duration-300"
            />
            <span className="text-2xl font-bold text-primary">Imprintr</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.path)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full p-0 h-10 w-10">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-background border shadow-lg">
                {/* User Info Header */}
                <div className="flex items-center justify-start gap-3 p-3 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-primary font-medium">({getUserRole()})</p>
                  </div>
                </div>

                {/* User Dashboard Menu Items */}
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer flex items-center">
                      <item.icon className="mr-3 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}

                {/* Super Admin Menu Items - Conditional */}
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Admin Access
                      </p>
                    </div>
                    {adminMenuItems.map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link to={item.path} className="cursor-pointer flex items-center">
                          <item.icon className="mr-3 h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            authLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant={link.primary ? "default" : "outline"}>
                  {link.name}
                </Button>
              </Link>
            ))
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center mb-8">
              <img 
                src="/lovable-uploads/94f5a903-86c9-45e8-ba9f-09cc9d91ad91.png" 
                alt="Imprintr Logo" 
                className="h-8 w-auto mr-2"
              />
              <span className="text-xl font-bold text-primary">Imprintr</span>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary py-2",
                    isActive(link.path)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-4" />
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-md">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{getUserDisplayName()}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <p className="text-xs text-primary font-medium">({getUserRole()})</p>
                    </div>
                  </div>

                  {/* Mobile User Menu Items */}
                  {userMenuItems.map((item) => (
                    <Link key={item.path} to={item.path} onClick={closeMenu}>
                      <Button className="w-full mb-2 justify-start" variant="ghost">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  ))}

                  {/* Mobile Super Admin Menu Items */}
                  {isAdmin && (
                    <>
                      <div className="h-px bg-border my-2" />
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
                        Admin Access
                      </p>
                      {adminMenuItems.map((item) => (
                        <Link key={item.path} to={item.path} onClick={closeMenu}>
                          <Button className="w-full mb-2 justify-start" variant="ghost">
                            <item.icon className="h-4 w-4 mr-3" />
                            <span>{item.name}</span>
                          </Button>
                        </Link>
                      ))}
                    </>
                  )}

                  <div className="h-px bg-border my-2" />
                  <Button 
                    className="w-full flex items-center justify-start gap-3" 
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      closeMenu();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </Button>
                </>
              ) : (
                authLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={closeMenu}>
                    <Button
                      className="w-full mb-2"
                      variant={link.primary ? "default" : "outline"}
                    >
                      {link.name}
                    </Button>
                  </Link>
                ))
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
