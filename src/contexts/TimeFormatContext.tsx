
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

type TimeFormat = '12h' | '24h';

interface TimeFormatContextType {
  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => Promise<void>;
  formatTime: (date: Date | string) => string;
}

const TimeFormatContext = createContext<TimeFormatContextType | undefined>(undefined);

export const TimeFormatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>('12h');
  
  useEffect(() => {
    // Load user preference from profile
    const loadTimeFormat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('time_format')
          .eq('id', user.id)
          .single();
        
        if (data?.time_format) {
          setTimeFormatState(data.time_format as TimeFormat);
        }
      }
    };
    
    loadTimeFormat();
  }, []);
  
  const setTimeFormat = async (format: TimeFormat) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ time_format: format, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      
      setTimeFormatState(format);
    }
  };
  
  const formatTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (timeFormat === '12h') {
      return dateObj.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    } else {
      return dateObj.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
    }
  };
  
  return (
    <TimeFormatContext.Provider value={{ timeFormat, setTimeFormat, formatTime }}>
      {children}
    </TimeFormatContext.Provider>
  );
};

export const useTimeFormat = () => {
  const context = useContext(TimeFormatContext);
  if (context === undefined) {
    throw new Error('useTimeFormat must be used within a TimeFormatProvider');
  }
  return context;
};
