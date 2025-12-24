import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/components/layout/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatDate } from '@/utils/referralTracking';
import { useToast } from '@/hooks/use-toast';

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-slate-500' },
  contacted: { label: 'На связи', color: 'bg-blue-500' },
  demo: { label: 'Демо', color: 'bg-yellow-500' },
  trial: { label: 'Триал', color: 'bg-purple-500' },
  converted: { label: 'Оплатил', color: 'bg-emerald-500' },
  active: { label: 'Активен', color: 'bg-green-500' },
  churned: { label: 'Ушёл', color: 'bg-red-500' },
  rejected: { label: 'Отказ', color: 'bg-gray-500' },
};

const AdminReferrals = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: referrals, isLoading } = useQuery({
    queryKey: ['adminReferrals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('*, partners(first_name, last_name, referral_code)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('referrals')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminReferrals'] });
      toast({ title: 'Статус обновлён' });
    },
  });

  const filteredReferrals = referrals?.filter(r => {
    const matchesSearch = !search || 
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.company?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Рефералы</h1>
          <p className="text-slate-400">Все заявки от партнёров и органические</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Поиск по имени, компании или email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">Все статусы</SelectItem>
              {Object.entries(statusConfig).map(([key, { label }]) => (
                <SelectItem key={key} value={key} className="text-white">{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Рефералов: {filteredReferrals.length}
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
                      <TableHead className="text-slate-400">Клиент</TableHead>
                      <TableHead className="text-slate-400">Партнёр</TableHead>
                      <TableHead className="text-slate-400">Источник</TableHead>
                      <TableHead className="text-slate-400">Статус</TableHead>
                      <TableHead className="text-slate-400">Тариф</TableHead>
                      <TableHead className="text-slate-400">Комиссия</TableHead>
                      <TableHead className="text-slate-400">Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReferrals.map((referral) => {
                      const status = statusConfig[referral.status] || statusConfig.new;
                      const partner = referral.partners as { first_name: string; last_name: string; referral_code: string } | null;
                      
                      return (
                        <TableRow key={referral.id} className="border-slate-700/50">
                          <TableCell>
                            <div>
                              <p className="text-white font-medium">{referral.company || referral.name}</p>
                              <p className="text-sm text-slate-500">{referral.email || referral.phone || '—'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {partner ? (
                              <div>
                                <p className="text-slate-300">{partner.first_name} {partner.last_name}</p>
                                <code className="text-xs text-blue-400">{partner.referral_code}</code>
                              </div>
                            ) : (
                              <span className="text-slate-500">Органик</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-xs ${
                              referral.source === 'link' ? 'border-blue-500 text-blue-400' :
                              referral.source === 'organic' ? 'border-slate-500 text-slate-400' :
                              'border-purple-500 text-purple-400'
                            }`}>
                              {referral.source}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={referral.status}
                              onValueChange={(value) => updateStatus.mutate({ id: referral.id, status: value })}
                            >
                              <SelectTrigger className={`w-32 ${status.color} text-white border-0 text-xs`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                {Object.entries(statusConfig).map(([key, { label }]) => (
                                  <SelectItem key={key} value={key} className="text-white">{label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {referral.plan_selected || '—'}
                          </TableCell>
                          <TableCell className={referral.commission_earned > 0 ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                            {referral.commission_earned > 0 ? formatCurrency(referral.commission_earned) : '—'}
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm">
                            {formatDate(referral.created_at)}
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

export default AdminReferrals;

