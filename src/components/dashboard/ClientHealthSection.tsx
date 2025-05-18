
import React from "react";
import { Progress } from "@/components/ui/progress";

export const ClientHealthSection: React.FC = () => {
  return (
    <div className="space-y-4">
      {[
        { name: "High Performers", value: 45, color: "bg-forest-500" },
        { name: "On Track", value: 32, color: "bg-forest-300" },
        { name: "Needs Attention", value: 15, color: "bg-yellow-400" },
        { name: "At Risk", value: 8, color: "bg-red-500" }
      ].map((item) => (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-gray-500">{item.value}%</span>
          </div>
          <Progress value={item.value} className={item.color} />
        </div>
      ))}
    </div>
  );
};
