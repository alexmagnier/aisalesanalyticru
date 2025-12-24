import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useReferrals(status?: string) {
  const { partner } = useAuth();

  return useQuery({
    queryKey: ['referrals', partner?.id, status],
    queryFn: async () => {
      if (!partner?.id) return [];

      let query = supabase
        .from('referrals')
        .select('*')
        .eq('partner_id', partner.id)
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
    enabled: !!partner?.id,
  });
}

export function useReferralStats() {
  const { partner } = useAuth();

  return useQuery({
    queryKey: ['referralStats', partner?.id],
    queryFn: async () => {
      if (!partner?.id) return null;

      const { data, error } = await supabase
        .from('referrals')
        .select('status')
        .eq('partner_id', partner.id);

      if (error) throw error;

      const stats = {
        total: data.length,
        new: data.filter(r => r.status === 'new').length,
        contacted: data.filter(r => r.status === 'contacted').length,
        demo: data.filter(r => r.status === 'demo').length,
        trial: data.filter(r => r.status === 'trial').length,
        converted: data.filter(r => r.status === 'converted').length,
        active: data.filter(r => r.status === 'active').length,
        churned: data.filter(r => r.status === 'churned').length,
        rejected: data.filter(r => r.status === 'rejected').length,
      };

      return stats;
    },
    enabled: !!partner?.id,
  });
}

