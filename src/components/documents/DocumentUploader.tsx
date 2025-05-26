
import { useState } from "react";
import { useUploadDocument } from "@/services/documentsService";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, FileX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const DocumentUploader = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const uploadDocument = useUploadDocument();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };
  
  const handleClearFile = () => {
    setFile(null);
    setProgress(0);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    try {
      await uploadDocument.mutate({
        file,
        onProgress: (progress) => {
          setProgress(progress);
        }
      }, {
        onSuccess: () => {
          toast({
            title: t('documents.uploader.success'),
            description: t('documents.uploader.successDesc').replace('{filename}', file.name),
          });
          setFile(null);
          setProgress(0);
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: t('documents.uploader.failed'),
            description: error.message,
          });
        }
      });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  
  const isUploading = uploadDocument.isPending;
  
  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging ? "border-forest-500 bg-forest-50" : "border-gray-300"
        } ${file ? "bg-gray-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <label htmlFor="file-upload" className="cursor-pointer text-forest-600 hover:text-forest-500">
                <span>{t('documents.uploader.chooseFile')}</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only"
                  onChange={handleFileChange} 
                />
              </label>
              <span className="text-gray-500"> {t('documents.uploader.orDragDrop')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('documents.uploader.fileTypes')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-sm font-medium text-gray-600">
                    {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                  </span>
                </div>
                <div className="max-w-[200px] sm:max-w-xs">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={handleClearFile}
                disabled={isUploading}
              >
                <FileX className="h-5 w-5" />
              </button>
            </div>
            {isUploading && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{t('documents.uploader.uploading')}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>
            )}
          </div>
        )}
      </div>
      
      {file && !isUploading && (
        <div className="flex justify-end">
          <Button onClick={handleUpload} className="bg-forest-500 hover:bg-forest-600">
            <Upload className="mr-2 h-4 w-4" />
            {t('documents.uploader.uploadDocument')}
          </Button>
        </div>
      )}
    </div>
  );
};
