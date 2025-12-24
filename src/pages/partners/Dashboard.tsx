import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Wallet, 
  DollarSign,
  Copy,
  Check,
  Share2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useReferrals } from '@/hooks/useReferrals';
import { formatCurrency, getRelativeTime } from '@/utils/referralTracking';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PartnerLayout from '@/components/layout/PartnerLayout';

const tierConfig = {
  bronze: { name: 'Бронза', icon: '🥉', color: 'text-amber-600', next: 'silver', nextClients: 5 },
  silver: { name: 'Серебро', icon: '🥈', color: 'text-slate-400', next: 'gold', nextClients: 15 },
  gold: { name: 'Золото', icon: '🥇', color: 'text-yellow-500', next: 'platinum', nextClients: 30 },
  platinum: { name: 'Платина', icon: '💎', color: 'text-slate-200', next: null, nextClients: null },
};

const statusConfig: Record<string, { label: string; icon: string; color: string }> = {
  new: { label: 'Новый', icon: '📝', color: 'bg-slate-500' },
  contacted: { label: 'На связи', icon: '📞', color: 'bg-blue-500' },
  demo: { label: 'Демо', icon: '🎯', color: 'bg-yellow-500' },
  trial: { label: 'Триал', icon: '⏳', color: 'bg-purple-500' },
  converted: { label: 'Оплатил', icon: '💰', color: 'bg-emerald-500' },
  active: { label: 'Активен', icon: '✅', color: 'bg-green-500' },
  churned: { label: 'Ушёл', icon: '🔴', color: 'bg-red-500' },
  rejected: { label: 'Отказ', icon: '❌', color: 'bg-gray-500' },
};

const Dashboard = () => {
  const { partner } = useAuth();
  const { data: referrals } = useReferrals();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const tier = partner?.tier || 'bronze';
  const tierInfo = tierConfig[tier];
  const referralLink = `https://aisalesanalyticru.vercel.app/?ref=${partner?.referral_code || ''}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: 'Ссылка скопирована!',
      description: 'Теперь вы можете поделиться ей.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'AI Sales Analytics — аналитика звонков',
        text: 'Попробуйте AI-аналитику звонков для отдела продаж!',
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  const recentReferrals = referrals?.slice(0, 5) || [];

  // Расчёт прогресса до следующего уровня
  const activeClients = partner?.active_referrals || 0;
  const nextTier = tierInfo.next ? tierConfig[tierInfo.next as keyof typeof tierConfig] : null;
  const nextClients = tierInfo.nextClients || activeClients;
  const progress = nextTier ? Math.min((activeClients / nextClients) * 100, 100) : 100;

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Welcome & Tier */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  👋 Добро пожаловать, {partner?.first_name}!
                </h1>
                <p className="text-slate-400">
                  Ваш уровень: <span className={tierInfo.color}>{tierInfo.icon} {tierInfo.name}</span> ({partner?.commission_rate || 10}% комиссия)
                </p>
              </div>
              
              {nextTier && (
                <div className="flex-shrink-0 w-full md:w-64">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                    <span>До {nextTier.name}</span>
                    <span>{activeClients}/{nextClients} клиентов</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{partner?.active_referrals || 0}</p>
                  <p className="text-sm text-slate-400">Активных клиентов</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{partner?.total_referrals || 0}</p>
                  <p className="text-sm text-slate-400">Всего заявок</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(partner?.current_balance || 0)}</p>
                  <p className="text-sm text-slate-400">Баланс</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(partner?.total_earnings || 0)}</p>
                  <p className="text-sm text-slate-400">Всего заработано</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Ваша реферальная ссылка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <code className="flex-1 text-sm text-blue-400 break-all py-2">
                {referralLink}
              </code>
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopy} 
                  variant="outline" 
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 flex-1 sm:flex-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-emerald-400" />
                      Скопировано
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Копировать
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleShare} 
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              🔒 Клиенты закрепляются за вами <strong className="text-slate-400">НАВСЕГДА</strong> — никаких ограничений по времени
            </p>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-white">Последние рефералы</CardTitle>
            <Link to="/partners/referrals">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                Все рефералы
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentReferrals.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-slate-500" />
                </div>
                <p className="text-slate-400 mb-4">Пока нет рефералов</p>
                <p className="text-sm text-slate-500">
                  Поделитесь своей ссылкой, чтобы начать зарабатывать
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentReferrals.map((referral) => {
                  const status = statusConfig[referral.status] || statusConfig.new;
                  return (
                    <div 
                      key={referral.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{status.icon}</div>
                        <div>
                          <p className="text-white font-medium">
                            {referral.company || referral.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="secondary" className={`${status.color} text-white text-xs`}>
                              {status.label}
                            </Badge>
                            <span className="text-slate-500">{getRelativeTime(referral.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      {referral.commission_earned > 0 && (
                        <div className="text-right">
                          <p className="text-emerald-400 font-semibold">
                            +{formatCurrency(referral.commission_earned)}
                          </p>
                          {referral.plan_selected && (
                            <p className="text-xs text-slate-500">{referral.plan_selected}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/partners/materials">
            <Card className="bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Промо-материалы</h3>
                  <p className="text-sm text-slate-400">Баннеры, тексты и готовые посты для соцсетей</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/partners/payouts">
            <Card className="bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Запросить выплату</h3>
                  <p className="text-sm text-slate-400">
                    Баланс: {formatCurrency(partner?.current_balance || 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default Dashboard;

