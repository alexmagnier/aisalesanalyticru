import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="border-t border-slate-800 bg-slate-900/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg">Sales Call</span>
              <span className="font-light text-lg text-blue-400 ml-1">Analytics</span>
            </div>
          </div>
          <p className="text-slate-400 mb-6 max-w-sm">
            AI-платформа для анализа звонков отдела продаж. 100% прозрачность, персонализированные рекомендации.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Продукт</h4>
          <ul className="space-y-2">
            {[
              { label: 'Возможности', path: '/features' },
              { label: 'Тарифы', path: '/pricing' },
              { label: 'Интеграции', path: '/integrations' },
              { label: 'Калькулятор ROI', path: '/calculator' },
            ].map((l, i) => (
              <li key={i}>
                <Link to={l.path} className="text-slate-400 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Ресурсы</h4>
          <ul className="space-y-2">
            {[
              { label: 'Блог', path: '/blog' },
              { label: 'Документация', path: '/' },
            ].map((l, i) => (
              <li key={i}>
                <Link to={l.path} className="text-slate-400 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Компания</h4>
          <ul className="space-y-2">
            {['О нас', 'Контакты'].map((l, i) => (
              <li key={i}>
                <button className="text-slate-400 hover:text-white transition-colors">{l}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-500">© 2024 Sales Call Analytics. Все права защищены.</div>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition-colors">Условия использования</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

