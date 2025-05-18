import React from "react";
import { Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSessions } from "@/services/sessionsService";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
import { format, isToday, isTomorrow, addDays } from "date-fns";

export const UpcomingSessionsSection: React.FC = () => {
  const { t } = useLanguage();
  const { formatTime } = useTimeFormat();
  const { data: allSessions = [], isLoading, error } = useSessions();
  
  // Filter for upcoming sessions only (today and future dates)
  // Sort by the closest upcoming date
  const upcomingSessions = React.useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today
    
    return allSessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 4); // Only show the next 4 sessions
  }, [allSessions]);
  
  // Format the display date
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return t('time.today');
    } else if (isTomorrow(date)) {
      return t('time.tomorrow');
    } else if (date <= addDays(new Date(), 7)) {
      // If within a week, show day name
      return format(date, 'EEEE');
    } else {
      // Otherwise show full date
      return format(date, 'MMM d');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="animate-pulse flex flex-col gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{t('dashboard.errorLoading')}</p>
      </div>
    );
  }
  
  if (upcomingSessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{t('dashboard.noUpcomingSessions')}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {upcomingSessions.map((session) => (
        <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-lavender-100 text-lavender-500 p-2 rounded-full">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{session.clients?.name || t('dashboard.unnamed')}</p>
              <p className="text-sm text-gray-500">
                {session.title || t(session.location_type)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-gray-400" />
              <p className="font-medium">{formatTime(new Date(session.date))}</p>
            </div>
            <p className="text-sm text-gray-500">
              {formatDisplayDate(session.date)}
              {' • '}
              {session.duration} {t('time.min')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
