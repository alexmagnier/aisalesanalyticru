import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  User, 
  LogOut,
  ChevronRight,
  Sparkles,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/referralTracking';

interface PartnerLayoutProps {
  children: React.ReactNode;
}

const tierColors = {
  bronze: 'text-amber-600',
  silver: 'text-slate-400',
  gold: 'text-yellow-500',
  platinum: 'text-slate-200',
};

const tierIcons = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
};

const navigation = [
  { name: 'Дашборд', href: '/partners/dashboard', icon: LayoutDashboard },
  { name: 'Мои рефералы', href: '/partners/referrals', icon: Users },
  { name: 'Выплаты', href: '/partners/payouts', icon: CreditCard },
  { name: 'Промо-материалы', href: '/partners/materials', icon: FileText },
  { name: 'Профиль', href: '/partners/profile', icon: User },
];

const PartnerLayout = ({ children }: PartnerLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { partner, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/partners/login');
  };

  const tier = partner?.tier || 'bronze';
  const commissionRate = partner?.commission_rate || 10;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/partners/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">AI Sales Analytics</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Партнёры</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-sm">
              <span className={tierColors[tier]}>
                {tierIcons[tier]} {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400">{commissionRate}% комиссия</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-57px)] border-r border-slate-800 bg-slate-900/50">
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
            
            {/* Admin Panel Link - только для админов */}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 mt-4"
              >
                <Shield className="w-5 h-5" />
                Админ-панель
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            )}
          </nav>

          {/* Balance card */}
          <div className="p-4 border-t border-slate-800">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-slate-700/50">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Баланс</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(partner?.current_balance || 0)}
              </p>
              <Link
                to="/partners/payouts"
                className="mt-3 block w-full text-center py-2 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Запросить выплату
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-2 py-2 bg-slate-900 border-t border-slate-800">
          {navigation.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg ${
                  isActive ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;

