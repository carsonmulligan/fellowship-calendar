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
      bookmarks: {
        Row: {
          id: string
          user_id: string
          fellowship_id: string
          created_at: string
          notes: string | null
          priority: 'high' | 'medium' | 'low' | null
          status: 'interested' | 'preparing' | 'applying'
        }
        Insert: {
          id?: string
          user_id: string
          fellowship_id: string
          created_at?: string
          notes?: string | null
          priority?: 'high' | 'medium' | 'low' | null
          status?: 'interested' | 'preparing' | 'applying'
        }
        Update: {
          id?: string
          user_id?: string
          fellowship_id?: string
          created_at?: string
          notes?: string | null
          priority?: 'high' | 'medium' | 'low' | null
          status?: 'interested' | 'preparing' | 'applying'
        }
      }
      bookmark_tags: {
        Row: {
          id: string
          bookmark_id: string
          tag_name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          bookmark_id: string
          tag_name: string
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          bookmark_id?: string
          tag_name?: string
          color?: string
          created_at?: string
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