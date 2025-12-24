import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, partner, isAdmin, loading } = useAuth();
  const location = useLocation();
  const [waitingForPartner, setWaitingForPartner] = useState(true);

  // Даём время на загрузку partner после входа
  useEffect(() => {
    if (!loading && user) {
      // Если user есть, ждём немного для загрузки partner
      const timer = setTimeout(() => {
        setWaitingForPartner(false);
      }, 1500); // 1.5 секунды на загрузку данных партнёра
      
      return () => clearTimeout(timer);
    } else if (!loading && !user) {
      setWaitingForPartner(false);
    }
  }, [loading, user, partner]);

  // Если partner уже загрузился - сбрасываем ожидание
  useEffect(() => {
    if (partner) {
      setWaitingForPartner(false);
    }
  }, [partner]);

  if (loading || (user && !partner && waitingForPartner)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-400 text-sm">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Сохраняем путь для редиректа после входа
    return <Navigate to="/partners/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/partners/dashboard" replace />;
  }

  if (!requireAdmin && !partner) {
    // Пользователь зарегистрирован но не партнёр - редирект на регистрацию
    return <Navigate to="/partners/register" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

