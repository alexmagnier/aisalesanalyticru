import React from 'react';
import BlogLayout from '../../components/BlogLayout';

const OnboardingArticle: React.FC = () => (
  <BlogLayout title="Как ускорить адаптацию новичков с помощью AI-анализа" category="Обучение" readTime="10 мин" date="10 дек 2024">
    <p className="text-xl text-slate-400 mb-8">Средний срок выхода на план для нового менеджера — 2-3 месяца. За это время компания теряет деньги.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Почему новички учатся так долго?</h2>
    <p className="mb-4"><strong>Отсутствие системной обратной связи.</strong> Новичок делает 30 звонков в день. РОП слышит 1-2 из них.</p>
    <p className="mb-4"><strong>Общие советы вместо конкретных.</strong> «Будь увереннее» — это не рекомендация.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Как AI меняет ситуацию</h2>
    <p className="mb-4"><strong>Обратная связь по каждому звонку.</strong> AI анализирует все 30 звонков новичка.</p>
    <p className="mb-4"><strong>Сравнение со скриптом.</strong> AI показывает: «Ты сказал это, а по скрипту нужно вот это».</p>
    <p className="mb-4"><strong>Отслеживание динамики.</strong> Каждую неделю новичок видит график прогресса.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Практическая программа адаптации</h2>
    <p className="mb-4"><strong>День 1-3:</strong> Теория — изучение продукта и скрипта.</p>
    <p className="mb-4"><strong>День 4-7:</strong> Первые звонки в режиме обучения — Deep-анализ каждого разговора.</p>
    <p className="mb-4"><strong>Неделя 2-3:</strong> Работа по сбалансированному режиму.</p>
    <p className="mb-4"><strong>Неделя 4+:</strong> Стандартный режим с еженедельными разборами.</p>
  </BlogLayout>
);

export default OnboardingArticle;

