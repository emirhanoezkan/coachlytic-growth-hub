
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, Globe, Lock, Settings, WifiOff } from "lucide-react";
import { TimeFormatSettings } from "@/components/settings/TimeFormatSettings";
import { useDefaultTaxRate } from "@/hooks/useInvoices";

const SettingsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { defaultTaxRate, updateDefaultTaxRate, isUpdating } = useDefaultTaxRate();
  const [tempTaxRate, setTempTaxRate] = useState(defaultTaxRate);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    reminderNotifications: true,
    marketingCommunications: false,
    timezone: "America/New_York",
    sessionReminders: 24,
    darkMode: false
  });

  useEffect(() => {
    setTempTaxRate(defaultTaxRate);
  }, [defaultTaxRate]);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    });
  };

  const handleTaxRateSave = () => {
    updateDefaultTaxRate(tempTaxRate);
  };

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50 pt-12 md:pt-14">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-display font-semibold text-gray-900">{t('settings.title')}</h1>
                <p className="text-gray-500 mt-1">{t('settings.subtitle')}</p>
              </div>
              
              <Tabs defaultValue="notifications">
                <TabsList className="grid grid-cols-4 max-w-lg">
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    {t('settings.tabs.notifications')}
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('settings.tabs.preferences')}
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    {t('settings.tabs.integrations')}
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    {t('settings.tabs.security')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('settings.notifications.title')}</CardTitle>
                      <CardDescription>{t('settings.notifications.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">{t('settings.notifications.email')}</Label>
                            <p className="text-sm text-gray-500">{t('settings.notifications.emailDesc')}</p>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="reminder-notifications">{t('settings.notifications.reminders')}</Label>
                            <p className="text-sm text-gray-500">{t('settings.notifications.remindersDesc')}</p>
                          </div>
                          <Switch 
                            id="reminder-notifications" 
                            checked={settings.reminderNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, reminderNotifications: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketing-communications">{t('settings.notifications.marketing')}</Label>
                            <p className="text-sm text-gray-500">{t('settings.notifications.marketingDesc')}</p>
                          </div>
                          <Switch 
                            id="marketing-communications" 
                            checked={settings.marketingCommunications}
                            onCheckedChange={(checked) => setSettings({...settings, marketingCommunications: checked})}
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handleSave} className="bg-forest-500 hover:bg-forest-600">{t('settings.saveChanges')}</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('settings.preferences.title')}</CardTitle>
                      <CardDescription>{t('settings.preferences.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">{t('settings.preferences.timezone')}</Label>
                          <Select 
                            value={settings.timezone} 
                            onValueChange={(value) => setSettings({...settings, timezone: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                              <SelectItem value="Europe/London">London (GMT)</SelectItem>
                              <SelectItem value="Europe/Istanbul">Istanbul (TRT)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="session-reminders">{t('settings.preferences.reminderTime')}</Label>
                          <Select 
                            value={settings.sessionReminders.toString()} 
                            onValueChange={(value) => setSettings({...settings, sessionReminders: parseInt(value)})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select reminder time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 hour before</SelectItem>
                              <SelectItem value="2">2 hours before</SelectItem>
                              <SelectItem value="12">12 hours before</SelectItem>
                              <SelectItem value="24">24 hours before</SelectItem>
                              <SelectItem value="48">48 hours before</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {/* Default Tax Rate Setting */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('settings.taxRate.title')}</CardTitle>
                          <CardDescription>{t('settings.taxRate.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <Label htmlFor="defaultTaxRate">{t('settings.taxRate.label')}</Label>
                              <Input
                                id="defaultTaxRate"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={tempTaxRate}
                                onChange={(e) => setTempTaxRate(parseFloat(e.target.value) || 0)}
                                className="mt-2"
                                placeholder={t('settings.taxRate.placeholder')}
                              />
                            </div>
                            <Button 
                              onClick={handleTaxRateSave}
                              disabled={isUpdating || tempTaxRate === defaultTaxRate}
                              className="bg-forest-500 hover:bg-forest-600"
                            >
                              {isUpdating ? t('action.saving') : t('settings.taxRate.saveButton')}
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            {t('settings.taxRate.helpText')}
                          </p>
                        </CardContent>
                      </Card>
                      
                      {/* Time Format Settings */}
                      <TimeFormatSettings />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="dark-mode">{t('settings.preferences.darkMode')}</Label>
                          <p className="text-sm text-gray-500">{t('settings.preferences.darkModeDesc')}</p>
                        </div>
                        <Switch 
                          id="dark-mode" 
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                        />
                      </div>
                      
                      <Button onClick={handleSave} className="bg-forest-500 hover:bg-forest-600">{t('settings.saveChanges')}</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('settings.integrations.title')}</CardTitle>
                      <CardDescription>{t('settings.integrations.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {["Google Calendar", "Microsoft Outlook", "Zoom", "Stripe", "Slack"].map((integration) => (
                          <div key={integration} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <h4 className="font-medium">{integration}</h4>
                              <p className="text-sm text-gray-500">
                                {t('settings.integrations.connect').replace('{integration}', integration)}
                              </p>
                            </div>
                            <Button variant="outline">{t('settings.integrations.connectButton')}</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('settings.security.title')}</CardTitle>
                      <CardDescription>{t('settings.security.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">{t('settings.security.changePassword')}</h3>
                        <p className="text-sm text-gray-500 mb-4">{t('settings.security.changePasswordDesc')}</p>
                        <Button variant="outline">{t('settings.security.changePassword')}</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">{t('settings.security.2fa')}</h3>
                        <p className="text-sm text-gray-500 mb-4">{t('settings.security.2faDesc')}</p>
                        <Button variant="outline">{t('settings.security.2fa')}</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">{t('settings.security.sessions')}</h3>
                        <p className="text-sm text-gray-500 mb-4">{t('settings.security.sessionsDesc')}</p>
                        <div className="border rounded-md p-4 mb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <WifiOff className="h-5 w-5 mr-2 text-forest-500" />
                              <div>
                                <p className="font-medium">{t('settings.security.currentDevice')}</p>
                                <p className="text-sm text-gray-500">{t('settings.security.lastActive').replace('{time}', 'Just now')}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="text-red-500">{t('settings.security.signOut')}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SettingsPage;
