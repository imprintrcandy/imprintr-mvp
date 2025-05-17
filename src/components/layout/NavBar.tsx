
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <header className={`w-full z-50 ${isLanding ? "absolute top-0" : "bg-background border-b"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-memory flex items-center justify-center">
                <span className="font-display text-white text-xl font-bold">I</span>
              </div>
              <span className={`text-2xl font-display ${isLanding ? "text-white" : "text-foreground"}`}>
                Imprintr
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/passport" 
                  className={`text-sm font-medium ${isLanding ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
                >
                  My Passport
                </Link>
                <Link 
                  to="/memories" 
                  className={`text-sm font-medium ${isLanding ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
                >
                  Memories
                </Link>
                <Link 
                  to="/badges" 
                  className={`text-sm font-medium ${isLanding ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
                >
                  Badges
                </Link>
                <Button 
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    window.location.href = "/";
                  }}
                  variant="outline" 
                  className={isLanding ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : ""}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className={`text-sm font-medium ${isLanding ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
                >
                  About
                </Link>
                <Link 
                  to="/features" 
                  className={`text-sm font-medium ${isLanding ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
                >
                  Features
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className={isLanding ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : ""}
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground"
            aria-label="Toggle menu"
          >
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
              className={isLanding ? "text-white" : ""}
            >
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/passport"
                  className="block text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Passport
                </Link>
                <Link
                  to="/memories"
                  className="block text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Memories
                </Link>
                <Link
                  to="/badges"
                  className="block text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Badges
                </Link>
                <Button 
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    window.location.href = "/";
                    setIsMenuOpen(false);
                  }}
                  variant="outline" 
                  size="sm"
                  className="w-full mt-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className="block text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/features"
                  className="block text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <div className="pt-2 flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
