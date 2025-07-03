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
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          shipping_address: string
          contact_email: string
          contact_phone: string
          contact_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount: number
          shipping_address: string
          contact_email: string
          contact_phone: string
          contact_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total_amount?: number
          shipping_address?: string
          contact_email?: string
          contact_phone?: string
          contact_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          seller_id: string
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          seller_id: string
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          seller_id?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          amount: number
          status: 'pending' | 'succeeded' | 'failed'
          payment_intent_id: string
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          amount: number
          status?: 'pending' | 'succeeded' | 'failed'
          payment_intent_id: string
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          amount?: number
          status?: 'pending' | 'succeeded' | 'failed'
          payment_intent_id?: string
          payment_method?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 