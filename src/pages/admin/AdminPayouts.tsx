import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminLayout from '@/components/layout/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatDate } from '@/utils/referralTracking';
import { useToast } from '@/hooks/use-toast';
import type { Payout } from '@/integrations/supabase/types';

const statusConfig = {
  pending: { label: 'Ожидает', icon: Clock, color: 'bg-yellow-500' },
  processing: { label: 'В обработке', icon: Loader2, color: 'bg-blue-500' },
  completed: { label: 'Выплачено', icon: CheckCircle2, color: 'bg-green-500' },
  rejected: { label: 'Отклонено', icon: XCircle, color: 'bg-red-500' },
};

const AdminPayouts = () => {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: payouts, isLoading } = useQuery({
    queryKey: ['adminPayouts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payouts')
        .select('*, partners(first_name, last_name, email)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Payout & { partners: { first_name: string; last_name: string; email: string } })[];
    },
  });

  const updatePayout = useMutation({
    mutationFn: async ({ id, status, transaction_id, admin_note }: { 
      id: string; 
      status: string; 
      transaction_id?: string;
      admin_note?: string;
    }) => {
      const updates: Record<string, unknown> = {
        status,
        updated_at: new Date().toISOString(),
      };
      
      if (status === 'completed') {
        updates.processed_at = new Date().toISOString();
        if (transaction_id) updates.transaction_id = transaction_id;
      }
      
      if (admin_note) updates.admin_note = admin_note;

      const { error } = await supabase
        .from('payouts')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;

      // Если отклонено — возвращаем баланс партнёру
      if (status === 'rejected') {
        const payout = payouts?.find(p => p.id === id);
        if (payout) {
          const { data: partner } = await supabase
            .from('partners')
            .select('current_balance')
            .eq('id', payout.partner_id)
            .single();
          
          if (partner) {
            await supabase
              .from('partners')
              .update({ current_balance: partner.current_balance + payout.amount })
              .eq('id', payout.partner_id);
          }
        }
      }

      // Если выплачено — обновляем paid_out у партнёра
      if (status === 'completed') {
        const payout = payouts?.find(p => p.id === id);
        if (payout) {
          const { data: partner } = await supabase
            .from('partners')
            .select('paid_out')
            .eq('id', payout.partner_id)
            .single();
          
          if (partner) {
            await supabase
              .from('partners')
              .update({ paid_out: (partner.paid_out || 0) + payout.amount })
              .eq('id', payout.partner_id);
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPayouts'] });
      setSelectedPayout(null);
      setTransactionId('');
      setAdminNote('');
      toast({ title: 'Статус обновлён' });
    },
  });

  const pendingPayouts = payouts?.filter(p => p.status === 'pending') || [];
  const totalPending = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Выплаты</h1>
            <p className="text-slate-400">Управление запросами на выплату</p>
          </div>
          
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-yellow-400">Ожидают выплаты</p>
                <p className="text-xl font-bold text-white">{formatCurrency(totalPending)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Все выплаты ({payouts?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-slate-400 text-center py-8">Загрузка...</p>
            ) : !payouts || payouts.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Нет запросов на выплату</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-400">Партнёр</TableHead>
                      <TableHead className="text-slate-400">Сумма</TableHead>
                      <TableHead className="text-slate-400">Способ</TableHead>
                      <TableHead className="text-slate-400">Реквизиты</TableHead>
                      <TableHead className="text-slate-400">Статус</TableHead>
                      <TableHead className="text-slate-400">Дата</TableHead>
                      <TableHead className="text-slate-400">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout) => {
                      const status = statusConfig[payout.status as keyof typeof statusConfig];
                      const details = payout.payment_details as { card_number?: string };
                      
                      return (
                        <TableRow key={payout.id} className="border-slate-700/50">
                          <TableCell>
                            <div>
                              <p className="text-white font-medium">
                                {payout.partners?.first_name} {payout.partners?.last_name}
                              </p>
                              <p className="text-sm text-slate-500">{payout.partners?.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white font-semibold">
                            {formatCurrency(payout.amount)}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {payout.payment_method === 'card' ? 'Карта СБП' : payout.payment_method}
                          </TableCell>
                          <TableCell>
                            <code className="text-sm text-blue-400 bg-slate-800 px-2 py-0.5 rounded">
                              {details?.card_number || '—'}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${status.color} text-white`}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm">
                            {formatDate(payout.requested_at)}
                          </TableCell>
                          <TableCell>
                            {payout.status === 'pending' && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => setSelectedPayout(payout)}
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updatePayout.mutate({ id: payout.id, status: 'rejected' })}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            {payout.transaction_id && (
                              <p className="text-xs text-slate-500 mt-1">ID: {payout.transaction_id}</p>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm Payout Dialog */}
        <Dialog open={!!selectedPayout} onOpenChange={() => setSelectedPayout(null)}>
          <DialogContent className="bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Подтвердить выплату</DialogTitle>
              <DialogDescription className="text-slate-400">
                Сумма: {formatCurrency(selectedPayout?.amount || 0)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">ID транзакции (необязательно)</label>
                <Input
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Номер перевода"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Комментарий (необязательно)</label>
                <Input
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Заметка для себя"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    if (selectedPayout) {
                      updatePayout.mutate({
                        id: selectedPayout.id,
                        status: 'completed',
                        transaction_id: transactionId || undefined,
                        admin_note: adminNote || undefined,
                      });
                    }
                  }}
                  disabled={updatePayout.isPending}
                >
                  {updatePayout.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  )}
                  Выплачено
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                  onClick={() => setSelectedPayout(null)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminPayouts;

