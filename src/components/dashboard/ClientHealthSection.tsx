
import React from "react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

export const ClientHealthSection: React.FC = () => {
  const { t } = useLanguage();
  
  const healthCategories = [
    { name: "clientHealth.highPerformers", value: 45, color: "bg-forest-500" },
    { name: "clientHealth.onTrack", value: 32, color: "bg-forest-300" },
    { name: "clientHealth.needsAttention", value: 15, color: "bg-yellow-400" },
    { name: "clientHealth.atRisk", value: 8, color: "bg-red-500" }
  ];
  
  return (
    <div className="space-y-4">
      {healthCategories.map((item) => (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t(item.name)}</span>
            <span className="text-sm text-gray-500">{item.value}%</span>
          </div>
          <Progress value={item.value} className={item.color} />
        </div>
      ))}
    </div>
  );
};
