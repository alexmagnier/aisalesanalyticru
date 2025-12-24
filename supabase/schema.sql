-- =============================================
-- AI SALES ANALYTICS - ПАРТНЁРСКИЙ КАБИНЕТ
-- SQL Schema для Supabase
-- =============================================

-- ВКЛЮЧИТЬ UUID EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ТАБЛИЦА ПАРТНЁРОВ
-- =============================================
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  telegram TEXT,
  
  -- Реферальная система
  referral_code TEXT UNIQUE NOT NULL,
  
  -- Статус и уровень
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'blocked')),
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  
  -- Статистика
  total_referrals INTEGER DEFAULT 0,
  active_referrals INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  current_balance DECIMAL(10,2) DEFAULT 0,
  paid_out DECIMAL(10,2) DEFAULT 0,
  
  -- Комиссия (по уровню)
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  
  -- Lifetime привязка (всегда TRUE)
  lifetime_binding BOOLEAN DEFAULT TRUE,
  
  -- Платёжные данные
  payment_method TEXT CHECK (payment_method IN ('card', 'usdt_trc20', 'usdt_erc20')),
  payment_details JSONB DEFAULT '{}',
  
  -- Уведомления
  telegram_notifications BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  
  -- Как узнал о программе
  source TEXT,
  
  -- Метаданные
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_partners_referral_code ON partners(referral_code);
CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_email ON partners(email);

-- =============================================
-- ТАБЛИЦА РЕФЕРАЛОВ (заявки/клиенты)
-- =============================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- ⚠️ ВАЖНО: NULLABLE! Для органических заявок partner_id = NULL
  partner_id UUID REFERENCES partners(id),
  
  -- Данные клиента
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  
  -- Детали заявки
  managers_count TEXT,
  calls_per_day TEXT,
  crm_system TEXT,
  notes TEXT,
  
  -- Реферальная информация
  referral_code_used TEXT,
  source TEXT DEFAULT 'organic' CHECK (source IN ('link', 'organic', 'manual')),
  
  -- Статус воронки
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new',
    'contacted',
    'demo',
    'trial',
    'converted',
    'active',
    'churned',
    'rejected'
  )),
  
  -- Финансы
  plan_selected TEXT,
  total_paid DECIMAL(10,2) DEFAULT 0,
  commission_earned DECIMAL(10,2) DEFAULT 0,
  total_payments INTEGER DEFAULT 0,
  
  -- Lifetime привязка
  lifetime_binding BOOLEAN DEFAULT TRUE,
  
  -- UTM метки
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Даты
  clicked_at TIMESTAMPTZ,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  demo_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  last_payment_at TIMESTAMPTZ,
  
  -- Метаданные
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_referrals_partner_id ON referrals(partner_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referral_code ON referrals(referral_code_used);
CREATE INDEX IF NOT EXISTS idx_referrals_email ON referrals(email);

-- =============================================
-- ТАБЛИЦА ЗАПИСЕЙ О КОМИССИЯХ
-- =============================================
CREATE TABLE IF NOT EXISTS commission_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id) NOT NULL,
  referral_id UUID REFERENCES referrals(id) NOT NULL,
  
  payment_id TEXT,
  payment_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  
  payment_type TEXT NOT NULL CHECK (payment_type IN ('first', 'recurring')),
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_commission_records_partner ON commission_records(partner_id);
CREATE INDEX IF NOT EXISTS idx_commission_records_referral ON commission_records(referral_id);

-- =============================================
-- ТАБЛИЦА ВЫПЛАТ
-- =============================================
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id) NOT NULL,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'RUB',
  
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'processing',
    'completed',
    'rejected'
  )),
  
  payment_method TEXT NOT NULL,
  payment_details JSONB NOT NULL,
  
  transaction_id TEXT,
  
  partner_note TEXT,
  admin_note TEXT,
  
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_payouts_partner_id ON payouts(partner_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);

-- =============================================
-- ТАБЛИЦА КЛИКОВ (аналитика)
-- =============================================
CREATE TABLE IF NOT EXISTS referral_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  referral_code TEXT NOT NULL,
  
  ip_address TEXT,
  user_agent TEXT,
  page_url TEXT,
  referrer TEXT,
  
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_clicks_partner_id ON referral_clicks(partner_id);
CREATE INDEX IF NOT EXISTS idx_clicks_referral_code ON referral_clicks(referral_code);
CREATE INDEX IF NOT EXISTS idx_clicks_date ON referral_clicks(clicked_at);

-- =============================================
-- ТАБЛИЦА РОЛЕЙ (для админов)
-- =============================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'partner')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Индекс
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);

-- =============================================
-- ТАБЛИЦА НАСТРОЕК
-- =============================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Дефолтные настройки
INSERT INTO settings (key, value) VALUES 
  ('commission_tiers', '{"bronze": 10, "silver": 12, "gold": 15, "platinum": 20}'),
  ('tier_thresholds', '{"bronze": 0, "silver": 5, "gold": 15, "platinum": 30}'),
  ('min_payout', '{"RUB": 3000, "USDT": 50}'),
  ('payout_schedule', '"weekly"')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- RLS ПОЛИТИКИ (Row Level Security)
-- =============================================

-- ПАРТНЁРЫ
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view own data"
ON partners FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Partners can update own data"
ON partners FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow anonymous partner registration"
ON partners FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated partner insert"
ON partners FOR INSERT
TO authenticated
WITH CHECK (true);

-- РЕФЕРАЛЫ
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view own referrals"
ON referrals FOR SELECT
USING (partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()));

CREATE POLICY "Allow anonymous referral submission"
ON referrals FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated referral insert"
ON referrals FOR INSERT
TO authenticated
WITH CHECK (true);

-- КОМИССИИ
ALTER TABLE commission_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view own commissions"
ON commission_records FOR SELECT
USING (partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()));

-- ВЫПЛАТЫ
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view own payouts"
ON payouts FOR SELECT
USING (partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()));

CREATE POLICY "Partners can request payouts"
ON payouts FOR INSERT
WITH CHECK (partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()));

-- КЛИКИ
ALTER TABLE referral_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view own clicks"
ON referral_clicks FOR SELECT
USING (partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid()));

CREATE POLICY "Allow anonymous click tracking"
ON referral_clicks FOR INSERT
TO anon
WITH CHECK (true);

-- РОЛИ
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
ON user_roles FOR SELECT
USING (user_id = auth.uid());

-- НАСТРОЙКИ (публичное чтение)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
ON settings FOR SELECT
TO anon, authenticated
USING (true);

-- =============================================
-- ADMIN POLICIES (добавьте user_id админа)
-- Замените 'YOUR_ADMIN_USER_ID' на реальный UUID
-- =============================================
-- После создания админа выполните:
-- INSERT INTO user_roles (user_id, role) VALUES ('YOUR_ADMIN_USER_ID', 'admin');

