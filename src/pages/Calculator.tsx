import React, { useState } from 'react';
import { TrendingUp, Bell, AlertCircle, Sparkles } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const [managers, setManagers] = useState(5);
  const [callsPerDay, setCallsPerDay] = useState(30);
  const [avgDeal, setAvgDeal] = useState(100000);
  const [currentConversion, setCurrentConversion] = useState(10);

  // Базовые вычисления
  const workDaysPerMonth = 22;
  const totalCallsPerMonth = managers * callsPerDay * workDaysPerMonth;
  const currentDealsPerMonth = Math.round(totalCallsPerMonth * (currentConversion / 100));
  const currentRevenue = currentDealsPerMonth * avgDeal;

  // === МЕТРИКА 1: Спасённые сделки ===
  const problematicCallsPercent = 0.15;
  const rescueConversionRate = 0.25;
  const problematicCalls = Math.round(totalCallsPerMonth * problematicCallsPercent);
  const savedDeals = Math.round(problematicCalls * rescueConversionRate);
  const savedDealsRevenue = savedDeals * avgDeal;

  // === МЕТРИКА 2: Возвращённые лиды ===
  const forgottenLeadsPercent = 0.10;
  const returnConversionRate = 0.20;
  const forgottenLeads = Math.round(totalCallsPerMonth * forgottenLeadsPercent);
  const returnedLeads = Math.round(forgottenLeads * returnConversionRate);
  const returnedLeadsRevenue = returnedLeads * avgDeal;

  // === МЕТРИКА 3: Рост конверсии от обучения ===
  const conversionGrowthPercent = 0.15;
  const newConversion = (currentConversion * (1 + conversionGrowthPercent)).toFixed(1);
  const additionalDealsFromGrowth = Math.round(
    totalCallsPerMonth * (Number(newConversion) / 100) - currentDealsPerMonth
  );
  const conversionGrowthRevenue = additionalDealsFromGrowth * avgDeal;

  // === ИТОГИ ===
  const totalAdditionalDeals = savedDeals + returnedLeads + additionalDealsFromGrowth;
  const totalAdditionalRevenue = savedDealsRevenue + returnedLeadsRevenue + conversionGrowthRevenue;

  // ROI расчёт
  const getRecommendedPlan = (m: number) => {
    if (m <= 2) return { name: 'Бесплатный', cost: 0 };
    if (m <= 3) return { name: 'Старт', cost: 6900 };
    if (m <= 10) return { name: 'Команда', cost: 14900 };
    if (m <= 20) return { name: 'Бизнес', cost: 39900 };
    return { name: 'Корпоративный', cost: 94900 };
  };

  const recommendedPlan = getRecommendedPlan(managers);
  const roi = recommendedPlan.cost > 0 
    ? Math.round((totalAdditionalRevenue / recommendedPlan.cost) * 100)
    : 999999;

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Калькулятор <span className="gradient-text">ROI</span>
          </h1>
          <p className="text-xl text-slate-400">
            Оцените потенциальную выгоду от внедрения AI-аналитики
          </p>
        </div>
      </section>
      
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая колонка: Ваши данные */}
            <div className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6">Ваши данные</h2>
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between mb-2">
                    <span className="text-slate-300">Менеджеров в команде</span>
                    <span className="font-bold text-white">{managers}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={managers}
                    onChange={(e) => setManagers(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="flex justify-between mb-2">
                    <span className="text-slate-300">Звонков в день на менеджера</span>
                    <span className="font-bold text-white">{callsPerDay}</span>
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="flex justify-between mb-2">
                    <span className="text-slate-300">Средний чек сделки, ₽</span>
                    <span className="font-bold text-white">{avgDeal.toLocaleString()}</span>
                  </label>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1000000" 
                    step="10000"
                    value={avgDeal}
                    onChange={(e) => setAvgDeal(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="flex justify-between mb-2">
                    <span className="text-slate-300">Текущая конверсия, %</span>
                    <span className="font-bold text-white">{currentConversion}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={currentConversion}
                    onChange={(e) => setCurrentConversion(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Правая колонка: Потенциальный результат */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-6">Потенциальный результат</h2>
              
              {/* Метрика 1: Спасённые сделки */}
              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-red-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-500/10 flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">🚨 Спасённые сделки</h3>
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-2xl font-black text-white">{savedDeals} сделок/мес</span>
                      <span className="text-2xl font-black text-emerald-400">+{savedDealsRevenue.toLocaleString()} ₽</span>
                    </div>
                    <p className="text-sm text-slate-400 border-t border-slate-700/50 pt-3">
                      AI выявляет проблемные звонки в реальном времени. Вы успеваете перезвонить и спасти сделку.
                    </p>
                  </div>
                </div>
              </div>

              {/* Метрика 2: Возвращённые лиды */}
              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-amber-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 flex-shrink-0">
                    <Bell className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">🔔 Возвращённые лиды</h3>
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-2xl font-black text-white">{returnedLeads} сделок/мес</span>
                      <span className="text-2xl font-black text-emerald-400">+{returnedLeadsRevenue.toLocaleString()} ₽</span>
                    </div>
                    <p className="text-sm text-slate-400 border-t border-slate-700/50 pt-3">
                      Напоминания о клиентах без follow-up. Больше никто не «потеряется».
                    </p>
                  </div>
                </div>
              </div>

              {/* Метрика 3: Рост конверсии */}
              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">📈 Рост конверсии</h3>
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-2xl font-black text-white">
                        {currentConversion}% → {newConversion}% (+15%)
                      </span>
                      <span className="text-2xl font-black text-emerald-400">+{conversionGrowthRevenue.toLocaleString()} ₽</span>
                    </div>
                    <p className="text-sm text-slate-400 border-t border-slate-700/50 pt-3">
                      Персональные рекомендации для каждого менеджера на основе анализа его звонков.
                    </p>
                  </div>
                </div>
              </div>

              {/* Итоговый блок */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border-2 border-blue-500/50 glow-blue">
                <div className="text-center mb-6">
                  <div className="text-sm text-slate-400 mb-2">Дополнительная выручка</div>
                  <div className="text-5xl font-black gradient-text mb-4">
                    +{totalAdditionalRevenue.toLocaleString()} ₽/мес
                  </div>
                  <div className="text-lg text-emerald-400 font-semibold mb-6">
                    +{totalAdditionalDeals} сделок ежемесячно
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-900/50 mb-6">
                    <div className="text-sm text-slate-500 mb-1">Рекомендуем тариф</div>
                    <div className="text-2xl font-bold text-white">
                      «{recommendedPlan.name}» {recommendedPlan.cost > 0 ? `за ${recommendedPlan.cost.toLocaleString()} ₽` : ''}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-slate-500 mb-1">Потенциальный ROI</div>
                    <div className="text-6xl font-black text-emerald-400">
                      {roi > 100000 ? '∞' : `${roi.toLocaleString()}%`}
                    </div>
                  </div>

                  <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Начать бесплатно — 300 минут
                  </button>
                </div>

                <p className="text-xs text-amber-300 text-center">
                  ⚠️ Это оценочный расчёт на основе средних показателей. Фактические результаты зависят от специфики бизнеса.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Социальное доказательство */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <div className="flex items-start gap-6">
              <div className="text-6xl">💬</div>
              <div>
                <p className="text-lg text-slate-300 italic mb-4">
                  «После внедрения аналитики конверсия выросла с 8% до 12% за 2 месяца. Теперь видим каждую проблему в звонках и оперативно исправляем. ROI окупился в первый же месяц.»
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                    А
                  </div>
                  <div>
                    <div className="font-semibold text-white">Алексей Морозов</div>
                    <div className="text-sm text-slate-400">РОП в digital-агентстве, команда 8 человек</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;
