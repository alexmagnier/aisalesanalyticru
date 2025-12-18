import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const IntegrationsPage: React.FC = () => {
  const crms = [
    { 
      name: 'AmoCRM', 
      color: '#3B82F6', 
      features: [
        'Автоматическое получение звонков',
        'Синхронизация контактов и сделок',
        'Автозаполнение полей сделки',
        'Результаты анализа в карточку'
      ] 
    },
    { 
      name: 'Битрикс24', 
      color: '#34D399', 
      features: [
        'Интеграция с телефонией',
        'Привязка к сделкам и контактам',
        'Автозаполнение карточек',
        'Поддержка коробочной версии'
      ] 
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Интеграции с <span className="gradient-text">CRM-системами</span>
          </h1>
          <p className="text-xl text-slate-400">
            Подключение за 15 минут. Звонки анализируются автоматически.
          </p>
        </div>
      </section>
      
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {crms.map((crm, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6"
                  style={{ backgroundColor: crm.color }}
                >
                  {crm.name[0]}
                </div>
                <h2 className="text-2xl font-bold mb-6">{crm.name}</h2>
                <div className="space-y-3 mb-8">
                  {crm.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl font-semibold border border-slate-600 hover:bg-slate-800/50 transition-all">
                  Подключить {crm.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Как работает интеграция</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { step: '1', title: 'Подключите CRM', desc: 'OAuth авторизация за 2 минуты' },
              { step: '2', title: 'Настройте маппинг', desc: 'Какие данные куда записывать' },
              { step: '3', title: 'Звонки анализируются', desc: 'Автоматически при завершении' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntegrationsPage;

