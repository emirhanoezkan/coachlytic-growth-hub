
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TimeFormatProvider } from "@/contexts/TimeFormatContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout"; // Import DashboardLayout
import AuthPage from "@/pages/auth/AuthPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientsPage from "./pages/clients/ClientsPage";
import ClientProfilePage from "./pages/clients/ClientProfilePage";
import SessionsPage from "./pages/sessions/SessionsPage";
import ProgramsPage from "./pages/programs/ProgramsPage";
import DocumentsPage from "./pages/documents/DocumentsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import BillingPage from "./pages/billing/BillingPage";
import ProfilePage from "./pages/user/ProfilePage";
import SettingsPage from "./pages/user/SettingsPage";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TimeFormatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout><Index /></DashboardLayout>} />
                  <Route path="/clients" element={<DashboardLayout><ClientsPage /></DashboardLayout>} />
                  <Route path="/clients/:id" element={<DashboardLayout><ClientProfilePage /></DashboardLayout>} />
                  <Route path="/sessions" element={<DashboardLayout><SessionsPage /></DashboardLayout>} />
                  <Route path="/programs" element={<DashboardLayout><ProgramsPage /></DashboardLayout>} />
                  <Route path="/documents" element={<DashboardLayout><DocumentsPage /></DashboardLayout>} />
                  <Route path="/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
                  <Route path="/billing" element={<DashboardLayout><BillingPage /></DashboardLayout>} />
                  <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
                  <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TimeFormatProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
