
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

const SignupPage = () => {
  const { t, locale, changeLocale } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "solo"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePlanChange = (value: string) => {
    setFormData(prev => ({ ...prev, plan: value }));
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('error'),
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
      toast({
        title: t('success'),
        description: "Account created successfully",
      });
    }, 1500);
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
          <Button variant="outline" asChild>
            <Link to="/login">{t('login')}</Link>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('createAccount')}</CardTitle>
            <CardDescription>Enter your information to sign up</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={t('enterEmail')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plan">{t('subscriptionPlan')}</Label>
                <Select value={formData.plan} onValueChange={handlePlanChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">{t('soloTitle')} - {locale === 'en' ? '$30' : '₺900'}{t('perMonth')}</SelectItem>
                    <SelectItem value="firm">{t('firmTitle')} - {locale === 'en' ? '$80' : '₺2400'}{t('perMonth')}</SelectItem>
                    <SelectItem value="enterprise">{t('enterpriseTitle')} - {locale === 'en' ? '$150+' : '₺4500+'}{t('perMonth')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-forest-500 hover:bg-forest-600 mt-6" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : t('signup')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600 w-full">
              {t('haveAccount')}{" "}
              <Link to="/login" className="text-forest-600 hover:text-forest-800 font-medium">
                {t('login')}
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

export default SignupPage;
