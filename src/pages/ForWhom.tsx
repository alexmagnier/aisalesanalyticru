import React from 'react';
import { Award, Building2, Target, BookOpen, CheckCircle2 } from 'lucide-react';

const ForWhomPage: React.FC = () => {
  const audiences = [
    {
      title: 'Руководители отделов продаж (РОПы)',
      icon: Award,
      pain: 'Тратите 4-6 часов на прослушивание звонков',
      solution: 'AI анализирует 100% звонков автоматически. Вы видите только важное.',
      benefits: ['Освобождение от рутины', 'Объективные данные для решений', 'Выявление проблем до потери клиента']
    },
    {
      title: 'Собственники бизнеса',
      icon: Building2,
      pain: 'Не знаете, что происходит на звонках',
      solution: 'Полная прозрачность продаж. Дашборды и отчёты.',
      benefits: ['Контроль без микроменеджмента', 'ROI от маркетинга', 'Масштабирование с сохранением качества']
    },
    {
      title: 'Отделы контроля качества',
      icon: Target,
      pain: 'Не успеваете проверять все звонки',
      solution: 'AI проверяет всё, вы — только проблемные случаи.',
      benefits: ['3-5× больше звонков под контролем', 'Консистентность оценок', 'Фокус на сложных кейсах']
    },
    {
      title: 'HR и тренеры по продажам',
      icon: BookOpen,
      pain: 'Новички долго выходят на план',
      solution: 'Обратная связь по каждому звонку с конкретными рекомендациями.',
      benefits: ['Ускорение адаптации в 3-5 раз', 'Индивидуальная работа над ошибками', 'Измеримый прогресс']
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Для кого <span className="gradient-text">Sales Call Analytics</span>
          </h1>
          <p className="text-xl text-slate-400">
            Решаем задачи разных ролей в отделе продаж
          </p>
        </div>
      </section>
      
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {audiences.map((a, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-blue-500/10 flex-shrink-0">
                    <a.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">{a.title}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-red-400 text-sm font-medium mb-2">😤 Боль</div>
                        <p className="text-slate-400 mb-4">{a.pain}</p>
                        <div className="text-emerald-400 text-sm font-medium mb-2">✅ Решение</div>
                        <p className="text-slate-300">{a.solution}</p>
                      </div>
                      <div>
                        <div className="text-blue-400 text-sm font-medium mb-2">💎 Преимущества</div>
                        <ul className="space-y-2">
                          {a.benefits.map((b, j) => (
                            <li key={j} className="flex items-center gap-2 text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForWhomPage;

