export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      partners: {
        Row: {
          id: string
          user_id: string | null
          email: string
          first_name: string
          last_name: string
          phone: string | null
          telegram: string | null
          referral_code: string
          status: 'pending' | 'active' | 'blocked'
          tier: 'bronze' | 'silver' | 'gold' | 'platinum'
          total_referrals: number
          active_referrals: number
          total_earnings: number
          current_balance: number
          paid_out: number
          commission_rate: number
          lifetime_binding: boolean
          payment_method: 'card' | 'usdt_trc20' | 'usdt_erc20' | null
          payment_details: Json
          telegram_notifications: boolean
          email_notifications: boolean
          source: string | null
          registered_at: string
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          telegram?: string | null
          referral_code: string
          status?: 'pending' | 'active' | 'blocked'
          tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
          total_referrals?: number
          active_referrals?: number
          total_earnings?: number
          current_balance?: number
          paid_out?: number
          commission_rate?: number
          lifetime_binding?: boolean
          payment_method?: 'card' | 'usdt_trc20' | 'usdt_erc20' | null
          payment_details?: Json
          telegram_notifications?: boolean
          email_notifications?: boolean
          source?: string | null
          registered_at?: string
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          telegram?: string | null
          referral_code?: string
          status?: 'pending' | 'active' | 'blocked'
          tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
          total_referrals?: number
          active_referrals?: number
          total_earnings?: number
          current_balance?: number
          paid_out?: number
          commission_rate?: number
          lifetime_binding?: boolean
          payment_method?: 'card' | 'usdt_trc20' | 'usdt_erc20' | null
          payment_details?: Json
          telegram_notifications?: boolean
          email_notifications?: boolean
          source?: string | null
          registered_at?: string
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          partner_id: string | null
          name: string
          email: string | null
          phone: string | null
          company: string | null
          managers_count: string | null
          calls_per_day: string | null
          crm_system: string | null
          notes: string | null
          referral_code_used: string | null
          source: 'link' | 'organic' | 'manual'
          status: 'new' | 'contacted' | 'demo' | 'trial' | 'converted' | 'active' | 'churned' | 'rejected'
          plan_selected: string | null
          total_paid: number
          commission_earned: number
          total_payments: number
          lifetime_binding: boolean
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          clicked_at: string | null
          registered_at: string
          contacted_at: string | null
          demo_at: string | null
          converted_at: string | null
          last_payment_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          partner_id?: string | null
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          managers_count?: string | null
          calls_per_day?: string | null
          crm_system?: string | null
          notes?: string | null
          referral_code_used?: string | null
          source?: 'link' | 'organic' | 'manual'
          status?: 'new' | 'contacted' | 'demo' | 'trial' | 'converted' | 'active' | 'churned' | 'rejected'
          plan_selected?: string | null
          total_paid?: number
          commission_earned?: number
          total_payments?: number
          lifetime_binding?: boolean
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          clicked_at?: string | null
          registered_at?: string
          contacted_at?: string | null
          demo_at?: string | null
          converted_at?: string | null
          last_payment_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          partner_id?: string | null
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          managers_count?: string | null
          calls_per_day?: string | null
          crm_system?: string | null
          notes?: string | null
          referral_code_used?: string | null
          source?: 'link' | 'organic' | 'manual'
          status?: 'new' | 'contacted' | 'demo' | 'trial' | 'converted' | 'active' | 'churned' | 'rejected'
          plan_selected?: string | null
          total_paid?: number
          commission_earned?: number
          total_payments?: number
          lifetime_binding?: boolean
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          clicked_at?: string | null
          registered_at?: string
          contacted_at?: string | null
          demo_at?: string | null
          converted_at?: string | null
          last_payment_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      commission_records: {
        Row: {
          id: string
          partner_id: string
          referral_id: string
          payment_id: string | null
          payment_amount: number
          commission_amount: number
          commission_rate: number
          payment_type: 'first' | 'recurring'
          status: 'pending' | 'approved' | 'paid'
          created_at: string
        }
        Insert: {
          id?: string
          partner_id: string
          referral_id: string
          payment_id?: string | null
          payment_amount: number
          commission_amount: number
          commission_rate: number
          payment_type: 'first' | 'recurring'
          status?: 'pending' | 'approved' | 'paid'
          created_at?: string
        }
        Update: {
          id?: string
          partner_id?: string
          referral_id?: string
          payment_id?: string | null
          payment_amount?: number
          commission_amount?: number
          commission_rate?: number
          payment_type?: 'first' | 'recurring'
          status?: 'pending' | 'approved' | 'paid'
          created_at?: string
        }
      }
      payouts: {
        Row: {
          id: string
          partner_id: string
          amount: number
          currency: string
          status: 'pending' | 'processing' | 'completed' | 'rejected'
          payment_method: string
          payment_details: Json
          transaction_id: string | null
          partner_note: string | null
          admin_note: string | null
          requested_at: string
          processed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          partner_id: string
          amount: number
          currency?: string
          status?: 'pending' | 'processing' | 'completed' | 'rejected'
          payment_method: string
          payment_details: Json
          transaction_id?: string | null
          partner_note?: string | null
          admin_note?: string | null
          requested_at?: string
          processed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          partner_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'processing' | 'completed' | 'rejected'
          payment_method?: string
          payment_details?: Json
          transaction_id?: string | null
          partner_note?: string | null
          admin_note?: string | null
          requested_at?: string
          processed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      referral_clicks: {
        Row: {
          id: string
          partner_id: string | null
          referral_code: string
          ip_address: string | null
          user_agent: string | null
          page_url: string | null
          referrer: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          clicked_at: string
        }
        Insert: {
          id?: string
          partner_id?: string | null
          referral_code: string
          ip_address?: string | null
          user_agent?: string | null
          page_url?: string | null
          referrer?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          clicked_at?: string
        }
        Update: {
          id?: string
          partner_id?: string | null
          referral_code?: string
          ip_address?: string | null
          user_agent?: string | null
          page_url?: string | null
          referrer?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          clicked_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'partner'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'partner'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'partner'
          created_at?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Partner = Database['public']['Tables']['partners']['Row']
export type Referral = Database['public']['Tables']['referrals']['Row']
export type CommissionRecord = Database['public']['Tables']['commission_records']['Row']
export type Payout = Database['public']['Tables']['payouts']['Row']
export type ReferralClick = Database['public']['Tables']['referral_clicks']['Row']
export type UserRole = Database['public']['Tables']['user_roles']['Row']

