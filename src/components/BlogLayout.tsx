import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BlogLayoutProps {
  title: string;
  category: string;
  readTime: string;
  date: string;
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ title, category, readTime, date, children }) => (
  <div className="pt-24 pb-20">
    <article className="max-w-3xl mx-auto px-4">
      <Link 
        to="/blog"
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
      >
        <ArrowLeft className="w-4 h-4" />Назад к блогу
      </Link>
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">{category}</span>
          <span className="text-sm text-slate-500">{readTime}</span>
          <span className="text-sm text-slate-500">•</span>
          <span className="text-sm text-slate-500">{date}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
      </header>
      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">{children}</div>
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 text-center">
        <h3 className="text-2xl font-bold mb-4">Хотите автоматизировать анализ звонков?</h3>
        <p className="text-slate-400 mb-6">Попробуйте Sales Call Analytics бесплатно — 300 минут</p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl font-semibold">
          Начать бесплатно
        </button>
      </div>
    </article>
  </div>
);

export default BlogLayout;

