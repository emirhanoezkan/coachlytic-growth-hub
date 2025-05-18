
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-display font-semibold text-gray-900">{t('profile.title')}</h1>
                <p className="text-gray-500 mt-1">{t('profile.subtitle')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-1">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <Avatar className="h-24 w-24 bg-gray-100">
                      <AvatarFallback className="text-3xl">
                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-medium">{profile.firstName} {profile.lastName}</h3>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                    </div>
                    <Button variant="outline" className="w-full">{t('profile.changePhoto')}</Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>{t('profile.personal')}</CardTitle>
                    <CardDescription>{t('profile.update')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Button type="submit" className="bg-forest-500 hover:bg-forest-600">
                          {t('profile.save')}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
