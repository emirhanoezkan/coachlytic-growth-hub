
import React from 'react';
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0",
      className
    )}>
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="w-full sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};
