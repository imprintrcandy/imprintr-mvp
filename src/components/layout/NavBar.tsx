
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            <div className="flex items-center gap-2">
              <Link to="/passport">
                <Button variant="default">My Passport</Button>
              </Link>
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
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/passport" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                  <div className="flex items-center gap-3 mb-2 p-2 bg-muted/50 rounded-md">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/passport" onClick={closeMenu}>
                    <Button className="w-full mb-2 flex items-center justify-center gap-2" variant="default">
                      <User className="h-4 w-4" />
                      <span>My Passport</span>
                    </Button>
                  </Link>
                  <Button 
                    className="w-full flex items-center justify-center gap-2" 
                    variant="outline"
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
