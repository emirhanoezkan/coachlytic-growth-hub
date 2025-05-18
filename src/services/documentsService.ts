
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BUCKET_NAME = 'coaching_documents';

export interface DocumentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: string;
  updated_at: string;
  url?: string;
}

// Upload a document
export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      file, 
      onProgress
    }: { 
      file: File, 
      onProgress?: (progress: number) => void 
    }) => {
      // Generate a unique file path using timestamp and original name
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (event) => {
            if (onProgress) {
              const progress = (event.loaded / event.total) * 100;
              onProgress(progress);
            }
          }
        });
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });
};

// List all documents
export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data: files, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list();
        
      if (error) {
        throw new Error(error.message);
      }
      
      if (!files) {
        return [];
      }
      
      // Get URLs for each file
      const documents: DocumentFile[] = await Promise.all(
        files.map(async (file) => {
          const { data } = await supabase.storage
            .from(BUCKET_NAME)
            .createSignedUrl(file.name, 3600); // URL valid for 1 hour
          
          return {
            id: file.id,
            name: file.name,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            created_at: file.created_at || '',
            updated_at: file.updated_at || '',
            url: data?.signedUrl
          };
        })
      );
      
      return documents;
    }
  });
};

// Delete a document
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (fileName: string) => {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([fileName]);
        
      if (error) {
        throw new Error(error.message);
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });
};

// Get a download URL for a document
export const getDocumentUrl = async (fileName: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(fileName, 3600);
    
  if (error || !data) {
    throw new Error(error?.message || 'Failed to get document URL');
  }
  
  return data.signedUrl;
};
