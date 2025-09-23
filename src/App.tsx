import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import CustomRequestForm from "./pages/CustomRequestForm";
import MyRequests from "./pages/MyRequests";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import EmailSetup from "./pages/setup/EmailSetup";
import WhatsAppSetup from "./pages/setup/WhatsAppSetup";
import SocialSetup from "./pages/setup/SocialSetup";
import FAQManagement from "./pages/FAQManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/setup/email" element={<ProtectedRoute><EmailSetup /></ProtectedRoute>} />
            <Route path="/setup/whatsapp" element={<ProtectedRoute><WhatsAppSetup /></ProtectedRoute>} />
            <Route path="/setup/social" element={<ProtectedRoute><SocialSetup /></ProtectedRoute>} />
            <Route path="/faq-management" element={<ProtectedRoute><FAQManagement /></ProtectedRoute>} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Dashboard /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agents" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Agents /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/requests" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><CustomRequestForm /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-requests" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><MyRequests /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/billing" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Billing /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Settings /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
