import { useState } from 'react';
import { Search, MoreHorizontal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/components/layout/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatDate } from '@/utils/referralTracking';
import { useToast } from '@/hooks/use-toast';

const statusConfig = {
  active: { label: 'Активен', icon: CheckCircle2, color: 'bg-green-500' },
  pending: { label: 'Ожидает', icon: Clock, color: 'bg-yellow-500' },
  blocked: { label: 'Заблокирован', icon: XCircle, color: 'bg-red-500' },
};

const AdminPartners = () => {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: partners, isLoading } = useQuery({
    queryKey: ['adminPartners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('partners')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPartners'] });
      toast({ title: 'Статус обновлён' });
    },
  });

  const filteredPartners = partners?.filter(p => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      p.first_name?.toLowerCase().includes(s) ||
      p.last_name?.toLowerCase().includes(s) ||
      p.email?.toLowerCase().includes(s) ||
      p.referral_code?.toLowerCase().includes(s)
    );
  }) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Партнёры</h1>
            <p className="text-slate-400">Управление партнёрами программы</p>
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Всего партнёров: {filteredPartners.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-slate-400 text-center py-8">Загрузка...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-400">Партнёр</TableHead>
                      <TableHead className="text-slate-400">Код</TableHead>
                      <TableHead className="text-slate-400">Уровень</TableHead>
                      <TableHead className="text-slate-400">Рефералы</TableHead>
                      <TableHead className="text-slate-400">Заработок</TableHead>
                      <TableHead className="text-slate-400">Статус</TableHead>
                      <TableHead className="text-slate-400">Регистрация</TableHead>
                      <TableHead className="text-slate-400"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPartners.map((partner) => {
                      const status = statusConfig[partner.status as keyof typeof statusConfig] || statusConfig.pending;
                      return (
                        <TableRow key={partner.id} className="border-slate-700/50">
                          <TableCell>
                            <div>
                              <p className="text-white font-medium">{partner.first_name} {partner.last_name}</p>
                              <p className="text-sm text-slate-500">{partner.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-blue-400 bg-slate-800 px-2 py-0.5 rounded text-sm">
                              {partner.referral_code}
                            </code>
                          </TableCell>
                          <TableCell>
                            <span className="capitalize text-slate-300">{partner.tier}</span>
                            <span className="text-slate-500 ml-1">({partner.commission_rate}%)</span>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {partner.active_referrals} / {partner.total_referrals}
                          </TableCell>
                          <TableCell className="text-emerald-400 font-medium">
                            {formatCurrency(partner.total_earnings)}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${status.color} text-white`}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm">
                            {formatDate(partner.created_at)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {partner.status !== 'active' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                                  onClick={() => updateStatus.mutate({ id: partner.id, status: 'active' })}
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </Button>
                              )}
                              {partner.status !== 'blocked' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  onClick={() => updateStatus.mutate({ id: partner.id, status: 'blocked' })}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
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
      </div>
    </AdminLayout>
  );
};

export default AdminPartners;

