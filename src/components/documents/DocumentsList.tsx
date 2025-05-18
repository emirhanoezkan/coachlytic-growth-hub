
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
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  
  const handleDownload = async (document: { name: string, url?: string }) => {
    try {
      let downloadUrl = document.url;
      
      if (!downloadUrl) {
        downloadUrl = await getDocumentUrl(document.name);
      }
      
      // Create a temporary link and click it to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = document.name.split('-').slice(1).join('-'); // Remove timestamp prefix
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `Downloading ${document.name.split('-').slice(1).join('-')}`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Unable to download the document. Please try again.",
      });
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;
    
    try {
      await deleteDocument.mutate(documentToDelete, {
        onSuccess: () => {
          toast({
            title: "Document deleted",
            description: "The document has been successfully deleted.",
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Delete failed",
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
    // Remove timestamp prefix from file name
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
        <p className="mt-2 text-gray-500">Loading documents...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        Error loading documents: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  
  if (documents.length === 0) {
    return (
      <div className="py-10 text-center">
        <FileText className="h-16 w-16 mx-auto text-gray-300" />
        <p className="mt-2 text-gray-500">No documents uploaded yet</p>
        <p className="text-sm text-gray-400">Upload your first document above</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id || document.name}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {getFileIcon(document.type)}
                    <span className="font-medium truncate max-w-[200px]">
                      {formatFileName(document.name)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{document.type.split('/').pop() || 'Unknown'}</TableCell>
                <TableCell>{formatFileSize(document.size)}</TableCell>
                <TableCell>{formatDate(document.created_at)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(document)}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDocumentToDelete(document.name)}
                        className="text-red-500 hover:text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
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
            <AlertDialogTitle>Are you sure you want to delete this document?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The document will be permanently deleted from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
