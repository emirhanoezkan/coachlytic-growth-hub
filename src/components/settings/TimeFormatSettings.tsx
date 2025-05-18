
import React from "react";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
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

  const handleFormatChange = (value: string) => {
    setTimeFormat(value as '12h' | '24h');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Format</CardTitle>
        <CardDescription>Choose how times are displayed throughout the application</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={timeFormat} 
          onValueChange={handleFormatChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="12h" id="12h" />
            <Label htmlFor="12h" className="cursor-pointer">12-hour (AM/PM)</Label>
            <span className="text-sm text-gray-500 ml-2">Example: 2:30 PM</span>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="24h" id="24h" />
            <Label htmlFor="24h" className="cursor-pointer">24-hour</Label>
            <span className="text-sm text-gray-500 ml-2">Example: 14:30</span>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
