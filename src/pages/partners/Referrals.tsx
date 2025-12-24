import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useReferrals, useReferralStats } from '@/hooks/useReferrals';
import { formatCurrency, getRelativeTime } from '@/utils/referralTracking';
import PartnerLayout from '@/components/layout/PartnerLayout';

const statusConfig: Record<string, { label: string; icon: string; color: string; bgColor: string }> = {
  new: { label: 'Новый', icon: '📝', color: 'text-slate-300', bgColor: 'bg-slate-500' },
  contacted: { label: 'На связи', icon: '📞', color: 'text-blue-300', bgColor: 'bg-blue-500' },
  demo: { label: 'Демо', icon: '🎯', color: 'text-yellow-300', bgColor: 'bg-yellow-500' },
  trial: { label: 'Триал', icon: '⏳', color: 'text-purple-300', bgColor: 'bg-purple-500' },
  converted: { label: 'Оплатил', icon: '💰', color: 'text-emerald-300', bgColor: 'bg-emerald-500' },
  active: { label: 'Активен', icon: '✅', color: 'text-green-300', bgColor: 'bg-green-500' },
  churned: { label: 'Ушёл', icon: '🔴', color: 'text-red-300', bgColor: 'bg-red-500' },
  rejected: { label: 'Отказ', icon: '❌', color: 'text-gray-300', bgColor: 'bg-gray-500' },
};

const statusFilters = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: '📝 Новые' },
  { value: 'contacted', label: '📞 На связи' },
  { value: 'demo', label: '🎯 Демо' },
  { value: 'trial', label: '⏳ Триал' },
  { value: 'converted', label: '💰 Оплатили' },
  { value: 'active', label: '✅ Активные' },
];

const Referrals = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const { data: referrals, isLoading } = useReferrals(statusFilter);
  const { data: stats } = useReferralStats();

  const filteredReferrals = referrals?.filter(r => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(searchLower) ||
      r.company?.toLowerCase().includes(searchLower) ||
      r.email?.toLowerCase().includes(searchLower)
    );
  }) || [];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Мои рефералы</h1>
          <p className="text-slate-400">Отслеживайте статус приведённых клиентов</p>
        </div>

        {/* Funnel Stats */}
        {stats && (
          <Card className="bg-slate-800/30 border-slate-700/50 overflow-x-auto">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 min-w-max">
                {[
                  { label: 'Всего', value: stats.total, color: 'text-white' },
                  { label: 'Новые', value: stats.new, color: 'text-slate-400' },
                  { label: 'Демо', value: stats.demo, color: 'text-yellow-400' },
                  { label: 'Триал', value: stats.trial, color: 'text-purple-400' },
                  { label: 'Оплатили', value: stats.converted, color: 'text-emerald-400' },
                  { label: 'Активные', value: stats.active, color: 'text-green-400' },
                ].map((item, i, arr) => (
                  <div key={item.label} className="flex items-center">
                    <div className="text-center px-4">
                      <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-xs text-slate-500">{item.label}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="text-slate-600">→</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Поиск по имени, компании или email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  statusFilter === filter.value
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Referrals List */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              {filteredReferrals.length} {filteredReferrals.length === 1 ? 'реферал' : 'рефералов'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-slate-400">Загрузка...</div>
            ) : filteredReferrals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">Нет рефералов</p>
                <p className="text-sm text-slate-500 mt-1">
                  Поделитесь своей реферальной ссылкой, чтобы привлечь клиентов
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReferrals.map((referral) => {
                  const status = statusConfig[referral.status] || statusConfig.new;
                  return (
                    <div 
                      key={referral.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{status.icon}</div>
                        <div>
                          <p className="text-white font-medium">
                            {referral.company || referral.name}
                          </p>
                          {referral.company && (
                            <p className="text-sm text-slate-500">{referral.name}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge className={`${status.bgColor} text-white text-xs`}>
                              {status.label}
                            </Badge>
                            {referral.plan_selected && (
                              <Badge variant="outline" className="text-slate-400 border-slate-600 text-xs">
                                {referral.plan_selected}
                              </Badge>
                            )}
                            <span className="text-xs text-slate-500">
                              {getRelativeTime(referral.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 sm:text-right">
                        {referral.total_payments > 0 && (
                          <div>
                            <p className="text-xs text-slate-500">Платежей</p>
                            <p className="text-white font-medium">{referral.total_payments}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-slate-500">Комиссия</p>
                          <p className={`font-semibold ${referral.commission_earned > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {referral.commission_earned > 0 
                              ? formatCurrency(referral.commission_earned)
                              : '—'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-slate-300">
              📌 Клиенты закреплены за вами <strong className="text-white">НАВСЕГДА</strong>.
              Вы получаете комиссию с каждого их платежа!
            </p>
          </CardContent>
        </Card>
      </div>
    </PartnerLayout>
  );
};

export default Referrals;

