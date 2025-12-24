import { useState } from 'react';
import { Copy, Check, Download, Image, FileText, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PartnerLayout from '@/components/layout/PartnerLayout';

const Materials = () => {
  const { partner } = useAuth();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const referralLink = `https://aisalesanalyticru.vercel.app/?ref=${partner?.referral_code || ''}`;

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: 'Скопировано!' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const textTemplates = [
    {
      id: 'template1',
      title: 'Для холодного письма',
      text: `Привет! Недавно узнал про сервис AI Sales Analytics — это ИИ-аналитика звонков менеджеров. 

Он автоматически слушает все звонки и находит, где менеджеры теряют клиентов. Экономит кучу времени РОПам.

Если интересно — вот ссылка: ${referralLink}

Там есть бесплатный аудит 10 звонков.`,
    },
    {
      id: 'template2',
      title: 'Для чата предпринимателей',
      text: `Кто работает с отделами продаж — посмотрите AI Sales Analytics.

Это ИИ, который слушает звонки менеджеров и сам пишет отчёты: кто плохо работает, где теряются сделки, какие скрипты не работают.

Знакомый РОП за месяц поднял конверсию на 23%.

${referralLink}`,
    },
    {
      id: 'template3',
      title: 'Для Telegram-канала',
      text: `🎯 Нашёл полезный инструмент для тех, у кого есть отдел продаж

AI Sales Analytics — это ИИ, который анализирует звонки менеджеров и показывает:
• Кто из менеджеров сливает лиды
• Какие возражения не отрабатываются  
• Где теряется конверсия

Экономит РОПам 10+ часов в неделю на прослушке.

Первые 10 звонков — бесплатно 👇
${referralLink}`,
    },
    {
      id: 'template4',
      title: 'Короткое сообщение',
      text: `Посмотри AI Sales Analytics — ИИ-аналитика звонков для отдела продаж. Реально полезная штука: ${referralLink}`,
    },
  ];

  const socialPosts = [
    {
      id: 'post1',
      platform: 'LinkedIn',
      text: `Поделюсь находкой для владельцев бизнеса и руководителей продаж.

AI Sales Analytics — сервис, который использует ИИ для анализа телефонных разговоров менеджеров.

Что он делает:
✓ Автоматически слушает все звонки
✓ Находит слабые места в скриптах
✓ Показывает, где теряются клиенты
✓ Формирует отчёты по каждому менеджеру

Знаю несколько компаний, которые с его помощью увеличили конверсию на 20-30%.

Если у вас есть отдел продаж — рекомендую попробовать: ${referralLink}`,
    },
    {
      id: 'post2',
      platform: 'Facebook',
      text: `Друзья, если у вас есть бизнес с отделом продаж — обратите внимание на AI Sales Analytics.

Это ИИ-сервис, который анализирует звонки менеджеров и автоматически находит проблемы: плохую отработку возражений, слитых клиентов, неэффективные скрипты.

РОПы экономят часы на прослушке, а конверсия растёт.

Попробуйте — первые 10 звонков бесплатно: ${referralLink}`,
    },
  ];

  const banners = [
    { id: 'banner1', name: 'Баннер 728x90', size: '728x90', color: 'from-blue-600 to-emerald-600' },
    { id: 'banner2', name: 'Квадрат 300x300', size: '300x300', color: 'from-purple-600 to-blue-600' },
    { id: 'banner3', name: 'Вертикальный 160x600', size: '160x600', color: 'from-emerald-600 to-teal-600' },
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Промо-материалы</h1>
          <p className="text-slate-400">Готовые материалы для продвижения — просто скопируйте и используйте</p>
        </div>

        {/* Referral Link Reminder */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <p className="text-slate-300 text-sm mb-2">Ваша реферальная ссылка:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-blue-400 bg-slate-900/50 px-3 py-2 rounded-lg text-sm break-all">
                {referralLink}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(referralLink, 'link')}
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                {copiedId === 'link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="texts" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="texts" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <FileText className="w-4 h-4 mr-2" />
              Тексты
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              Соцсети
            </TabsTrigger>
            <TabsTrigger value="banners" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Image className="w-4 h-4 mr-2" />
              Баннеры
            </TabsTrigger>
          </TabsList>

          {/* Text Templates */}
          <TabsContent value="texts" className="space-y-4">
            {textTemplates.map((template) => (
              <Card key={template.id} className="bg-slate-800/30 border-slate-700/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-white">{template.title}</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(template.text, template.id)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1 text-emerald-400" />
                          Скопировано
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Копировать
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                    {template.text}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Social Posts */}
          <TabsContent value="social" className="space-y-4">
            {socialPosts.map((post) => (
              <Card key={post.id} className="bg-slate-800/30 border-slate-700/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-white">{post.platform}</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(post.text, post.id)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      {copiedId === post.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1 text-emerald-400" />
                          Скопировано
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Копировать
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                    {post.text}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Banners */}
          <TabsContent value="banners" className="space-y-4">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Баннеры</CardTitle>
                <CardDescription className="text-slate-400">
                  Скачайте готовые баннеры для размещения на сайтах и в рекламе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {banners.map((banner) => (
                    <div key={banner.id} className="space-y-3">
                      <div className={`aspect-video rounded-lg bg-gradient-to-br ${banner.color} flex items-center justify-center p-4`}>
                        <div className="text-center text-white">
                          <p className="font-bold text-lg">AI Sales Analytics</p>
                          <p className="text-sm opacity-80">ИИ-аналитика звонков</p>
                          <p className="text-xs mt-2 opacity-60">{banner.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">{banner.name}</span>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          <Download className="w-4 h-4 mr-1" />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-slate-500 mt-6">
                  💡 <strong className="text-slate-400">Совет:</strong> Добавляйте к баннерам свою реферальную ссылку.
                  Она будет автоматически сохранять ref-код при переходе.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Правила использования</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-400 space-y-2">
                <p>✅ Разрешено: таргетированная реклама в соцсетях, размещение на своих сайтах, email-рассылки</p>
                <p>✅ Разрешено: редактирование текстов под свою аудиторию</p>
                <p>❌ Запрещено: контекстная реклама по брендовым запросам (AI Sales Analytics)</p>
                <p>❌ Запрещено: спам и недобросовестная реклама</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PartnerLayout>
  );
};

export default Materials;

