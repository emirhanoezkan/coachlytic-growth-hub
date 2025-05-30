
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: "increase" | "decrease";
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
  className
}) => {
  return (
    <Card className={cn("hover-card", className)}>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 sm:p-2 bg-forest-100 rounded-lg">
              {icon}
            </div>
          </div>
          <div className={cn(
            "flex items-center text-xs sm:text-sm",
            changeType === "increase" ? "text-green-600" : "text-red-600"
          )}>
            {changeType === "increase" ? (
              <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            )}
            {change}
          </div>
        </div>
        <div className="mt-2 sm:mt-4">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {value}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
