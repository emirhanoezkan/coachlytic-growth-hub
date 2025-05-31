
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
    <Card className={cn("w-full touch-manipulation", className)}>
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <CardTitle 
              className={cn(
                "text-base sm:text-lg font-medium line-clamp-2 leading-tight",
                onClick && "cursor-pointer hover:underline"
              )}
              onClick={onClick}
            >
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-tight">
                {subtitle}
              </p>
            )}
          </div>
          {(actions || onClick) && (
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              {onClick && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 touch-manipulation"
                  onClick={onClick}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {actions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 touch-manipulation">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {actions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={action.onClick}
                        className={cn(
                          "cursor-pointer py-3 text-sm",
                          action.variant === "destructive" && "text-red-600 focus:text-red-600"
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
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {status && (
            <Badge className={cn(getStatusVariantClass(statusVariant), "text-xs")} variant="secondary">
              {status}
            </Badge>
          )}
          
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {(primaryInfo || secondaryInfo) && (
            <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0 text-sm">
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
