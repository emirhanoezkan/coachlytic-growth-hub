
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  
  // Wait for auth to be initialized before making any redirects
  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  // Show loading spinner while checking authentication status
  if (loading || !isReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to auth page
  if (!user) {
    console.log("No authenticated user found, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  // If we have a user and the component has children, render them
  // Otherwise, render the Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
}
