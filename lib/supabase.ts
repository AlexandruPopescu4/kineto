import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export type Database = {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          name: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          user_id?: string
        }
        Update: {
          name?: string
        }
      }
    }
  }
}
