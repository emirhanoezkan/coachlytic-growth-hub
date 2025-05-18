
import React from "react";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const UpcomingSessionsSection: React.FC = () => {
  const { t } = useLanguage();
  
  const sessions = [
    {
      time: "10:00 AM",
      client: "Sarah Johnson",
      type: "sessionType.career",
      duration: "45 min"
    },
    {
      time: "11:30 AM",
      client: "Michael Chen",
      type: "sessionType.business",
      duration: "60 min"
    },
    {
      time: "2:00 PM",
      client: "Emma Davis",
      type: "sessionType.life",
      duration: "45 min"
    },
    {
      time: "4:30 PM",
      client: "Robert Wilson",
      type: "sessionType.executive",
      duration: "60 min"
    }
  ];
  
  return (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-lavender-100 text-lavender-500 p-2 rounded-full">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{session.client}</p>
              <p className="text-sm text-gray-500">{t(session.type)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{session.time}</p>
            <p className="text-sm text-gray-500">{session.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
