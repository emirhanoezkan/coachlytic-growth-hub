
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
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  fullScreenOnMobile = true,
  className
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          // Mobile-first: full screen on mobile with proper spacing
          fullScreenOnMobile && "h-screen w-screen max-w-none rounded-none sm:h-auto sm:w-auto sm:max-w-lg sm:rounded-lg",
          // Desktop: normal dialog with better sizing
          !fullScreenOnMobile && "w-[calc(100vw-1.5rem)] max-w-lg sm:w-auto",
          "p-0 gap-0 flex flex-col",
          className
        )}
      >
        {/* Header with close button for mobile */}
        <DialogHeader className="p-4 sm:p-6 border-b flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-left">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground mt-2 text-left">
                  {description}
                </DialogDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 flex-shrink-0 sm:hidden"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Content with proper scrolling */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <DialogFooter className="p-4 sm:p-6 border-t flex-shrink-0 gap-3">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
