import { useState } from 'react';
import { Wallet, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { usePayouts, useRequestPayout } from '@/hooks/usePayouts';
import { formatCurrency, formatDate } from '@/utils/referralTracking';
import { useToast } from '@/hooks/use-toast';
import PartnerLayout from '@/components/layout/PartnerLayout';

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: 'Ожидает', icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-500' },
  processing: { label: 'В обработке', icon: <Loader2 className="w-4 h-4 animate-spin" />, color: 'bg-blue-500' },
  completed: { label: 'Выплачено', icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-500' },
  rejected: { label: 'Отклонено', icon: <XCircle className="w-4 h-4" />, color: 'bg-red-500' },
};

const Payouts = () => {
  const { partner } = useAuth();
  const { data: payouts, isLoading } = usePayouts();
  const requestPayout = useRequestPayout();
  const { toast } = useToast();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [note, setNote] = useState('');

  const balance = partner?.current_balance || 0;
  const totalEarned = partner?.total_earnings || 0;
  const totalPaidOut = partner?.paid_out || 0;
  const minPayout = 3000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    
    if (!amountNum || amountNum < minPayout) {
      toast({
        title: 'Ошибка',
        description: `Минимальная сумма выплаты: ${formatCurrency(minPayout)}`,
        variant: 'destructive',
      });
      return;
    }

    if (amountNum > balance) {
      toast({
        title: 'Ошибка',
        description: 'Недостаточно средств на балансе',
        variant: 'destructive',
      });
      return;
    }

    if (!cardNumber) {
      toast({
        title: 'Ошибка',
        description: 'Укажите реквизиты для выплаты',
        variant: 'destructive',
      });
      return;
    }

    try {
      await requestPayout.mutateAsync({
        amount: amountNum,
        payment_method: paymentMethod,
        payment_details: { card_number: cardNumber },
        partner_note: note || undefined,
      });

      toast({
        title: 'Запрос отправлен!',
        description: 'Выплата будет обработана в ближайший понедельник',
      });

      setDialogOpen(false);
      setAmount('');
      setCardNumber('');
      setNote('');
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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Выплаты</h1>
          <p className="text-slate-400">Запрашивайте выплаты и отслеживайте историю</p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Доступно к выводу</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(balance)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Всего заработано</p>
                <p className="text-xl font-semibold text-emerald-400">{formatCurrency(totalEarned)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Всего выплачено</p>
                <p className="text-xl font-semibold text-slate-300">{formatCurrency(totalPaidOut)}</p>
              </div>
              <div className="flex items-end">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90"
                      disabled={balance < minPayout}
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Запросить выплату
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Запрос на выплату</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Минимальная сумма: {formatCurrency(minPayout)}. Выплаты по понедельникам.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Сумма</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={minPayout.toString()}
                            min={minPayout}
                            max={balance}
                            className="bg-slate-800/50 border-slate-700 text-white pr-12"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">₽</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Доступно: {formatCurrency(balance)}
                        </p>
                      </div>

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
                              onClick={() => setPaymentMethod(method.value)}
                              className={`p-2 rounded-lg text-sm transition-colors ${
                                paymentMethod === method.value
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
                          {paymentMethod === 'card' ? 'Номер карты' : 'Адрес кошелька'}
                        </Label>
                        <Input
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder={paymentMethod === 'card' ? '2200 0000 0000 0000' : '0x...'}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Комментарий (необязательно)</Label>
                        <Textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Любые пожелания..."
                          className="bg-slate-800/50 border-slate-700 text-white resize-none"
                          rows={2}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={requestPayout.isPending}
                        className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90"
                      >
                        {requestPayout.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          'Отправить запрос'
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {balance < minPayout && (
              <p className="text-sm text-slate-500 mt-4">
                Минимальная сумма для вывода: {formatCurrency(minPayout)}. 
                Ещё {formatCurrency(minPayout - balance)} до минимума.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Payouts History */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">История выплат</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-slate-400">Загрузка...</div>
            ) : !payouts || payouts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                  <Wallet className="w-6 h-6 text-slate-500" />
                </div>
                <p className="text-slate-400">Пока нет выплат</p>
                <p className="text-sm text-slate-500 mt-1">
                  Запросите первую выплату, когда баланс достигнет {formatCurrency(minPayout)}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {payouts.map((payout) => {
                  const status = statusConfig[payout.status];
                  return (
                    <div 
                      key={payout.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${status.color} flex items-center justify-center text-white`}>
                          {status.icon}
                        </div>
                        <div>
                          <p className="text-white font-medium">{formatCurrency(payout.amount)}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge className={`${status.color} text-white text-xs`}>
                              {status.label}
                            </Badge>
                            <span className="text-slate-500">
                              {payout.payment_method === 'card' ? 'Карта СБП' : payout.payment_method.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <p className="text-slate-400">{formatDate(payout.requested_at)}</p>
                        {payout.transaction_id && (
                          <p className="text-xs text-slate-500">ID: {payout.transaction_id}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <h3 className="text-white font-medium mb-2">ℹ️ О выплатах</h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Выплаты обрабатываются <strong className="text-white">каждый понедельник</strong></li>
              <li>• Минимальная сумма: <strong className="text-white">{formatCurrency(minPayout)}</strong></li>
              <li>• Доступные способы: карта СБП, USDT TRC20/ERC20</li>
              <li>• При выплате в USDT минимум $50</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PartnerLayout>
  );
};

export default Payouts;

