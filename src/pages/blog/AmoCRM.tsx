import React from 'react';
import BlogLayout from '../../components/BlogLayout';

const AmoCRMArticle: React.FC = () => (
  <BlogLayout title="AmoCRM + AI: автоматизация, которая экономит 40 минут в день" category="CRM" readTime="7 мин" date="5 дек 2024">
    <p className="text-xl text-slate-400 mb-8">Менеджеры тратят 30-40 минут в день на заполнение CRM. Это рутина, которую можно автоматизировать.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Что можно автоматизировать</h2>
    <p className="mb-4"><strong>Имя клиента.</strong> AI извлекает имя из разговора и заполняет поле контакта.</p>
    <p className="mb-4"><strong>Бюджет.</strong> Если клиент озвучил бюджет, AI добавит его в карточку сделки.</p>
    <p className="mb-4"><strong>Следующий шаг.</strong> AI определяет договорённость и создаёт задачу.</p>
    <p className="mb-4"><strong>Содержание разговора.</strong> Краткое резюме в примечание к сделке.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Как настроить интеграцию</h2>
    <p className="mb-4"><strong>Шаг 1.</strong> Подключите AmoCRM через OAuth — это занимает 2-3 минуты.</p>
    <p className="mb-4"><strong>Шаг 2.</strong> Настройте маппинг полей.</p>
    <p className="mb-4"><strong>Шаг 3.</strong> Установите порог уверенности.</p>
    <p className="mb-4"><strong>Шаг 4.</strong> Включите автоматическое заполнение после Deep-анализа.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Экономия времени</h2>
    <p className="mb-4">В среднем менеджер экономит 40 минут в день. При команде из 5 человек это 200 минут (более 3 часов) в день.</p>
  </BlogLayout>
);

export default AmoCRMArticle;

