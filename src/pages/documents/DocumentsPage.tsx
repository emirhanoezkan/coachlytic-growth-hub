
import React from "react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { DocumentUploader } from "@/components/documents/DocumentUploader";
import { DocumentsList } from "@/components/documents/DocumentsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const DocumentsPage = () => {
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
            {t('documents.title')}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            {t('documents.subtitle')}
          </p>
        </div>
        
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg md:text-xl">
              {t('documents.uploadTitle')}
            </CardTitle>
            <CardDescription className="text-sm">
              {t('documents.uploadDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <DocumentUploader />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg md:text-xl">
              {t('documents.library')}
            </CardTitle>
            <CardDescription className="text-sm">
              {t('documents.access')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="overflow-x-auto">
              <DocumentsList />
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
};

export default DocumentsPage;
