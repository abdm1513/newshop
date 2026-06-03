import { Session } from '@supabase/supabase-js'
import { SupabaseRow } from './global.types'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

export interface User extends SupabaseRow {
  name: string
  email?: string
  phone_number: string // Make required, not optional
  address?: string
  is_verified: boolean
}

export interface AuthState {
  user: User | null
  session: Session | null
  status: AuthStatus

  // Actions
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setStatus: (status: AuthStatus) => void
  signIn: (credentials: SignInFormData) => Promise<void>
  signUp: (data: SignUpFormData) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

export interface SignUpFormData {
  name: string
  phone: string
  password: string
  confirmPassword: string
}

export interface SignInFormData {
  phone: string
  password: string
}

export interface ForgotPasswordFormData {
  phone: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export interface UpdateProfileFormData {
  name?: string
  phone_number?: string
  address?: string
}