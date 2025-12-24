const REF_STORAGE_KEY = 'aisales_ref';
const REF_COOKIE_NAME = 'aisales_ref';

export function getReferralCode(): string | null {
  // 1. Проверяем localStorage
  const localRef = localStorage.getItem(REF_STORAGE_KEY);
  if (localRef) {
    console.log('📍 Ref from localStorage:', localRef);
    return localRef;
  }
  
  // 2. Проверяем cookie
  const match = document.cookie.match(new RegExp(`${REF_COOKIE_NAME}=([^;]+)`));
  if (match) {
    const cookieRef = match[1];
    // Синхронизируем с localStorage
    localStorage.setItem(REF_STORAGE_KEY, cookieRef);
    console.log('📍 Ref from cookie:', cookieRef);
    return cookieRef;
  }
  
  // 3. Проверяем текущий URL (на случай прямого захода)
  const urlRef = new URLSearchParams(window.location.search).get('ref');
  if (urlRef) {
    const cleanRef = urlRef.toUpperCase().trim();
    localStorage.setItem(REF_STORAGE_KEY, cleanRef);
    console.log('📍 Ref from URL:', cleanRef);
    return cleanRef;
  }
  
  console.log('📍 No referral code found');
  return null;
}

export function saveReferralCode(code: string): void {
  const cleanRef = code.toUpperCase().trim();
  
  // 1. Сохраняем в localStorage (основное)
  localStorage.setItem(REF_STORAGE_KEY, cleanRef);
  localStorage.setItem(`${REF_STORAGE_KEY}_time`, Date.now().toString());
  
  // 2. Сохраняем в cookie (резерв, 1 год)
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${REF_COOKIE_NAME}=${cleanRef};max-age=${maxAge};path=/`;
  
  console.log('✅ Referral code saved:', cleanRef);
}

export function clearReferralCode(): void {
  localStorage.removeItem(REF_STORAGE_KEY);
  localStorage.removeItem(`${REF_STORAGE_KEY}_time`);
  document.cookie = `${REF_COOKIE_NAME}=;max-age=0;path=/`;
  console.log('🗑️ Referral code cleared');
}

// ⚠️ ВАЖНО: Простая валидация БЕЗ regex на символы (поддержка кириллицы!)
export function isValidReferralCode(code: string): boolean {
  return code.length >= 4 && code.length <= 20;
}

export function formatCurrency(amount: number, currency: string = 'RUB'): string {
  if (currency === 'RUB') {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return `$${amount.toFixed(2)} USDT`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'сегодня';
  if (diffDays === 1) return 'вчера';
  if (diffDays < 7) return `${diffDays} дн. назад`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
  return formatDate(date);
}

