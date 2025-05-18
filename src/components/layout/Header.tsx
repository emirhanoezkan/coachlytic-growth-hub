
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";
import { enUS } from "@/i18n/en-US"; // Import enUS for type safety

interface HeaderProps {
  title?: string;
}

interface NotificationType {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const sampleNotifications: NotificationType[] = [
  {
    id: 1,
    title: "Upcoming Session",
    message: "Session with Sarah Johnson in 30 minutes",
    time: "30m",
    read: false
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Michael Chen paid invoice #INV-002",
    time: "2h",
    read: false
  },
  {
    id: 3,
    title: "Overdue Invoice",
    message: "Invoice #INV-004 for Robert Wilson is overdue",
    time: "1d",
    read: true
  }
];

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t, locale, changeLocale } = useI18n();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationType[]>(sampleNotifications);
  const [searchValue, setSearchValue] = useState("");

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      toast({
        title: t('search'),
        description: `Searching for "${searchValue}"...`,
      });
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: t('success'),
      description: "All notifications marked as read",
    });
  };

  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          {title && <h1 className="text-2xl font-display font-semibold text-gray-800">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:bg-white"
              />
            </form>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Globe className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>{t('languageSettings')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={locale === 'en'} 
                onCheckedChange={() => changeLocale('en')}
              >
                {locale === 'en' && <Check className="h-4 w-4 mr-2" />}
                {t('english')}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={locale === 'tr'} 
                onCheckedChange={() => changeLocale('tr')}
              >
                {locale === 'tr' && <Check className="h-4 w-4 mr-2" />}
                {t('turkish')}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-forest-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[350px]">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>{t('notifications')}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  disabled={unreadCount === 0}
                  onClick={markAllAsRead}
                  className="text-xs h-7"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="py-4 px-3 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map(notification => (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={`px-4 py-3 flex flex-col items-start cursor-pointer ${!notification.read ? 'bg-forest-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <span className="text-sm text-gray-600 mt-1">{notification.message}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('account')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">{t('profile')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">{t('settings')}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/landing">{t('logout')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
