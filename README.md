# Sales Call Analytics - AI-аналитика звонков

Многостраничный сайт сервиса AI-аналитики звонков отдела продаж.

## 🚀 Технологии

- **React 18** + **TypeScript**
- **Vite** - быстрая сборка
- **React Router** - маршрутизация
- **Tailwind CSS** - стилизация
- **Lucide React** - иконки

## 📦 Установка

```bash
npm install
```

## 🛠️ Разработка

```bash
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173) в браузере.

## 🏗️ Сборка

```bash
npm run build
```

## 📤 Деплой на Vercel

### Через GitHub

1. Создайте репозиторий на GitHub
2. Загрузите код:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. Зайдите на [vercel.com](https://vercel.com)
4. Нажмите "New Project"
5. Импортируйте ваш GitHub репозиторий
6. Vercel автоматически определит настройки Vite
7. Нажмите "Deploy"

### Через Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## 📄 Структура проекта

```
src/
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── BlogLayout.tsx
├── pages/
│   ├── Home.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Integrations.tsx
│   ├── ForWhom.tsx
│   ├── Calculator.tsx
│   ├── Blog.tsx
│   └── blog/
│       ├── Conversion.tsx
│       ├── AiVsHuman.tsx
│       ├── Onboarding.tsx
│       ├── Scripts.tsx
│       ├── AmoCRM.tsx
│       └── ROI.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🌐 Страницы

- `/` - Главная
- `/features` - Возможности
- `/pricing` - Тарифы
- `/integrations` - Интеграции
- `/for-whom` - Для кого
- `/calculator` - Калькулятор ROI
- `/blog` - Блог
- `/blog/*` - Статьи блога

## 📝 Лицензия

© 2024 Sales Call Analytics. Все права защищены.
