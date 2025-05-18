
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface Session {
  id: string;
  user_id: string;
  client_id: string;
  program_id: string | null;
  title: string;
  date: string;
  duration: number;
  location_type: string;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export type SessionFormData = {
  client_id: string; // Required field
  program_id?: string; // Optional field
  title: string;
  date: string;
  duration: number;
  location_type: string;
  notes?: string;
  status?: string;
}

// Get all sessions for the current user
export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*, clients(name)')
        .order('date', { ascending: true });
      
      if (error) throw new Error(error.message);
      return data as (Session & { clients: { name: string } })[];
    }
  });
};

// Get a single session by ID
export const useSession = (sessionId: string) => {
  return useQuery({
    queryKey: ['sessions', sessionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*, clients(name)')
        .eq('id', sessionId)
        .single();
      
      if (error) throw new Error(error.message);
      return data as (Session & { clients: { name: string } });
    },
    enabled: !!sessionId
  });
};

// Add a new session
export const useAddSession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (sessionData: SessionFormData) => {
      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('sessions')
        .insert([{
          ...sessionData,
          user_id: user.id,
          status: sessionData.status || 'scheduled'
        }])
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data as Session;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast({
        title: "Success",
        description: "Session has been successfully scheduled.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to schedule session: ${error.message}`,
      });
    }
  });
};

// Update an existing session
export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, sessionData }: { id: string, sessionData: Partial<SessionFormData> }) => {
      const { data, error } = await supabase
        .from('sessions')
        .update({
          ...sessionData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data as Session;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['sessions', variables.id] });
      toast({
        title: "Success",
        description: "Session has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update session: ${error.message}`,
      });
    }
  });
};

// Delete a session
export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId);
      
      if (error) throw new Error(error.message);
      return sessionId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast({
        title: "Success",
        description: "Session has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete session: ${error.message}`,
      });
    }
  });
};
