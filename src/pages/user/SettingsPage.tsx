
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, Globe, Lock, Settings, WifiOff } from "lucide-react";

const SettingsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    reminderNotifications: true,
    marketingCommunications: false,
    timezone: "America/New_York",
    sessionReminders: 24,
    darkMode: false
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
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
                <h1 className="text-2xl font-display font-semibold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your application preferences</p>
              </div>
              
              <Tabs defaultValue="notifications">
                <TabsList className="grid grid-cols-4 max-w-lg">
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    Integrations
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage how you receive notifications from Coachlytic</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-gray-500">Receive email updates about sessions and clients</p>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="reminder-notifications">Session Reminders</Label>
                            <p className="text-sm text-gray-500">Receive notifications before scheduled sessions</p>
                          </div>
                          <Switch 
                            id="reminder-notifications" 
                            checked={settings.reminderNotifications}
                            onCheckedChange={(checked) => setSettings({...settings, reminderNotifications: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketing-communications">Marketing Communications</Label>
                            <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                          </div>
                          <Switch 
                            id="marketing-communications" 
                            checked={settings.marketingCommunications}
                            onCheckedChange={(checked) => setSettings({...settings, marketingCommunications: checked})}
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handleSave} className="bg-forest-500 hover:bg-forest-600">Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Preferences</CardTitle>
                      <CardDescription>Customize your Coachlytic experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Default Timezone</Label>
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
                          <Label htmlFor="session-reminders">Session Reminder Time (Hours)</Label>
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
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-gray-500">Enable dark mode for the application</p>
                        </div>
                        <Switch 
                          id="dark-mode" 
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                        />
                      </div>
                      
                      <Button onClick={handleSave} className="bg-forest-500 hover:bg-forest-600">Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations">
                  <Card>
                    <CardHeader>
                      <CardTitle>External Integrations</CardTitle>
                      <CardDescription>Connect with other platforms and services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {["Google Calendar", "Microsoft Outlook", "Zoom", "Stripe", "Slack"].map((integration) => (
                          <div key={integration} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <h4 className="font-medium">{integration}</h4>
                              <p className="text-sm text-gray-500">Connect your {integration} account</p>
                            </div>
                            <Button variant="outline">Connect</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <p className="text-sm text-gray-500 mb-4">Update your password regularly for better security</p>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Active Sessions</h3>
                        <p className="text-sm text-gray-500 mb-4">Manage devices where you're currently signed in</p>
                        <div className="border rounded-md p-4 mb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <WifiOff className="h-5 w-5 mr-2 text-forest-500" />
                              <div>
                                <p className="font-medium">Current Device</p>
                                <p className="text-sm text-gray-500">Last active: Just now</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="text-red-500">Sign Out All Other Devices</Button>
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
