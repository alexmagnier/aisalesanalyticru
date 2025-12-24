import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/features', label: 'Возможности' },
    { path: '/pricing', label: 'Тарифы' },
    { path: '/integrations', label: 'Интеграции' },
    { path: '/for-whom', label: 'Для кого' },
    { path: '/calculator', label: 'Калькулятор ROI' },
    { path: '/blog', label: 'Блог' },
    { path: '/partners', label: 'Партнёрам' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">Sales Call</span>
              <span className="font-light text-lg text-blue-400 ml-1">Analytics</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Войти
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5">
              Попробовать бесплатно
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-800 mt-3 pt-3 flex flex-col gap-2">
              <button className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 text-left">
                Войти
              </button>
              <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg font-semibold">
                Попробовать бесплатно
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;

