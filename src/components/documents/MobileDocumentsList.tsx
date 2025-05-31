
import { useState } from "react";
import { useDocuments, useDeleteDocument, getDocumentUrl } from "@/services/documentsService";
import { MobileCard } from "@/components/ui/mobile-card";
import { FileText, FileImage } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const MobileDocumentsList = () => {
  const { data: documents = [], isLoading, error } = useDocuments();
  const deleteDocument = useDeleteDocument();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  
  const handleDownload = async (document: { name: string, url?: string }) => {
    try {
      let downloadUrl = document.url;
      
      if (!downloadUrl) {
        downloadUrl = await getDocumentUrl(document.name);
      }
      
      const link = window.document.createElement('a');
      link.href = downloadUrl;
      link.download = document.name.split('-').slice(1).join('-');
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      toast({
        title: t('documents.list.downloadStarted'),
        description: t('documents.list.downloadingFile').replace('{filename}', document.name.split('-').slice(1).join('-')),
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        title: t('documents.list.downloadFailed'),
        description: t('documents.list.downloadFailedDesc'),
      });
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;
    
    try {
      await deleteDocument.mutate(documentToDelete, {
        onSuccess: () => {
          toast({
            title: t('documents.list.documentDeleted'),
            description: t('documents.list.documentDeletedDesc'),
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: t('documents.list.deleteFailed'),
            description: error.message,
          });
        }
      });
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDocumentToDelete(null);
    }
  };
  
  const formatFileName = (name: string) => {
    return name.split('-').slice(1).join('-');
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const getFileIcon = (type: string) => {
    if (type.includes('image')) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    return <FileText className="h-5 w-5 text-amber-500" />;
  };
  
  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500 mx-auto"></div>
        <p className="mt-2 text-gray-500">{t('documents.list.loading')}</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        {t('documents.list.errorLoading')}: {error instanceof Error ? error.message : t('documents.list.unknownError')}
      </div>
    );
  }
  
  if (documents.length === 0) {
    return (
      <div className="py-10 text-center">
        <FileText className="h-16 w-16 mx-auto text-gray-300" />
        <p className="mt-2 text-gray-500">{t('documents.list.noDocuments')}</p>
        <p className="text-sm text-gray-400">{t('documents.list.uploadFirst')}</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-3">
        {documents.map((document) => (
          <MobileCard
            key={document.id || document.name}
            title={formatFileName(document.name)}
            subtitle={`${document.type.split('/').pop() || t('documents.list.unknown')} • ${formatFileSize(document.size)}`}
            icon={getFileIcon(document.type)}
            primaryInfo={formatDate(document.created_at)}
            actions={[
              {
                label: t('documents.list.download'),
                onClick: () => handleDownload(document)
              },
              {
                label: t('documents.list.delete'),
                onClick: () => setDocumentToDelete(document.name),
                variant: "destructive"
              }
            ]}
          />
        ))}
      </div>
      
      <AlertDialog open={!!documentToDelete} onOpenChange={(open) => !open && setDocumentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('documents.list.deleteConfirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('documents.list.deleteDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              {t('action.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
