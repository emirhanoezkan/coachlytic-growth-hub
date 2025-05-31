
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MobileCardAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface MobileCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  statusVariant?: "default" | "secondary" | "destructive" | "outline" | "warning" | "success";
  progress?: number;
  primaryInfo?: React.ReactNode;
  secondaryInfo?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  actions?: MobileCardAction[];
  className?: string;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  subtitle,
  status,
  statusVariant = "default",
  progress,
  primaryInfo,
  secondaryInfo,
  icon,
  onClick,
  actions = [],
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleActionClick = (action: MobileCardAction, e: React.MouseEvent) => {
    e.stopPropagation();
    action.onClick();
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg border shadow-sm p-4 min-h-[44px]",
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 mt-1">
              {icon}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate">{title}</h3>
              {status && (
                <Badge variant={statusVariant} className="text-xs flex-shrink-0">
                  {status}
                </Badge>
              )}
            </div>
            
            {subtitle && (
              <p className="text-sm text-gray-500 truncate mb-2">{subtitle}</p>
            )}
            
            {primaryInfo && (
              <div className="mb-1">
                {primaryInfo}
              </div>
            )}
            
            {progress !== undefined && (
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-forest-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {secondaryInfo && (
              <p className="text-xs text-gray-400">{secondaryInfo}</p>
            )}
          </div>
        </div>
        
        {actions.length > 0 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {actions.length <= 2 ? (
              // Show buttons directly for 1-2 actions
              <div className="flex gap-1">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant === "destructive" ? "destructive" : "outline"}
                    size="sm"
                    className="h-8 px-2 text-xs min-h-[44px] md:min-h-[32px]"
                    onClick={(e) => handleActionClick(action, e)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ) : (
              // Use dropdown for 3+ actions
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 min-h-[44px] min-w-[44px] md:min-h-[32px] md:min-w-[32px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background">
                  {actions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={(e) => handleActionClick(action, e)}
                      className={cn(
                        "cursor-pointer min-h-[44px]",
                        action.variant === "destructive" && "text-red-600 hover:text-red-700 focus:text-red-700"
                      )}
                    >
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
