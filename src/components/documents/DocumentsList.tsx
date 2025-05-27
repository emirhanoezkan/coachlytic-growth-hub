
import { useState } from "react";
import { useDocuments, useDeleteDocument, getDocumentUrl } from "@/services/documentsService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Download, Trash2, FileText, FileImage } from "lucide-react";
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

export const DocumentsList = () => {
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
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto"> {/* Added horizontal scroll wrapper */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-2 px-2 sm:py-3 sm:px-4">{t('documents.list.document')}</TableHead>
                <TableHead className="hidden sm:table-cell py-2 px-2 sm:py-3 sm:px-4">{t('documents.list.type')}</TableHead>
                <TableHead className="hidden md:table-cell py-2 px-2 sm:py-3 sm:px-4">{t('documents.list.size')}</TableHead>
                <TableHead className="hidden sm:table-cell py-2 px-2 sm:py-3 sm:px-4">{t('documents.list.dateAdded')}</TableHead>
                <TableHead className="py-2 px-2 sm:py-3 sm:px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id || document.name}>
                  <TableCell className="py-2 px-2 sm:py-3 sm:px-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {getFileIcon(document.type)}
                      <span className="font-medium truncate max-w-[150px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-xs lg:max-w-sm">
                        {formatFileName(document.name)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell py-2 px-2 sm:py-3 sm:px-4">{document.type.split('/').pop() || t('documents.list.unknown')}</TableCell>
                  <TableCell className="hidden md:table-cell py-2 px-2 sm:py-3 sm:px-4">{formatFileSize(document.size)}</TableCell>
                  <TableCell className="hidden sm:table-cell py-2 px-2 sm:py-3 sm:px-4">{formatDate(document.created_at)}</TableCell>
                  <TableCell className="py-2 px-2 sm:py-3 sm:px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 p-0"> {/* Adjusted button size */}
                          <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {/* Adjusted icon size */}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(document)}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>{t('documents.list.download')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDocumentToDelete(document.name)}
                        className="text-red-500 hover:text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>{t('documents.list.delete')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
