
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
          // Mobile-first: full screen on mobile
          fullScreenOnMobile && "h-screen w-screen max-w-none sm:h-auto sm:w-auto sm:max-w-lg rounded-none sm:rounded-lg",
          // Desktop: normal dialog
          !fullScreenOnMobile && "w-[95vw] max-w-lg sm:w-auto",
          "p-0 gap-0",
          className
        )}
      >
        {/* Mobile header with close button */}
        <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4 border-b sm:border-b-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-base sm:text-lg font-semibold">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </DialogDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 ml-2 sm:hidden"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 pt-2 sm:pt-4">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <DialogFooter className="p-4 sm:p-6 pt-2 sm:pt-4 border-t sm:border-t-0">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
