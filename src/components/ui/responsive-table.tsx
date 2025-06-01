
import React from 'react';
import { cn } from "@/lib/utils";

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      "overflow-x-auto -mx-3 sm:mx-0 rounded-lg border",
      className
    )}>
      <div className="min-w-full">
        {children}
      </div>
    </div>
  );
};
