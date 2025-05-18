
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const { t, locale, changeLocale } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we'll just navigate to the dashboard
      navigate("/");
      toast({
        title: t('success'),
        description: "Login successful",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="bg-forest-500 text-white rounded-lg p-2 flex items-center justify-center">
            <span className="text-lg font-bold">C</span>
          </div>
          <h1 className="text-xl font-display font-semibold ml-2 text-forest-600">Coachlytic</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => changeLocale('en')}
            className={locale === 'en' ? 'bg-gray-100' : ''}
          >
            EN
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => changeLocale('tr')}
            className={locale === 'tr' ? 'bg-gray-100' : ''}
          >
            TR
          </Button>
          <Button asChild>
            <Link to="/signup">{t('signup')}</Link>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('login')}</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Link to="#" className="text-sm text-forest-600 hover:text-forest-800">
                    {t('forgotPassword')}
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-forest-500 hover:bg-forest-600" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : t('login')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600 w-full">
              {t('noAccount')}{" "}
              <Link to="/signup" className="text-forest-600 hover:text-forest-800 font-medium">
                {t('signup')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; 2025 Coachlytic. {t('appName')}
      </footer>
    </div>
  );
};

export default LoginPage;
