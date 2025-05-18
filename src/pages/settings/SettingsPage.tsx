
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SettingsPage = () => {
  const { t } = useI18n();
  const { toast } = useToast();

  const [showApiKey, setShowApiKey] = React.useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: t('success'),
      description: t('settingsSaved'),
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-semibold text-gray-900">{t('settings')}</h1>
          <p className="text-gray-500 mt-1">Manage your account settings.</p>
        </div>
        
        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="password">{t('securitySettings')}</TabsTrigger>
            <TabsTrigger value="language">{t('languageSettings')}</TabsTrigger>
            <TabsTrigger value="api">{t('apiKeys')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('notificationSettings')}</CardTitle>
                <CardDescription>Choose which notifications you want to receive.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session Reminders</p>
                        <p className="text-sm text-gray-500">Get notified before upcoming sessions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Notifications</p>
                        <p className="text-sm text-gray-500">Get notified about new payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Client Activity</p>
                        <p className="text-sm text-gray-500">Get notified when clients complete tasks</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-app Notifications</p>
                        <p className="text-sm text-gray-500">Show notifications in the app</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sound Alerts</p>
                        <p className="text-sm text-gray-500">Play sounds for important alerts</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings} className="bg-forest-500 hover:bg-forest-600">
                      {t('save')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('securitySettings')}</CardTitle>
                <CardDescription>Update your password and security settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleSaveSettings} className="bg-forest-500 hover:bg-forest-600">
                      {t('changePassword')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="language" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('languageSettings')}</CardTitle>
                <CardDescription>Choose your preferred language.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                      <input type="radio" id="english" name="language" value="english" defaultChecked />
                      <Label htmlFor="english" className="cursor-pointer flex-1">{t('english')}</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                      <input type="radio" id="turkish" name="language" value="turkish" />
                      <Label htmlFor="turkish" className="cursor-pointer flex-1">{t('turkish')}</Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings} className="bg-forest-500 hover:bg-forest-600">
                      {t('save')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('apiKeys')}</CardTitle>
                <CardDescription>Manage your API keys.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="mt-1 flex">
                        <Input 
                          id="apiKey" 
                          type={showApiKey ? "text" : "password"}
                          value="ck_1a2b3c4d5e6f7g8h9i0j"
                          readOnly
                          className="flex-1 font-mono"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="ml-2" 
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" className="ml-2">Copy</Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Never share your API key publicly. Use environment variables to store your key in applications.</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Webhook Notifications</p>
                        <p className="text-sm text-gray-500">Enable webhook notifications for events</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input id="webhookUrl" placeholder="https://your-app.com/webhook" className="mt-1" />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">{t('delete')} API Key</Button>
                    <Button className="bg-forest-500 hover:bg-forest-600">Generate New Key</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
