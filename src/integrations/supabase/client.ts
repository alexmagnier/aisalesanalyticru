import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase конфигурация
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://bbptfbqcllzgulxvqcgh.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicHRmYnFjbGx6Z3VseHZxY2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1OTg4MTcsImV4cCI6MjA4MjE3NDgxN30.vckizm7dD8S-1MS4gYpLS7Mle8FrNrJCQlvk-3M7xzs';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export { SUPABASE_URL };

