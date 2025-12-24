import { Users, UserCheck, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/layout/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/referralTracking';

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const [partners, referrals, payouts] = await Promise.all([
        supabase.from('partners').select('*'),
        supabase.from('referrals').select('*'),
        supabase.from('payouts').select('*').eq('status', 'pending'),
      ]);

      const totalPartners = partners.data?.length || 0;
      const activePartners = partners.data?.filter(p => p.status === 'active').length || 0;
      const totalReferrals = referrals.data?.length || 0;
      const convertedReferrals = referrals.data?.filter(r => ['converted', 'active'].includes(r.status)).length || 0;
      const pendingPayouts = payouts.data?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const totalEarnings = partners.data?.reduce((sum, p) => sum + (p.total_earnings || 0), 0) || 0;

      return {
        totalPartners,
        activePartners,
        totalReferrals,
        convertedReferrals,
        pendingPayouts,
        totalEarnings,
      };
    },
  });

  const { data: recentPartners } = useQuery({
    queryKey: ['recentPartners'],
    queryFn: async () => {
      const { data } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  const { data: recentReferrals } = useQuery({
    queryKey: ['recentReferrals'],
    queryFn: async () => {
      const { data } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Админ-панель</h1>
          <p className="text-slate-400">Обзор партнёрской программы</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats?.totalPartners || 0}</p>
                  <p className="text-sm text-slate-400">Партнёров</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">{stats?.activePartners || 0} активных</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats?.totalReferrals || 0}</p>
                  <p className="text-sm text-slate-400">Рефералов</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">{stats?.convertedReferrals || 0} конвертировано</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(stats?.pendingPayouts || 0)}</p>
                  <p className="text-sm text-slate-400">К выплате</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(stats?.totalEarnings || 0)}</p>
                  <p className="text-sm text-slate-400">Всего комиссий</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Новые партнёры</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPartners && recentPartners.length > 0 ? (
                <div className="space-y-3">
                  {recentPartners.map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50">
                      <div>
                        <p className="text-white font-medium">{partner.first_name} {partner.last_name}</p>
                        <p className="text-sm text-slate-500">{partner.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        partner.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        partner.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {partner.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-4">Нет партнёров</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Новые рефералы</CardTitle>
            </CardHeader>
            <CardContent>
              {recentReferrals && recentReferrals.length > 0 ? (
                <div className="space-y-3">
                  {recentReferrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50">
                      <div>
                        <p className="text-white font-medium">{referral.company || referral.name}</p>
                        <p className="text-sm text-slate-500">{referral.email || referral.phone || '—'}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        referral.status === 'active' || referral.status === 'converted' ? 'bg-green-500/20 text-green-400' :
                        referral.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {referral.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-4">Нет рефералов</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

