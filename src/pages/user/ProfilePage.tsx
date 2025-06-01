
import React, { useState } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    firstName: "Coaching",
    lastName: "Expert",
    email: user?.email || "coach@example.com",
    company: "Coachlytic Pro",
    phone: "+1 (555) 123-4567"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
            {t('profile.title')}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            {t('profile.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center space-y-4">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-100">
                <AvatarFallback className="text-2xl sm:text-3xl">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium">{profile.firstName} {profile.lastName}</h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
              <Button variant="outline" className="w-full">
                {t('profile.changePhoto')}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">
                {t('profile.personal')}
              </CardTitle>
              <CardDescription className="text-sm">
                {t('profile.update')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('profile.firstName')}</Label>
                    <Input 
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('profile.lastName')}</Label>
                    <Input 
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('profile.email')}</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="company">{t('profile.company')}</Label>
                  <Input 
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('profile.phone')}</Label>
                  <Input 
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto">
                    {t('profile.save')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ProfilePage;
