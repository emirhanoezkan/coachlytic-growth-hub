
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface Program {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  sessions_count: number;
  duration: number | null;
  price: number | null;
  created_at: string;
  updated_at: string;
}

export type ProgramFormData = {
  name: string;
  description?: string;
  sessions_count: number;
  duration?: number;
  price?: number;
}

// Get all programs for the current user
export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as Program[];
    }
  });
};

// Get a single program by ID
export const useProgram = (programId: string) => {
  return useQuery({
    queryKey: ['programs', programId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('id', programId)
        .single();
      
      if (error) throw new Error(error.message);
      return data as Program;
    },
    enabled: !!programId
  });
};

// Add a new program
export const useAddProgram = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (programData: ProgramFormData) => {
      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('programs')
        .insert([{
          ...programData,
          user_id: user.id
        }])
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data as Program;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: "Program has been successfully added.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to add program: ${error.message}`,
      });
    }
  });
};

// Update an existing program
export const useUpdateProgram = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, programData }: { id: string, programData: Partial<ProgramFormData> }) => {
      const { data, error } = await supabase
        .from('programs')
        .update({
          ...programData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data as Program;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['programs', variables.id] });
      toast({
        title: "Success",
        description: "Program has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update program: ${error.message}`,
      });
    }
  });
};

// Delete a program
export const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (programId: string) => {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);
      
      if (error) throw new Error(error.message);
      return programId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: "Success",
        description: "Program has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete program: ${error.message}`,
      });
    }
  });
};
