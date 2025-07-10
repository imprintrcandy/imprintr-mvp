
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import Passport from "./pages/Passport";
import NewImprint from "./pages/NewMemory";
import About from "./pages/About";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
import Challenges from "./pages/Challenges";
import ExploreChallenge from "./pages/ExploreChallenge";
import CreateChallenge from "./pages/CreateChallenge";
import WhyPartnerWithUs from "./pages/WhyPartnerWithUs";
import Discover from "./pages/Discover";
import BrandSignup from "./pages/brand/BrandSignup";
import BrandLogin from "./pages/brand/BrandLogin";
import BrandDashboard from "./pages/brand/BrandDashboard";
import BrandChallenges from "./pages/brand/BrandChallenges";
import BrandVisitors from "./pages/brand/BrandVisitors";
import BrandVerification from "./pages/brand/BrandVerification";
import BrandProfile from "./pages/brand/BrandProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";

// Create a new QueryClient instance outside of component rendering
const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/passport" element={<Passport />} />
              <Route path="/new-imprint" element={<NewImprint />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/challenges" element={<ExploreChallenge />} />
              <Route path="/create-challenge" element={<CreateChallenge />} />
              <Route path="/why-partner-with-us" element={<WhyPartnerWithUs />} />
              
              {/* Brand Routes */}
              <Route path="/brand/signup" element={<BrandSignup />} />
              <Route path="/brand/login" element={<BrandLogin />} />
              <Route path="/brand/dashboard" element={<BrandDashboard />} />
              <Route path="/brand/challenges" element={<BrandChallenges />} />
              <Route path="/brand/visitors" element={<BrandVisitors />} />
              <Route path="/brand/verification" element={<BrandVerification />} />
              <Route path="/brand/profile" element={<BrandProfile />} />
              
              {/* Admin Route */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Profile Routes */}
              <Route path="/profile/:username" element={<Profile />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
