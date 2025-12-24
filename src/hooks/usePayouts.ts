import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Payout } from '@/integrations/supabase/types';

export function usePayouts() {
  const { partner } = useAuth();

  return useQuery({
    queryKey: ['payouts', partner?.id],
    queryFn: async () => {
      if (!partner?.id) return [];

      const { data, error } = await supabase
        .from('payouts')
        .select('*')
        .eq('partner_id', partner.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!partner?.id,
  });
}

export function useRequestPayout() {
  const queryClient = useQueryClient();
  const { partner, refreshPartner } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      amount: number;
      payment_method: string;
      payment_details: Record<string, string>;
      partner_note?: string;
    }) => {
      if (!partner?.id) throw new Error('No partner');

      // Проверяем баланс
      if (partner.current_balance < data.amount) {
        throw new Error('Недостаточно средств');
      }

      // Минимальная сумма
      if (data.amount < 3000) {
        throw new Error('Минимальная сумма выплаты: 3 000 ₽');
      }

      const { data: payout, error } = await supabase
        .from('payouts')
        .insert({
          partner_id: partner.id,
          amount: data.amount,
          payment_method: data.payment_method,
          payment_details: data.payment_details,
          partner_note: data.partner_note,
        })
        .select()
        .single();

      if (error) throw error;

      // Обновляем баланс партнёра
      await supabase
        .from('partners')
        .update({
          current_balance: partner.current_balance - data.amount,
        })
        .eq('id', partner.id);

      return payout;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
      refreshPartner();
    },
  });
}

