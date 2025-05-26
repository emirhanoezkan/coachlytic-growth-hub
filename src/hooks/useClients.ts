
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Client = Tables<"clients">;

export const useClients = () => {
  const {
    data: clients = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<Client[]> => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching clients:", error);
        throw error;
      }

      return data;
    },
  });

  return {
    clients,
    isLoading,
    error,
  };
};
