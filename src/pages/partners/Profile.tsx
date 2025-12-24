import { useState } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useUpdatePartner } from '@/hooks/usePartner';
import { useToast } from '@/hooks/use-toast';
import PartnerLayout from '@/components/layout/PartnerLayout';

const Profile = () => {
  const { partner } = useAuth();
  const updatePartner = useUpdatePartner();
  const { toast } = useToast();
  
  const [form, setForm] = useState({
    first_name: partner?.first_name || '',
    last_name: partner?.last_name || '',
    phone: partner?.phone || '',
    telegram: partner?.telegram || '',
  });

  const [paymentForm, setPaymentForm] = useState({
    payment_method: partner?.payment_method || 'card',
    card_number: (partner?.payment_details as { card_number?: string })?.card_number || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updatePartner.mutateAsync({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone || null,
        telegram: form.telegram || null,
      });

      toast({
        title: 'Сохранено!',
        description: 'Профиль успешно обновлён',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updatePartner.mutateAsync({
        payment_method: paymentForm.payment_method as 'card' | 'usdt_trc20' | 'usdt_erc20',
        payment_details: { card_number: paymentForm.card_number },
      });

      toast({
        title: 'Сохранено!',
        description: 'Платёжные данные обновлены',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <PartnerLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Профиль</h1>
          <p className="text-slate-400">Управляйте личными данными и настройками</p>
        </div>

        {/* Partner Info */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">
                {partner?.first_name} {partner?.last_name}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {partner?.email}
              </CardDescription>
              <p className="text-sm text-blue-400 mt-1">
                Реф. код: <code className="bg-slate-800 px-2 py-0.5 rounded">{partner?.referral_code}</code>
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Info Form */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Личные данные</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Имя</Label>
                  <Input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Фамилия</Label>
                  <Input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Телефон</Label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Telegram</Label>
                  <Input
                    name="telegram"
                    value={form.telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={updatePartner.isPending}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90"
              >
                {updatePartner.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Платёжные данные</CardTitle>
            <CardDescription className="text-slate-400">
              Реквизиты для получения выплат
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Способ выплаты</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'card', label: 'Карта СБП' },
                    { value: 'usdt_trc20', label: 'USDT TRC20' },
                    { value: 'usdt_erc20', label: 'USDT ERC20' },
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentForm({ ...paymentForm, payment_method: method.value })}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        paymentForm.payment_method === method.value
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">
                  {paymentForm.payment_method === 'card' ? 'Номер карты' : 'Адрес кошелька'}
                </Label>
                <Input
                  name="card_number"
                  value={paymentForm.card_number}
                  onChange={handlePaymentChange}
                  placeholder={paymentForm.payment_method === 'card' ? '2200 0000 0000 0000' : '0x...'}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                type="submit"
                disabled={updatePartner.isPending}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90"
              >
                {updatePartner.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Статистика аккаунта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between p-3 rounded-lg bg-slate-900/50">
                <span className="text-slate-400">Статус</span>
                <span className={`font-medium ${
                  partner?.status === 'active' ? 'text-emerald-400' : 
                  partner?.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {partner?.status === 'active' ? 'Активен' : 
                   partner?.status === 'pending' ? 'На модерации' : 'Заблокирован'}
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-slate-900/50">
                <span className="text-slate-400">Уровень</span>
                <span className="text-white font-medium capitalize">{partner?.tier}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-slate-900/50">
                <span className="text-slate-400">Комиссия</span>
                <span className="text-emerald-400 font-medium">{partner?.commission_rate}%</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-slate-900/50">
                <span className="text-slate-400">Регистрация</span>
                <span className="text-white">
                  {partner?.registered_at ? new Date(partner.registered_at).toLocaleDateString('ru-RU') : '—'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PartnerLayout>
  );
};

export default Profile;

