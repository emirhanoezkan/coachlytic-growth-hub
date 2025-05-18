
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: t('success'),
      description: t('settingsSaved'),
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-semibold text-gray-900">{t('profile')}</h1>
          <p className="text-gray-500 mt-1">{t('personalInfo')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-gray-500">john.doe@example.com</p>
                  <div className="mt-2">
                    <Badge className="bg-forest-100 text-forest-800">Solo Coach</Badge>
                  </div>
                  
                  <div className="w-full border-t mt-6 pt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">{t('status')}</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">{t('subscriptionPlan')}</span>
                      <span className="font-medium">Solo Coach</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('clients')}</span>
                      <span className="font-medium">24</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">{t('personalInfo')}</TabsTrigger>
                <TabsTrigger value="company">{t('companyInfo')}</TabsTrigger>
                <TabsTrigger value="subscription">{t('subscriptionPlan')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('personalInfo')}</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('phone')}</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          rows={4}
                          defaultValue="Professional coach with 5+ years of experience in career development and leadership coaching."
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} className="bg-forest-500 hover:bg-forest-600">
                          {t('save')}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="company">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('companyInfo')}</CardTitle>
                    <CardDescription>Update your company details.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" defaultValue="Elevate Coaching" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input id="website" defaultValue="www.elevatecoaching.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxId">Tax ID</Label>
                          <Input id="taxId" defaultValue="12-3456789" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea 
                          id="address" 
                          rows={3}
                          defaultValue="123 Coaching Street, Suite 101, San Francisco, CA 94107"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} className="bg-forest-500 hover:bg-forest-600">
                          {t('save')}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('subscriptionPlan')}</CardTitle>
                    <CardDescription>Manage your subscription.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-lg bg-forest-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Solo Coach</h3>
                            <p className="text-sm text-gray-500">$30/month</p>
                          </div>
                          <Badge className="bg-forest-100 text-forest-800">Current Plan</Badge>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm">Next billing date: June 15, 2025</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Upgrade Your Plan</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="border-2 hover:border-forest-300 transition-colors">
                            <CardHeader>
                              <CardTitle>Firm</CardTitle>
                              <CardDescription>$80/month per coach</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 mb-4">
                                <li className="flex items-center">
                                  <span className="bg-forest-100 text-forest-800 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">✓</span>
                                  <span>All Solo features</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="bg-forest-100 text-forest-800 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">✓</span>
                                  <span>Multi-coach dashboards</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="bg-forest-100 text-forest-800 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">✓</span>
                                  <span>White-label options</span>
                                </li>
                              </ul>
                              <Button className="w-full bg-forest-500 hover:bg-forest-600">Upgrade</Button>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 hover:border-forest-300 transition-colors">
                            <CardHeader>
                              <CardTitle>Enterprise</CardTitle>
                              <CardDescription>$150+/month per coach</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 mb-4">
                                <li className="flex items-center">
                                  <span className="bg-forest-100 text-forest-800 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">✓</span>
                                  <span>All Firm features</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="bg-forest-100 text-forest-800 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">✓</span>
                                  <span>Full AI insights</span>
                                </li>
                                <li className="flex items-center">
                                  <span className="bg-forest-100 text-forest-800 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">✓</span>
                                  <span>API access</span>
                                </li>
                              </ul>
                              <Button className="w-full">Contact Sales</Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
