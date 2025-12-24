import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Building2, 
  GraduationCap, 
  Settings2, 
  Briefcase,
  Infinity,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Gift,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const tiers = [
  { name: 'Бронза', icon: '🥉', clients: '0-4', commission: '10%', bonus: '—', color: 'amber' },
  { name: 'Серебро', icon: '🥈', clients: '5-14', commission: '12%', bonus: 'Промо-материалы', color: 'slate' },
  { name: 'Золото', icon: '🥇', clients: '15-29', commission: '15%', bonus: '+ Приоритетная поддержка', color: 'yellow' },
  { name: 'Платина', icon: '💎', clients: '30+', commission: '20%', bonus: '+ Персональный менеджер', color: 'slate' },
];

const plans = [
  { name: 'Старт', price: '4 900', minutes: '500', commission: '735' },
  { name: 'Команда', price: '14 900', minutes: '2000', commission: '2 235' },
  { name: 'Бизнес', price: '34 900', minutes: '5000', commission: '5 235' },
  { name: 'Enterprise', price: 'от 99 000', minutes: 'индивидуально', commission: 'от 14 850' },
];

const forWhom = [
  { icon: Users, title: 'Бизнес-консультанты', desc: 'Консультируете компании по продажам и маркетингу? Рекомендуйте AI Sales Analytics своим клиентам.' },
  { icon: Building2, title: 'Владельцы агентств', desc: 'Агентство недвижимости, маркетинга, рекрутинга? Предложите решение коллегам по индустрии.' },
  { icon: GraduationCap, title: 'Бизнес-тренеры', desc: 'Обучаете продажам? Добавьте AI-аналитику в программу курса.' },
  { icon: Settings2, title: 'CRM-интеграторы', desc: 'Настраиваете AmoCRM или Битрикс24? Предложите клиентам комплексное решение.' },
  { icon: Briefcase, title: 'Руководители продаж', desc: 'Есть знакомые РОПы или собственники? Делитесь инструментом, который сами бы хотели иметь.' },
];

const benefits = [
  { icon: TrendingUp, title: 'Lifetime комиссии', desc: 'Получайте до 20% с КАЖДОГО платежа клиента — навсегда. Не только с первого, а со всех последующих тоже!' },
  { icon: Infinity, title: 'Вечная привязка клиентов', desc: 'Клиент закрепляется за вами навсегда. Никаких ограничений по времени — ссылка не сгорает.' },
  { icon: BarChart3, title: 'Прозрачная статистика', desc: 'Личный кабинет с полной аналитикой: клики, регистрации, оплаты, комиссии.' },
  { icon: Zap, title: 'Быстрые выплаты', desc: 'Еженедельные выплаты в рублях или USDT. Минимальная сумма — 3 000 ₽.' },
  { icon: Target, title: 'Качественный продукт', desc: 'AI Sales Analytics решает реальную проблему бизнеса. Высокая конверсия — ваши рекомендации работают.' },
  { icon: Gift, title: 'Промо-материалы', desc: 'Готовые баннеры, тексты, посты для соцсетей. Всё, что нужно для продвижения.' },
];

const faqs = [
  { q: 'Как начисляется комиссия?', a: 'Комиссия начисляется с КАЖДОГО платежа приведённого клиента. Клиент платит за тариф — вы получаете процент. Клиент докупает минуты — снова получаете. Процент зависит от вашего уровня (от 10% до 20%).' },
  { q: 'Когда я получу выплату?', a: 'Выплаты производятся еженедельно по понедельникам. Минимальная сумма для вывода — 3 000 ₽ (или $50 USDT). Если баланс меньше — накапливается до следующей выплаты.' },
  { q: 'Как долго действует моя реферальная ссылка?', a: 'НАВСЕГДА. Клиент закрепляется за вами бессрочно. Нет никаких ограничений по времени — если клиент перешёл по вашей ссылке и зарегистрировался, он ваш навсегда.' },
  { q: 'Получу ли я комиссию с повторных платежей?', a: 'ДА! Это главное преимущество нашей программы. Вы получаете комиссию с КАЖДОГО платежа клиента, пока он пользуется сервисом.' },
  { q: 'Есть ли ограничения на количество рефералов?', a: 'Нет. Вы можете привлекать неограниченное количество клиентов и зарабатывать без каких-либо лимитов.' },
  { q: 'Могу ли я продвигать ссылку в рекламе?', a: 'Да! Таргетированная реклама в соцсетях — разрешена. Запрещено только использовать бренд в контекстной рекламе.' },
];

const PartnersLanding = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Партнёрская программа AI Sales Analytics
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Зарабатывайте на рекомендациях
            <br />
            <span className="gradient-text">AI Sales Analytics</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Рекомендуйте AI-аналитику звонков друзьям и клиентам.
            <br />
            Получайте до <span className="text-emerald-400 font-semibold">20% комиссии</span> с КАЖДОГО платежа.
            <br />
            Пассивный доход — навсегда.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <span className="text-2xl font-bold gradient-text">до 20%</span>
              <span className="text-slate-400 text-sm">комиссия<br />с продаж</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Infinity className="w-6 h-6 text-blue-400" />
              <span className="text-slate-400 text-sm">Lifetime<br />привязка</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <span className="text-slate-400 text-sm">Без лимитов<br />на доход</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/partners/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 text-white px-8">
                Стать партнёром
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/partners/login">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Войти в кабинет
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-slate-500 mt-4">
            Бесплатно • Без обязательств • Выплаты в рублях или USDT
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-4">
            Три простых шага к заработку
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Начните зарабатывать уже сегодня — регистрация занимает 2 минуты
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', icon: '📝', title: 'Зарегистрируйтесь', desc: 'Заполните форму за 2 минуты. Получите персональную реферальную ссылку.' },
              { num: '02', icon: '📤', title: 'Рекомендуйте', desc: 'Делитесь ссылкой с друзьями, клиентами, в соцсетях, чатах предпринимателей.' },
              { num: '03', icon: '💰', title: 'Зарабатывайте', desc: 'Получайте комиссию с каждого клиента, который пришёл по вашей ссылке.' },
            ].map((step, i) => (
              <Card key={i} className="bg-slate-800/30 border-slate-700/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 text-8xl font-bold text-slate-800/50 group-hover:text-blue-500/20 transition-colors">
                  {step.num}
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-4">
            Пассивный доход. Комиссия с КАЖДОГО платежа — навсегда.
          </h2>
          
          <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/30 mb-12 max-w-4xl mx-auto">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-3">💰 LIFETIME КОМИССИИ</h3>
              <p className="text-slate-300">
                Вы получаете комиссию не только с первого платежа,
                а <strong className="text-emerald-400">С КАЖДОГО ПЛАТЕЖА</strong> клиента, пока он пользуется сервисом.
              </p>
              <p className="text-slate-400 mt-2">
                Клиент платит за минуты → Вы получаете комиссию<br />
                Клиент докупает минуты → Вы снова получаете!<br />
                <strong className="text-white">Это настоящий пассивный доход!</strong>
              </p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold text-white text-center mb-6">Уровни партнёров</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {tiers.map((tier, i) => (
              <Card key={i} className={`bg-slate-800/30 border-slate-700/50 ${i === 2 ? 'ring-2 ring-yellow-500/50' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{tier.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-1">{tier.name}</h4>
                  <p className="text-slate-500 text-sm mb-3">{tier.clients} клиентов</p>
                  <p className="text-3xl font-bold gradient-text mb-2">{tier.commission}</p>
                  <p className="text-sm text-slate-400">{tier.bonus}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-white text-center mb-6">Ваша комиссия с тарифов (при уровне Золото)</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {plans.map((plan, i) => (
              <Card key={i} className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-semibold text-white mb-1">{plan.name}</h4>
                  <p className="text-slate-500 text-sm mb-3">{plan.minutes} мин.</p>
                  <p className="text-slate-400 mb-2">{plan.price} ₽/мес</p>
                  <p className="text-2xl font-bold text-emerald-400">{plan.commission} ₽/мес</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-800/50 border-slate-700 max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4 text-center">📊 Пример расчёта</h4>
              <p className="text-slate-300 text-center">
                10 клиентов на тарифе "Команда" при уровне "Золото" (15%):
              </p>
              <ul className="text-slate-400 mt-4 space-y-2">
                <li className="flex justify-between"><span>Ежемесячно:</span><span className="text-white">10 × 14 900 × 15% = <strong className="text-emerald-400">22 350 ₽</strong></span></li>
                <li className="flex justify-between"><span>За год:</span><span className="text-white">22 350 × 12 = <strong className="text-emerald-400">268 200 ₽</strong></span></li>
                <li className="flex justify-between"><span>За 2 года:</span><span className="text-white"><strong className="text-emerald-400">536 400 ₽</strong> пассивного дохода!</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
            Идеальные партнёры
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWhom.map((item, i) => (
              <Card key={i} className="bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
            Почему партнёры выбирают нас
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <Card key={i} className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
            Частые вопросы о партнёрской программе
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card 
                key={i} 
                className={`bg-slate-800/30 border-slate-700/50 cursor-pointer transition-colors ${
                  openFaq === i ? 'border-blue-500/30' : ''
                }`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white pr-4">{faq.q}</h3>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </div>
                  {openFaq === i && (
                    <p className="text-slate-400 mt-4 text-sm">{faq.a}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Готовы начать зарабатывать?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Регистрация занимает 2 минуты.<br />
            Начните получать комиссии уже на этой неделе.
          </p>
          
          <Link to="/partners/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 text-white px-12 py-6 text-lg">
              Стать партнёром
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Бесплатно
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Без обязательств
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Lifetime комиссии
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersLanding;

