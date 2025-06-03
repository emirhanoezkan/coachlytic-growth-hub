
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  fullScreenOnMobile?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  fullScreenOnMobile = true,
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg", 
    xl: "sm:max-w-xl"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          // Mobile-first: full screen on mobile with proper spacing
          fullScreenOnMobile && "h-screen w-screen max-w-none rounded-none sm:h-auto sm:w-auto sm:rounded-lg",
          // Desktop: responsive sizing based on size prop
          !fullScreenOnMobile && "w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)]",
          sizeClasses[size],
          "p-0 gap-0 flex flex-col max-h-screen",
          className
        )}
      >
        {/* Header with close button for mobile */}
        <DialogHeader className="p-3 sm:p-4 lg:p-6 border-b flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-3">
              <DialogTitle className="text-base sm:text-lg lg:text-xl font-semibold text-left">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 text-left">
                  {description}
                </DialogDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 flex-shrink-0 sm:hidden"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Content with proper scrolling */}
        <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <DialogFooter className="p-3 sm:p-4 lg:p-6 border-t flex-shrink-0 gap-2 sm:gap-3">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
