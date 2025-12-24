import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    telegram: '',
    referralCode: '',
    source: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateReferralCode = () => {
    // Генерируем код из имени и случайных символов
    const namePart = (form.firstName || 'USER').toUpperCase().slice(0, 4);
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${namePart}${randomPart}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    if (form.password.length < 6) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен быть не менее 6 символов',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const { error } = await signUp(form.email, form.password, {
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone || undefined,
      telegram: form.telegram || undefined,
      referral_code: form.referralCode || generateReferralCode(),
      source: form.source || undefined,
    });

    setLoading(false);

    if (error) {
      toast({
        title: 'Ошибка регистрации',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Регистрация успешна!',
      description: 'Проверьте email для подтверждения аккаунта',
    });

    navigate('/partners/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <Card className="relative w-full max-w-lg bg-slate-900/80 border-slate-800 backdrop-blur">
        <CardHeader className="text-center">
          <Link to="/partners" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад к описанию
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-2xl text-white">Регистрация партнёра</CardTitle>
          <CardDescription className="text-slate-400">
            Создайте аккаунт и начните зарабатывать
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-300">Имя *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Иван"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-300">Фамилия *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Иванов"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ivan@example.com"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Пароль *</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Минимум 6 символов"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram" className="text-slate-300">Telegram</Label>
                <Input
                  id="telegram"
                  name="telegram"
                  value={form.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralCode" className="text-slate-300">Ваш промокод (необязательно)</Label>
              <Input
                id="referralCode"
                name="referralCode"
                value={form.referralCode}
                onChange={handleChange}
                placeholder="Оставьте пустым — сгенерируем автоматически"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 uppercase"
                maxLength={20}
              />
              <p className="text-xs text-slate-500">Будет вашей реферальной ссылкой: aisalesanalyticru.vercel.app/?ref=КОД</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source" className="text-slate-300">Как узнали о программе?</Label>
              <select
                id="source"
                name="source"
                value={form.source}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md bg-slate-800/50 border border-slate-700 text-white"
              >
                <option value="">Выберите вариант</option>
                <option value="google">Поиск Google</option>
                <option value="social">Социальные сети</option>
                <option value="friend">Рекомендация друга</option>
                <option value="email">Email рассылка</option>
                <option value="blog">Статья/блог</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </Button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Уже есть аккаунт?{' '}
            <Link to="/partners/login" className="text-blue-400 hover:text-blue-300">
              Войти
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

