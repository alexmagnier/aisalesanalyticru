import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Partner } from '@/integrations/supabase/types';

export function usePartnerStats() {
  const { partner } = useAuth();

  return useQuery({
    queryKey: ['partnerStats', partner?.id],
    queryFn: async () => {
      if (!partner?.id) return null;

      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('id', partner.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!partner?.id,
  });
}

export function useUpdatePartner() {
  const queryClient = useQueryClient();
  const { partner, refreshPartner } = useAuth();

  return useMutation({
    mutationFn: async (updates: Partial<Partner>) => {
      if (!partner?.id) throw new Error('No partner');

      const { data, error } = await supabase
        .from('partners')
        .update(updates)
        .eq('id', partner.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerStats'] });
      refreshPartner();
    },
  });
}

