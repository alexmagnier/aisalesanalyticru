import React from 'react';
import BlogLayout from '../../components/BlogLayout';

const ROIArticle: React.FC = () => (
  <BlogLayout title="Окупаемость сервиса аналитики звонков: расчёт для бизнеса" category="ROI" readTime="9 мин" date="3 дек 2024">
    <p className="text-xl text-slate-400 mb-8">Перед внедрением любого инструмента важно понять: окупится ли он?</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Источники экономии и дополнительной выручки</h2>
    <p className="mb-4"><strong>1. Экономия времени РОПа.</strong> Если РОП тратит 4 часа в день на прослушивание, это 55% рабочего времени. При зарплате 150 000 ₽ это эквивалент 82 500 ₽/мес.</p>
    <p className="mb-4"><strong>2. Сокращение ОКК.</strong> AI может заменить 2-3 сотрудников. Экономия: 120 000 — 240 000 ₽/мес.</p>
    <p className="mb-4"><strong>3. Экономия времени менеджеров на CRM.</strong> 40 минут × 5 менеджеров × 22 дня = 73 часа/мес.</p>
    <p className="mb-4"><strong>4. Рост конверсии.</strong> Потенциальный рост на 15-30%.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Формула расчёта ROI</h2>
    <p className="mb-4 font-mono bg-slate-800/50 p-4 rounded-lg">ROI = ((Экономия + Доп. выручка - Стоимость) / Стоимость) × 100%</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Пример расчёта</h2>
    <p className="mb-4">Команда: 5 менеджеров, 30 звонков/день, средний чек 100 000 ₽</p>
    <p className="mb-4">• Экономия времени РОПа: 50 000 ₽</p>
    <p className="mb-4">• Экономия на CRM: 36 500 ₽</p>
    <p className="mb-4">• Потенциальный рост выручки (10%): 500 000 ₽</p>
    <p className="mb-4">• Стоимость тарифа «Команда»: 14 900 ₽</p>
    <p className="mb-4 text-amber-300">⚠️ Это оценочный расчёт. Фактические результаты зависят от многих факторов.</p>
  </BlogLayout>
);

export default ROIArticle;

