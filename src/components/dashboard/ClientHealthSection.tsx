
import React from "react";
import { Progress } from "@/components/ui/progress";

export const ClientHealthSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Client Health</h3>
      {[
        { name: "High Performers", value: 45, color: "bg-gradient-to-r from-ocean-400 to-ocean-500" },
        { name: "On Track", value: 32, color: "bg-gradient-to-r from-vivid-400 to-vivid-500" },
        { name: "Needs Attention", value: 15, color: "bg-gradient-to-r from-yellow-400 to-yellow-500" },
        { name: "At Risk", value: 8, color: "bg-gradient-to-r from-red-400 to-red-500" }
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
