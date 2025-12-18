import React from 'react';
import { Mic, Brain, FileText, Target, MessageSquare, Sparkles, LineChart, Bot, Settings, Layers, BookOpen, Award } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    { icon: Mic, title: 'Автоматическая транскрипция', desc: 'Whisper AI с точностью 98%' },
    { icon: Brain, title: 'AI-оценка качества', desc: 'Оценка 1-10 по 6 этапам продаж' },
    { icon: FileText, title: 'Сравнение со скриптом', desc: 'Что сказано, пропущено, сказано неправильно' },
    { icon: Target, title: 'Квалификация клиентов', desc: 'Определение целевой/нецелевой по вашим критериям' },
    { icon: MessageSquare, title: 'Анализ возражений', desc: 'Сравнение с эталонными техниками' },
    { icon: Sparkles, title: 'Персональные рекомендации', desc: 'Конкретные фразы из вашего скрипта' },
    { icon: LineChart, title: 'Прогноз сделки', desc: 'Вероятность закрытия с факторами' },
    { icon: Bot, title: 'Автозаполнение CRM', desc: 'Извлечение данных в AmoCRM/Битрикс24' },
    { icon: Settings, title: '5 режимов анализа', desc: 'От экономного до полного' },
    { icon: Layers, title: 'Свои правила', desc: 'Триггеры по длительности, оценке, менеджеру' },
    { icon: BookOpen, title: 'База знаний', desc: 'Скрипты, возражения, критерии квалификации' },
    { icon: Award, title: 'Рейтинг менеджеров', desc: 'Сравнение эффективности команды' },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Возможности <span className="gradient-text">Sales Call Analytics</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            20+ параметров анализа, 5 режимов работы, персонализация под вашу методологию
          </p>
        </div>
      </section>
      
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all card-hover">
                <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
                  <f.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
            Начать бесплатно — 300 минут
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;

