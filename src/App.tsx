
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TimeFormatProvider } from "@/contexts/TimeFormatContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/clients" element={<ClientsPage />} />
                  <Route path="/clients/:id" element={<ClientProfilePage />} />
                  <Route path="/sessions" element={<SessionsPage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/billing" element={<BillingPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
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
