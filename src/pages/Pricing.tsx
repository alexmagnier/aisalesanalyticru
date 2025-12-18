import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Brain } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    { name: 'Бесплатный', price: 0, description: 'Для знакомства', quick: 300, deep: 30, managers: 2, projects: 1 },
    { name: 'Старт', price: 6900, description: 'Для небольших команд', quick: 1500, deep: 150, managers: 3, projects: 2 },
    { name: 'Команда', price: 14900, description: 'Оптимальный выбор', quick: 4000, deep: 500, managers: 10, projects: 5, popular: true },
    { name: 'Бизнес', price: 39900, description: 'Для растущих компаний', quick: 10000, deep: 1500, managers: 20, projects: 10 },
    { name: 'Корпоративный', price: 94900, description: 'Для крупного бизнеса', quick: 20000, deep: 5000, managers: 50, projects: 20 },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Тарифы <span className="gradient-text">Sales Call Analytics</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Начните бесплатно. Масштабируйтесь по мере роста. Докупайте минуты при необходимости.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-6 rounded-2xl border ${
                  plan.popular 
                    ? 'bg-blue-500/10 border-blue-500/30 lg:scale-105 lg:-my-4' 
                    : 'bg-slate-800/30 border-slate-700/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-xs font-bold">
                    Популярный
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="font-bold text-lg mb-1">{plan.name}</div>
                  <div className="text-xs text-slate-500 mb-4">{plan.description}</div>
                  <div className="text-3xl font-black">
                    {plan.price === 0 ? 'Бесплатно' : (
                      <>{plan.price.toLocaleString()} ₽<span className="text-sm font-normal text-slate-500">/мес</span></>
                    )}
                  </div>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">⚡ Quick</span>
                    <span className="font-medium">{plan.quick.toLocaleString()} мин</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">🔬 Deep</span>
                    <span className="font-medium">{plan.deep.toLocaleString()} мин</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Менеджеров</span>
                    <span className="font-medium">до {plan.managers}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Проектов</span>
                    <span className="font-medium">{plan.projects}</span>
                  </div>
                </div>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'border border-slate-600 hover:bg-slate-800/50'
                }`}>
                  {plan.price === 0 ? 'Начать бесплатно' : 'Выбрать тариф'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Докупка минут */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Нужно больше минут?</h2>
            <p className="text-slate-400">Докупите пакет без смены тарифа</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />Quick-минуты
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { m: '500', p: '2 000', discount: '-12%' }, 
                  { m: '2 000', p: '7 000' }, 
                  { m: '5 000', p: '15 000', discount: '-25%' }
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-900/50">
                    <span>{p.m} мин</span>
                    <div className="flex flex-col items-end">
                      <span className="text-blue-400 font-medium">{p.p} ₽</span>
                      {p.discount && (
                        <span className="text-xs text-emerald-400 font-medium">{p.discount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-400" />Deep-минуты
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { m: '100', p: '900' }, 
                  { m: '500', p: '4 000', discount: '-11%' }, 
                  { m: '1 000', p: '7 000', discount: '-22%', popular: true }
                ].map((p, i) => (
                  <div key={i} className={`relative flex justify-between items-center p-3 rounded-lg ${
                    p.popular ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-slate-900/50'
                  }`}>
                    {p.popular && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-xs font-bold flex items-center gap-1">
                        ⭐ Популярный
                      </div>
                    )}
                    <span>{p.m} мин</span>
                    <div className="flex flex-col items-end">
                      <span className="text-emerald-400 font-medium">{p.p} ₽</span>
                      {p.discount && (
                        <span className="text-xs text-emerald-400 font-medium">{p.discount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link 
            to="/calculator"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-semibold inline-block"
          >
            Рассчитать ROI
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

