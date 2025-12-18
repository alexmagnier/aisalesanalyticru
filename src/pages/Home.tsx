import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Brain, TrendingUp, Clock, Users, Zap, Target, BarChart3, 
  CheckCircle2, ArrowRight, Play, Calculator, Building2, 
  BookOpen, MessageSquare, Settings, Award, DollarSign, Sparkles, 
  FileText, Bot, Layers, Timer, UserCheck, AlertTriangle, Mic, 
  LineChart, Database, Globe, Mail
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero секция */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse-slow" style={{animationDelay: '2s'}} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-300">AI-аналитика звонков нового поколения</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-white">Прекратите тратить </span>
            <span className="gradient-text">5 часов в день</span>
            <br />
            <span className="text-white">на прослушивание звонков</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            AI-платформа анализирует <span className="text-white font-semibold">100% звонков</span> вашего отдела продаж, 
            выявляет слабые места и даёт <span className="text-emerald-400 font-semibold">персонализированные рекомендации</span> на основе ваших скриптов
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
            {[
              { value: '100%', label: 'звонков под контролем' },
              { value: '5×', label: 'быстрее обучение' },
              { value: '15 мин', label: 'на настройку' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-black gradient-text">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Начать бесплатно — 300 минут
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Смотреть демо
            </button>
          </div>

          <div className="text-sm text-slate-500">
            Без привязки карты • Настройка за 15 минут • Поддержка в Telegram
          </div>
        </div>
      </section>

      <ProblemSection />
      <SolutionSection />
      <AnalysisModesSection />
      <KnowledgeBaseSection />
      <BenefitsSection />
      <IntegrationsPreviewSection />
      <WhatYouGetSection />
      <PricingPreviewSection />
      <ExtraMinutesSection />
      <CalculatorPreviewSection />
      <FinalCTASection />
    </>
  );
};

// Секция проблем
const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: 'РОП тратит 4-6 часов в день',
      description: 'Выборочная проверка 5-10% звонков. 90% проблем остаются незамеченными до потери клиента.',
      loss: '₽180 000+/мес',
      lossLabel: 'на зарплату за рутину'
    },
    {
      icon: AlertTriangle,
      title: 'Менеджеры «сливают» сделки',
      description: 'Забывают задавать квалифицирующие вопросы, не отрабатывают возражения, не закрывают на следующий шаг.',
      loss: '30-50%',
      lossLabel: 'сделок теряется'
    },
    {
      icon: Users,
      title: 'Новички учатся месяцами',
      description: 'Нет системной обратной связи по каждому звонку. Ошибки повторяются, конверсия остаётся низкой.',
      loss: '2-3 месяца',
      lossLabel: 'до выхода на план'
    },
    {
      icon: Database,
      title: 'CRM заполняется кое-как',
      description: 'Менеджеры тратят 40+ минут в день на ручной ввод. Данные неполные, прогнозы неточные.',
      loss: '₽50 000+',
      lossLabel: 'на каждого менеджера/мес'
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
            Знакомая боль?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Отдел продаж работает <span className="text-red-400">вслепую</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Вы тратите миллионы на лиды, но не знаете, что происходит на звонках
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <div 
              key={i}
              className="group p-6 lg:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-red-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-slate-400 mb-4">{problem.description}</p>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                    <span className="text-2xl font-black text-red-400">{problem.loss}</span>
                    <span className="text-sm text-slate-500">{problem.lossLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Секция решения
const SolutionSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Решение
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Два типа анализа</span> — вы выбираете глубину
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Quick для мониторинга всех звонков. Deep для глубокого разбора с персонализированными рекомендациями.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Quick Analysis */}
          <div className="p-8 rounded-3xl bg-slate-800/30 border border-blue-500/30 glow-blue">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-blue-500/20">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">⚡ Quick-анализ</h3>
                <p className="text-slate-400">30-60 секунд на звонок</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                'Транскрипт разговора',
                'Краткое содержание',
                'Оценка 1-10 по этапам',
                'Тональность разговора',
                'Флаги: негатив, конкуренты',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Стоимость</span>
                <span className="font-bold text-blue-400">~3.5 ₽/мин</span>
              </div>
            </div>
          </div>

          {/* Deep Analysis */}
          <div className="p-8 rounded-3xl bg-slate-800/30 border border-emerald-500/30 glow-green">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-emerald-500/20">
                <Brain className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">🔬 Deep-анализ</h3>
                <p className="text-slate-400">2-5 минут на звонок</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                'Всё из Quick-анализа',
                'Сравнение со скриптом (matched/missed/wrong)',
                'Рекомендации с конкретными фразами',
                'Прогноз вероятности сделки',
                'Автозаполнение CRM',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Стоимость</span>
                <span className="font-bold text-emerald-400">~8 ₽/мин</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-4 px-4 text-slate-400 font-medium">Параметр</th>
                <th className="py-4 px-4 text-blue-400 font-medium">⚡ Quick</th>
                <th className="py-4 px-4 text-emerald-400 font-medium">🔬 Deep</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['База знаний', 'Нет', 'Да — полный контекст'],
                ['Время анализа', '30-60 сек', '2-5 мин'],
                ['Себестоимость', '~0.4 ₽/мин', '~1.2 ₽/мин'],
                ['Цена', '~3.5 ₽/мин', '~8 ₽/мин'],
                ['Когда использовать', '100% звонков', 'Важные сделки, обучение'],
              ].map(([param, quick, deep], i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  <td className="py-3 px-4 text-slate-300">{param}</td>
                  <td className="py-3 px-4 text-slate-400">{quick}</td>
                  <td className="py-3 px-4 text-slate-400">{deep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Остальные секции... (продолжу в следующей части из-за ограничения размера)

const AnalysisModesSection: React.FC = () => {
  const modes = [
    {
      icon: '💰',
      name: 'Экономный',
      description: 'Quick на все звонки, Deep только вручную',
      cost: '~3.5 ₽/мин',
      useCase: 'Когда нужен базовый контроль при минимальном бюджете'
    },
    {
      icon: '⚖️',
      name: 'Сбалансированный',
      description: 'Quick на все + Deep автоматически при оценке <5 или >10 мин',
      cost: '~4-5 ₽/мин',
      useCase: 'Оптимальный выбор для большинства отделов',
      recommended: true
    },
    {
      icon: '🎓',
      name: 'Обучение',
      description: 'Deep на все звонки выбранных менеджеров',
      cost: '~8 ₽/мин (для выбранных)',
      useCase: 'Интенсивное развитие новичков или проблемных сотрудников'
    },
    {
      icon: '🔬',
      name: 'Полный',
      description: 'Deep на все звонки команды',
      cost: '~8 ₽/мин',
      useCase: 'Максимальная глубина для критически важных проектов'
    },
    {
      icon: '⚙️',
      name: 'Свои правила',
      description: 'Настройте триггеры: длительность, флаги, менеджеры',
      cost: 'Зависит от правил',
      useCase: 'Полный контроль для опытных пользователей'
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            Уникальная гибкость
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">5 режимов анализа</span> — вы контролируете бюджет
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Платите только за нужную глубину анализа
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <div 
              key={i}
              className={`relative p-6 rounded-2xl border transition-all card-hover ${
                mode.recommended 
                  ? 'bg-blue-500/10 border-blue-500/30' 
                  : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {mode.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-xs font-bold">
                  Рекомендуем
                </div>
              )}
              
              <div className="text-4xl mb-4">{mode.icon}</div>
              <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{mode.description}</p>
              
              <div className="p-3 rounded-xl bg-slate-800/50 mb-4">
                <div className="text-sm text-slate-500 mb-1">Стоимость</div>
                <div className="font-semibold text-slate-200">{mode.cost}</div>
              </div>
              
              <p className="text-sm text-slate-500">{mode.useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KnowledgeBaseSection: React.FC = () => {
  const knowledgeTypes = [
    {
      icon: FileText,
      name: 'Скрипты продаж',
      description: 'AI сравнивает каждый звонок с вашим эталонным сценарием. Видите что сказано, что пропущено, что сказано неправильно.',
      example: '«Менеджер пропустил вопрос о бюджете. По скрипту: "Какой бюджет вы закладываете?"»'
    },
    {
      icon: MessageSquare,
      name: 'Отработка возражений',
      description: 'Загрузите ваши техники. AI сравнит как менеджер ответил vs как надо по методологии.',
      example: '«На возражение "дорого" рекомендуем: "Давайте посчитаем, сколько вы теряете без решения"»'
    },
    {
      icon: Target,
      name: 'Квалификация',
      description: 'Задайте критерии целевого клиента. AI определит, целевой ли это лид и что не выяснили.',
      example: '«Целевой: 2/5 критериев. Не выяснено: бюджет, срок принятия решения»'
    },
    {
      icon: Settings,
      name: 'Правила оценки',
      description: 'Настройте веса этапов, обязательные действия, штрафные и бонусные баллы.',
      example: '«Штраф -2 балла: использовано слово "дёшево". Бонус +1: назначена встреча»'
    },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              Персонализация
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Персонализированный анализ</span> под вашу методологию
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Мы не даём шаблонных советов. AI учится на <strong className="text-white">ваших</strong> скриптах, 
              <strong className="text-white"> ваших</strong> техниках продаж и <strong className="text-white">ваших</strong> критериях оценки.
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="font-bold text-lg">Промпт-инжиниринг нового уровня</span>
              </div>
              <p className="text-slate-400">
                20+ параметров анализа. 6 типов контента базы знаний. 
                Многоуровневые инструкции для AI — детальный алгоритм сравнения с вашими стандартами.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {knowledgeTypes.map((type, i) => (
              <div 
                key={i}
                className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-slate-700/50">
                    <type.icon className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{type.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{type.description}</p>
                    <div className="p-3 rounded-lg bg-slate-900/50 text-xs text-slate-500 font-mono">
                      {type.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: BarChart3,
      title: '100% прозрачность',
      description: 'Вместо выборочной проверки 5% звонков — полная картина.',
      metric: '100%',
      metricLabel: 'звонков под контролем'
    },
    {
      icon: TrendingUp,
      title: 'Потенциал роста конверсии',
      description: 'Менеджеры получают обратную связь с фразами из вашего скрипта.',
      metric: '15-30%',
      metricLabel: 'возможный рост'
    },
    {
      icon: Clock,
      title: 'Экономия времени РОПа',
      description: 'Перестаёт быть «прослушивателем». Время на стратегию.',
      metric: '4-6ч',
      metricLabel: 'экономии в день'
    },
    {
      icon: UserCheck,
      title: 'Быстрое обучение',
      description: 'Каждый звонок — урок с разбором. Выход на план быстрее.',
      metric: '3-5×',
      metricLabel: 'ускорение адаптации'
    },
    {
      icon: Bot,
      title: 'Автозаполнение CRM',
      description: 'AI извлекает имя, бюджет, следующий шаг.',
      metric: '40 мин',
      metricLabel: 'экономии/день/менеджер'
    },
    {
      icon: LineChart,
      title: 'Прогнозирование сделок',
      description: 'AI оценивает вероятность закрытия.',
      metric: '✓',
      metricLabel: 'факторы за и против'
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Преимущества
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Что вы <span className="gradient-text">получаете</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <div 
              key={i}
              className="group p-6 lg:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all card-hover"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-blue-400" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-400 mb-6">{benefit.description}</p>
              
              <div className="pt-4 border-t border-slate-700/50">
                <span className="text-3xl font-black gradient-text">{benefit.metric}</span>
                <span className="text-sm text-slate-500 ml-2">{benefit.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IntegrationsPreviewSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Интеграция за <span className="gradient-text">15 минут</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Подключитесь к AmoCRM или Битрикс24 — звонки анализируются автоматически
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {[
            { name: 'AmoCRM', color: '#3B82F6' },
            { name: 'Битрикс24', color: '#34D399' },
          ].map((crm, i) => (
            <div 
              key={i}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: crm.color }}
              >
                {crm.name[0]}
              </div>
              <span className="text-lg font-semibold">{crm.name}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/integrations"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Подробнее об интеграциях
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const WhatYouGetSection: React.FC = () => {
  const items = [
    { 
      title: 'Для РОПа', 
      icon: Award,
      benefits: ['Контроль 100% звонков вместо 5%', 'Освобождение от рутины', 'Объективные данные для решений'] 
    },
    { 
      title: 'Для менеджеров', 
      icon: Users,
      benefits: ['Обратная связь после каждого звонка', 'Конкретные советы что говорить', 'Быстрый рост навыков'] 
    },
    { 
      title: 'Для бизнеса', 
      icon: TrendingUp,
      benefits: ['Прозрачность продаж', 'Потенциал роста конверсии', 'Сокращение времени на ОКК'] 
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Польза для <span className="gradient-text">каждой роли</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <div className="p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
                <item.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <ul className="space-y-3">
                {item.benefits.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingPreviewSection: React.FC = () => {
  const plans = [
    { name: 'Бесплатный', price: '0', quick: '300', deep: '30', managers: '2' },
    { name: 'Старт', price: '6 900', quick: '1 500', deep: '150', managers: '3' },
    { name: 'Команда', price: '14 900', quick: '4 000', deep: '500', managers: '10', popular: true },
    { name: 'Бизнес', price: '39 900', quick: '10 000', deep: '1 500', managers: '20' },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Тарифы для любого <span className="gradient-text">масштаба</span>
          </h2>
          <p className="text-xl text-slate-400">Начните бесплатно — 300 минут Quick-анализа</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-6 rounded-2xl border ${
                plan.popular 
                  ? 'bg-blue-500/10 border-blue-500/30 scale-105' 
                  : 'bg-slate-800/30 border-slate-700/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-xs font-bold">
                  Популярный
                </div>
              )}
              <div className="text-center mb-6">
                <div className="font-semibold text-lg mb-2">{plan.name}</div>
                <div className="text-3xl font-black">
                  {plan.price === '0' ? 'Бесплатно' : `${plan.price} ₽`}
                </div>
                {plan.price !== '0' && <div className="text-sm text-slate-500">в месяц</div>}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">⚡ Quick</span>
                  <span>{plan.quick} мин</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">🔬 Deep</span>
                  <span>{plan.deep} мин</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Менеджеров</span>
                  <span>до {plan.managers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/pricing"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-semibold hover:shadow-lg transition-all inline-block"
          >
            Подробнее о тарифах
          </Link>
        </div>
      </div>
    </section>
  );
};

const ExtraMinutesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            Гибкость
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Нужно больше минут? <span className="gradient-text">Докупите</span>
          </h2>
          <p className="text-lg text-slate-400">
            Если лимит тарифа закончился — просто докупите пакет без смены плана
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold">⚡ Quick-минуты</h3>
            </div>
            <div className="space-y-3">
              {[
                { m: 500, p: 1750 },
                { m: 2000, p: 7000 },
                { m: 5000, p: 17500 }
              ].map((pack, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50">
                  <span className="font-medium">{pack.m.toLocaleString()} мин</span>
                  <span className="text-blue-400 font-bold">{pack.p.toLocaleString()} ₽</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-slate-500">~3.5 ₽/минута</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold">🔬 Deep-минуты</h3>
            </div>
            <div className="space-y-3">
              {[
                { m: 100, p: 800 },
                { m: 500, p: 4000 },
                { m: 1000, p: 8000 }
              ].map((pack, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50">
                  <span className="font-medium">{pack.m.toLocaleString()} мин</span>
                  <span className="text-emerald-400 font-bold">{pack.p.toLocaleString()} ₽</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-slate-500">~8 ₽/минута</div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <p className="text-slate-300">💡 Докупленные минуты не сгорают — используйте когда нужно</p>
        </div>
      </div>
    </section>
  );
};

const CalculatorPreviewSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 lg:p-12 rounded-3xl bg-slate-800/30 border border-slate-700/50 glow-blue">
          <Calculator className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Посчитайте вашу <span className="gradient-text">выгоду</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Калькулятор ROI покажет потенциальную экономию и окупаемость
          </p>
          <Link 
            to="/calculator"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-bold text-lg hover:shadow-lg transition-all inline-block"
          >
            Рассчитать ROI
          </Link>
        </div>
      </div>
    </section>
  );
};

const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Готовы увидеть <span className="gradient-text">100% своих звонков</span>?
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Начните бесплатно — 300 минут анализа. Без карты. Без обязательств.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
            Начать бесплатно
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-xl font-semibold text-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            Связаться с нами
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Без привязки карты
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Настройка за 15 минут
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Поддержка в Telegram
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

