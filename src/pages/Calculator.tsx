import React, { useState } from 'react';

const CalculatorPage: React.FC = () => {
  const [managers, setManagers] = useState(5);
  const [callsPerDay, setCallsPerDay] = useState(30);
  const [avgDeal, setAvgDeal] = useState(100000);
  const [ropSalary, setRopSalary] = useState(150000);

  // Calculations
  const ropTimeSaved = Math.round(ropSalary * 0.5);
  const crmTimeSaved = Math.round(managers * 22 * 40 / 60 * (80000 / 160));
  const potentialGrowth = Math.round(avgDeal * managers * 10 * 0.15);
  const totalSavings = ropTimeSaved + crmTimeSaved + potentialGrowth;
  const recommendedPlan = managers <= 3 ? 'Старт' : managers <= 10 ? 'Команда' : 'Бизнес';
  const planCost = managers <= 3 ? 6900 : managers <= 10 ? 14900 : 39900;
  const roi = Math.round(((totalSavings - planCost) / planCost) * 100);

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6">Ваши данные</h2>
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between mb-2">
                    <span>Менеджеров в команде</span>
                    <span className="font-bold">{managers}</span>
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
                    <span>Звонков в день на менеджера</span>
                    <span className="font-bold">{callsPerDay}</span>
                  </label>
                  <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="flex justify-between mb-2">
                    <span>Средний чек, ₽</span>
                    <span className="font-bold">{avgDeal.toLocaleString()}</span>
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
                    <span>Зарплата РОПа, ₽</span>
                    <span className="font-bold">{ropSalary.toLocaleString()}</span>
                  </label>
                  <input 
                    type="range" 
                    min="50000" 
                    max="300000" 
                    step="10000"
                    value={ropSalary}
                    onChange={(e) => setRopSalary(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/30">
              <h2 className="text-xl font-bold mb-6">Потенциальная выгода</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between p-4 rounded-xl bg-slate-800/50">
                  <span className="text-slate-400">Экономия времени РОПа</span>
                  <span className="font-bold text-emerald-400">{ropTimeSaved.toLocaleString()} ₽/мес</span>
                </div>
                <div className="flex justify-between p-4 rounded-xl bg-slate-800/50">
                  <span className="text-slate-400">Экономия на CRM</span>
                  <span className="font-bold text-emerald-400">{crmTimeSaved.toLocaleString()} ₽/мес</span>
                </div>
                <div className="flex justify-between p-4 rounded-xl bg-slate-800/50">
                  <span className="text-slate-400">Потенциал роста выручки (15%)</span>
                  <span className="font-bold text-emerald-400">{potentialGrowth.toLocaleString()} ₽/мес</span>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-900/50 text-center mb-6">
                <div className="text-sm text-slate-500 mb-2">Потенциальная выгода</div>
                <div className="text-4xl font-black gradient-text mb-2">{totalSavings.toLocaleString()} ₽/мес</div>
                <div className="text-sm text-slate-400">Рекомендуем тариф «{recommendedPlan}» за {planCost.toLocaleString()} ₽</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-slate-500 mb-1">Потенциальный ROI</div>
                <div className="text-5xl font-black text-emerald-400">{roi}%</div>
              </div>

              <p className="text-xs text-amber-300 mt-6 text-center">
                ⚠️ Это оценочный расчёт. Фактические результаты зависят от многих факторов.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
            Начать бесплатно — 300 минут
          </button>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;

