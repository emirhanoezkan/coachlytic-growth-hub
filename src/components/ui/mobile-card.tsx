
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MobileCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  statusVariant?: "default" | "success" | "warning" | "destructive";
  progress?: number;
  primaryInfo?: React.ReactNode;
  secondaryInfo?: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive";
  }>;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  subtitle,
  status,
  statusVariant = "default",
  progress,
  primaryInfo,
  secondaryInfo,
  actions,
  onClick,
  className,
  children
}) => {
  const getStatusVariantClass = (variant: string) => {
    switch (variant) {
      case "success":
        return "bg-forest-100 text-forest-800 hover:bg-forest-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "destructive":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2 sm:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle 
              className={cn(
                "text-sm sm:text-base font-medium truncate",
                onClick && "cursor-pointer hover:underline"
              )}
              onClick={onClick}
            >
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          {(actions || onClick) && (
            <div className="flex items-center gap-1 ml-2">
              {onClick && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={onClick}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {actions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {actions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={action.onClick}
                        className={action.variant === "destructive" ? "text-red-600" : ""}
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
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {status && (
            <Badge className={getStatusVariantClass(statusVariant)} variant="secondary">
              {status}
            </Badge>
          )}
          
          {progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {(primaryInfo || secondaryInfo) && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs sm:text-sm">
              {primaryInfo && <div className="font-medium">{primaryInfo}</div>}
              {secondaryInfo && <div className="text-muted-foreground">{secondaryInfo}</div>}
            </div>
          )}
          
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
