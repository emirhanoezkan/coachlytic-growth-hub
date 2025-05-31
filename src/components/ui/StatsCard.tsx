
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
    <Card className={cn("hover-card h-full", className)}>
      <CardContent className="p-3 sm:p-4 md:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 sm:p-2.5 bg-forest-100 rounded-lg flex-shrink-0">
              {icon}
            </div>
          </div>
          <div className={cn(
            "flex items-center text-xs sm:text-sm font-medium",
            changeType === "increase" ? "text-green-600" : "text-red-600"
          )}>
            {changeType === "increase" ? (
              <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            ) : (
              <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            )}
            <span className="whitespace-nowrap">{change}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            {value}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-tight">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
