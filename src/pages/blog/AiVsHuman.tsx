import React from 'react';
import BlogLayout from '../../components/BlogLayout';

const AiVsHumanArticle: React.FC = () => (
  <BlogLayout title="AI vs человек: кто лучше оценивает качество звонков?" category="AI в продажах" readTime="8 мин" date="12 дек 2024">
    <p className="text-xl text-slate-400 mb-8">Отделы контроля качества существуют десятилетиями. Но появление AI ставит вопрос: нужны ли они теперь?</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Преимущества человеческой оценки</h2>
    <p className="mb-4"><strong>Понимание контекста.</strong> Человек слышит сарказм, чувствует напряжение.</p>
    <p className="mb-4"><strong>Гибкость оценки.</strong> Специалист может сказать: «Да, менеджер отошёл от скрипта, но это было правильно».</p>
    <p className="mb-4"><strong>Обучающая функция.</strong> Человек может провести coaching-сессию.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Преимущества AI-оценки</h2>
    <p className="mb-4"><strong>100% покрытие.</strong> AI анализирует ВСЕ звонки.</p>
    <p className="mb-4"><strong>Консистентность.</strong> AI не устаёт, не имеет плохого настроения.</p>
    <p className="mb-4"><strong>Скорость.</strong> Анализ 5-минутного звонка занимает 30-60 секунд.</p>
    <p className="mb-4"><strong>Масштабируемость.</strong> При росте команды AI не требует найма.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Оптимальная модель: гибрид</h2>
    <p className="mb-4">AI анализирует 100% звонков и выявляет проблемные, а человек проводит разбор сложных случаев.</p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Экономика решения</h2>
    <p className="mb-4">Сотрудник ОКК стоит 60-80 тысяч рублей и может проанализировать 200-300 звонков. AI-сервис за сопоставимую сумму анализирует 4000-10000 звонков — в 20-30 раз больше.</p>
  </BlogLayout>
);

export default AiVsHumanArticle;

