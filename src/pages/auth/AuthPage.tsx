
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Redirect to home if already authenticated
  useEffect(() => {
    // Only redirect if we have explicitly confirmed the user is authenticated
    // and the loading state is complete
    if (user && !loading) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render the auth forms if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-forest-green">
              Coachlytic
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Analytics-driven coaching platform
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // This is a fallback, but should never be reached due to the redirect in the useEffect
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
