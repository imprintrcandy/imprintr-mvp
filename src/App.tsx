
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminRoute } from "./components/security/AdminRoute";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route 
                path="/passport" 
                element={
                  <ProtectedRoute>
                    <Passport />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/new-imprint" 
                element={
                  <ProtectedRoute>
                    <NewImprint />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/challenges" element={<ExploreChallenge />} />
              <Route path="/create-challenge" element={<CreateChallenge />} />
              <Route path="/why-partner-with-us" element={<WhyPartnerWithUs />} />
              
              {/* Brand Routes */}
              <Route path="/brand/signup" element={<BrandSignup />} />
              <Route path="/brand/login" element={<BrandLogin />} />
              <Route 
                path="/brand/dashboard" 
                element={
                  <ProtectedRoute requiresBrand={true}>
                    <BrandDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/brand/challenges" 
                element={
                  <ProtectedRoute requiresBrand={true}>
                    <BrandChallenges />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/brand/visitors" 
                element={
                  <ProtectedRoute requiresBrand={true}>
                    <BrandVisitors />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/brand/verification" 
                element={
                  <ProtectedRoute requiresBrand={true}>
                    <BrandVerification />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/brand/profile" 
                element={
                  <ProtectedRoute requiresBrand={true}>
                    <BrandProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Route - NOW PROPERLY PROTECTED */}
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
              
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
