
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-display font-semibold text-gray-900">{t('documents.title')}</h1>
                <p className="text-gray-500 mt-1">{t('documents.subtitle')}</p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('documents.upload')}</CardTitle>
                  <CardDescription>
                    {t('documents.uploadDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentUploader />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('documents.library')}</CardTitle>
                  <CardDescription>
                    {t('documents.access')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentsList />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DocumentsPage;
