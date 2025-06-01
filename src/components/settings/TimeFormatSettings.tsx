
import React from "react";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export const TimeFormatSettings: React.FC = () => {
  const { timeFormat, setTimeFormat } = useTimeFormat();
  const { t } = useLanguage();

  const handleFormatChange = (value: string) => {
    setTimeFormat(value as '12h' | '24h');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">{t('settings.timeFormat.title')}</CardTitle>
        <CardDescription className="text-sm">{t('settings.timeFormat.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={timeFormat} 
          onValueChange={handleFormatChange}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12h" id="12h" />
              <Label htmlFor="12h" className="cursor-pointer text-sm sm:text-base">{t('settings.timeFormat.12hour')}</Label>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 sm:ml-2">{t('settings.timeFormat.12hourExample')}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24h" id="24h" />
              <Label htmlFor="24h" className="cursor-pointer text-sm sm:text-base">{t('settings.timeFormat.24hour')}</Label>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 sm:ml-2">{t('settings.timeFormat.24hourExample')}</span>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
