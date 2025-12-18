import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const articles = [
    { slug: 'conversion', title: 'Как анализ звонков увеличивает конверсию', category: 'Аналитика продаж', readTime: '12 мин', date: '15 дек 2024', excerpt: 'Большинство отделов продаж проверяют только 5-10% звонков. Разберём метрики, которые влияют на конверсию.' },
    { slug: 'ai-vs-human', title: 'AI vs человек: кто лучше оценивает качество', category: 'AI в продажах', readTime: '8 мин', date: '12 дек 2024', excerpt: 'Отделы контроля качества существуют десятилетиями. Но нужны ли они теперь?' },
    { slug: 'onboarding', title: 'Как ускорить адаптацию новичков с AI', category: 'Обучение', readTime: '10 мин', date: '10 дек 2024', excerpt: 'Средний срок выхода на план — 2-3 месяца. Как AI-аналитика ускоряет процесс.' },
    { slug: 'scripts', title: 'Как создать работающий скрипт продаж', category: 'Скрипты', readTime: '15 мин', date: '8 дек 2024', excerpt: 'Хороший скрипт — это не текст для чтения. Это структура, ведущая к покупке.' },
    { slug: 'amocrm', title: 'AmoCRM + AI: автоматизация за 40 минут', category: 'CRM', readTime: '7 мин', date: '5 дек 2024', excerpt: 'Менеджеры тратят 30-40 минут в день на CRM. Это можно автоматизировать.' },
    { slug: 'roi', title: 'Окупаемость сервиса аналитики: расчёт', category: 'ROI', readTime: '9 мин', date: '3 дек 2024', excerpt: 'Формулы и примеры расчёта ROI от AI-аналитики звонков.' },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Блог</span> Sales Call Analytics
          </h1>
          <p className="text-xl text-slate-400">Статьи об аналитике продаж, AI и повышении конверсии</p>
        </div>
      </section>
      
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <article 
                key={i}
                className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">{a.category}</span>
                  <span className="text-xs text-slate-500">{a.readTime}</span>
                </div>
                <h2 className="text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors">{a.title}</h2>
                <p className="text-slate-400 text-sm mb-4">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{a.date}</span>
                  <Link 
                    to={`/blog/${a.slug}`}
                    className="text-blue-400 text-sm font-medium flex items-center gap-1"
                  >
                    Читать <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;

