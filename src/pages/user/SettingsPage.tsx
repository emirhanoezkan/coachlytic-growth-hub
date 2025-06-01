
import React, { useState, useEffect } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { PageHeader } from "@/components/ui/page-header";
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
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <PageHeader 
          title={t('settings.title')}
          subtitle={t('settings.subtitle')}
        />
        
        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-full sm:max-w-lg">
            <TabsTrigger value="notifications" className="flex items-center text-xs sm:text-sm">
              <Bell className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t('settings.tabs.notifications')}</span>
              <span className="xs:hidden">Notif</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center text-xs sm:text-sm">
              <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t('settings.tabs.preferences')}</span>
              <span className="xs:hidden">Pref</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center text-xs sm:text-sm">
              <Globe className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t('settings.tabs.integrations')}</span>
              <span className="xs:hidden">Integ</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center text-xs sm:text-sm">
              <Lock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{t('settings.tabs.security')}</span>
              <span className="xs:hidden">Sec</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">{t('settings.notifications.title')}</CardTitle>
                <CardDescription className="text-sm">{t('settings.notifications.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <Label htmlFor="email-notifications" className="text-sm sm:text-base">{t('settings.notifications.email')}</Label>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{t('settings.notifications.emailDesc')}</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <Label htmlFor="reminder-notifications" className="text-sm sm:text-base">{t('settings.notifications.reminders')}</Label>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{t('settings.notifications.remindersDesc')}</p>
                    </div>
                    <Switch 
                      id="reminder-notifications" 
                      checked={settings.reminderNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, reminderNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <Label htmlFor="marketing-communications" className="text-sm sm:text-base">{t('settings.notifications.marketing')}</Label>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{t('settings.notifications.marketingDesc')}</p>
                    </div>
                    <Switch 
                      id="marketing-communications" 
                      checked={settings.marketingCommunications}
                      onCheckedChange={(checked) => setSettings({...settings, marketingCommunications: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSave} className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10">{t('settings.saveChanges')}</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">{t('settings.preferences.title')}</CardTitle>
                <CardDescription className="text-sm">{t('settings.preferences.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm sm:text-base">{t('settings.preferences.timezone')}</Label>
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
                    <Label htmlFor="session-reminders" className="text-sm sm:text-base">{t('settings.preferences.reminderTime')}</Label>
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
                    <CardTitle className="text-base sm:text-lg">{t('settings.taxRate.title')}</CardTitle>
                    <CardDescription className="text-sm">{t('settings.taxRate.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-1 w-full">
                        <Label htmlFor="defaultTaxRate" className="text-sm sm:text-base">{t('settings.taxRate.label')}</Label>
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
                        className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10"
                      >
                        {isUpdating ? t('action.saving') : t('settings.taxRate.saveButton')}
                      </Button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {t('settings.taxRate.helpText')}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Time Format Settings */}
                <TimeFormatSettings />
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <Label htmlFor="dark-mode" className="text-sm sm:text-base">{t('settings.preferences.darkMode')}</Label>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{t('settings.preferences.darkModeDesc')}</p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                  />
                </div>
                
                <Button onClick={handleSave} className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10">{t('settings.saveChanges')}</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">{t('settings.integrations.title')}</CardTitle>
                <CardDescription className="text-sm">{t('settings.integrations.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Google Calendar", "Microsoft Outlook", "Zoom", "Stripe", "Slack"].map((integration) => (
                    <div key={integration} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 space-y-2 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">{integration}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                          {t('settings.integrations.connect').replace('{integration}', integration)}
                        </p>
                      </div>
                      <Button variant="outline" className="w-full sm:w-auto h-12 sm:h-10">{t('settings.integrations.connectButton')}</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">{t('settings.security.title')}</CardTitle>
                <CardDescription className="text-sm">{t('settings.security.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium">{t('settings.security.changePassword')}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">{t('settings.security.changePasswordDesc')}</p>
                  <Button variant="outline" className="w-full sm:w-auto h-12 sm:h-10">{t('settings.security.changePassword')}</Button>
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-medium">{t('settings.security.2fa')}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">{t('settings.security.2faDesc')}</p>
                  <Button variant="outline" className="w-full sm:w-auto h-12 sm:h-10">{t('settings.security.2fa')}</Button>
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-medium">{t('settings.security.sessions')}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">{t('settings.security.sessionsDesc')}</p>
                  <div className="border rounded-md p-3 sm:p-4 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <WifiOff className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-forest-500" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base">{t('settings.security.currentDevice')}</p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{t('settings.security.lastActive').replace('{time}', 'Just now')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="text-red-500 w-full sm:w-auto h-12 sm:h-10">{t('settings.security.signOut')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  );
};

export default SettingsPage;
