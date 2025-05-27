
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
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-display font-semibold text-gray-900">{t('settings.title')}</h1>
                <p className="text-gray-500 mt-1">{t('settings.subtitle')}</p>
              </div>
              
              <Tabs defaultValue="notifications">
                {/* Responsive TabsList: 2 columns on small screens, 4 on sm and up. Removed max-w-lg to allow flex wrapping. */}
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2">
                  <TabsTrigger value="notifications" className="flex items-center justify-center sm:justify-start text-xs sm:text-sm py-2">
                    <Bell className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="truncate">{t('settings.tabs.notifications')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center justify-center sm:justify-start text-xs sm:text-sm py-2">
                    <Settings className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="truncate">{t('settings.tabs.preferences')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="flex items-center justify-center sm:justify-start text-xs sm:text-sm py-2">
                    <Globe className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="truncate">{t('settings.tabs.integrations')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center justify-center sm:justify-start text-xs sm:text-sm py-2">
                    <Lock className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="truncate">{t('settings.tabs.security')}</span>
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
                        {/* Email Notifications */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-grow">
                            <Label htmlFor="email-notifications">{t('settings.notifications.email')}</Label>
                            <p className="text-sm text-gray-500">{t('settings.notifications.emailDesc')}</p>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                            className="flex-shrink-0"
                          />
                        </div>
                        
                        {/* Reminder Notifications */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-grow">
                            <Label htmlFor="reminder-notifications">{t('settings.notifications.reminders')}</Label>
                            <p className="text-sm text-gray-500">{t('settings.notifications.remindersDesc')}</p>
                          </div>
                          <Switch 
                            id="reminder-notifications" 
                            checked={settings.reminderNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, reminderNotifications: checked})}
                            className="flex-shrink-0"
                          />
                        </div>
                        
                        {/* Marketing Communications */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-grow">
                            <Label htmlFor="marketing-communications">{t('settings.notifications.marketing')}</Label>
                            <p className="text-sm text-gray-500">{t('settings.notifications.marketingDesc')}</p>
                          </div>
                          <Switch 
                            id="marketing-communications" 
                            checked={settings.marketingCommunications}
                            onCheckedChange={(checked) => setSettings({...settings, marketingCommunications: checked})}
                            className="flex-shrink-0"
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
                          {/* Responsive layout for tax rate input and button */}
                          <div className="flex flex-col xs:flex-row xs:items-end xs:space-x-4 space-y-3 xs:space-y-0">
                            <div className="flex-grow space-y-2">
                              <Label htmlFor="defaultTaxRate">{t('settings.taxRate.label')}</Label>
                              <Input
                                id="defaultTaxRate"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={tempTaxRate}
                                onChange={(e) => setTempTaxRate(parseFloat(e.target.value) || 0)}
                                placeholder={t('settings.taxRate.placeholder')}
                              />
                            </div>
                            <Button 
                              onClick={handleTaxRateSave}
                              disabled={isUpdating || tempTaxRate === defaultTaxRate}
                              className="bg-forest-500 hover:bg-forest-600 w-full xs:w-auto flex-shrink-0"
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
                          <div key={integration} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 border-b pb-4">
                            <div className="flex-grow">
                              <h4 className="font-medium">{integration}</h4>
                              <p className="text-sm text-gray-500">
                                {t('settings.integrations.connect').replace('{integration}', integration)}
                              </p>
                            </div>
                            <Button variant="outline" className="w-full sm:w-auto flex-shrink-0">
                              {t('settings.integrations.connectButton')}
                            </Button>
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
