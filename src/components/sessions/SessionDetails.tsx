
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
import { Clock, MapPin, User, CalendarDays, FileText } from "lucide-react";

interface SessionDetailsProps {
  session: {
    id: string;
    title: string;
    clients: { name: string };
    date: string;
    duration: number;
    status: string;
    notes?: string;
    location_type: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SessionDetails: React.FC<SessionDetailsProps> = ({
  session,
  open,
  onOpenChange
}) => {
  const { t } = useLanguage();
  const { formatTime } = useTimeFormat();

  if (!session) return null;

  const sessionDate = new Date(session.date);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{session.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge className={
              session.status === "scheduled" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
              session.status === "completed" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
              "bg-red-100 text-red-800 hover:bg-red-200"
            }>
              {t(`sessions.status.${session.status}`)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t('sessions.client')}</p>
                <p className="font-medium">{session.clients?.name || "Unknown Client"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t('sessions.date')}</p>
                <p className="font-medium">{format(sessionDate, 'EEEE, MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t('sessions.time')}</p>
                <p className="font-medium">{formatTime(sessionDate)} ({session.duration} {t('time.min')})</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">{t('sessions.locationType')}</p>
                <p className="font-medium">{t(`sessions.location.${session.location_type}`)}</p>
              </div>
            </div>
          </div>
          
          {session.notes && (
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">{t('sessions.notes')}</h3>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{session.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
