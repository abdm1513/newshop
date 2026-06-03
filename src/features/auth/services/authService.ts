import { supabase } from '@/lib/supabase'
import { SignUpFormData, SignInFormData, User, ApiResponse } from '@/types'
import { generateEmailFromPhone, formatPhoneNumber } from '../utils/authValidation'

export const authService = {
  async signUp(data: SignUpFormData): Promise<ApiResponse<User>> {
    try {
      const formattedPhone = formatPhoneNumber(data.phone)
      const email = generateEmailFromPhone(formattedPhone)
      
      // Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: data.password,
        phone: formattedPhone,
        options: {
          data: {
            name: data.name,
            phone_number: formattedPhone,
          },
        },
      })

      if (signUpError) throw signUpError

      if (!authData.user) {
        throw new Error('Failed to create user')
      }

      // Create profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name: data.name,
          phone_number: formattedPhone,
          email: email,
        })

      if (profileError) throw profileError

      return {
        data: {
          id: authData.user.id,
          name: data.name,
          phone_number: formattedPhone,
          email: email,
          is_verified: false,
          address: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null,
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to sign up',
      }
    }
  },

  async signIn(data: SignInFormData): Promise<ApiResponse<{ user: User; session: any }>> {
    try {
      const formattedPhone = formatPhoneNumber(data.phone)
      const email = generateEmailFromPhone(formattedPhone)

      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: data.password,
      })

      if (signInError) throw signInError

      if (!authData.user) {
        throw new Error('Failed to sign in')
      }

      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      const user: User = {
        id: authData.user.id,
        name: profile?.name || authData.user.user_metadata.name,
        phone_number: profile?.phone_number || authData.user.phone || formattedPhone,
        email: profile?.email || authData.user.email,
        is_verified: false,
        address: profile?.address || '',
        created_at: authData.user.created_at,
        updated_at: authData.user.updated_at,
      }

      return {
        data: { user, session: authData.session },
        error: null,
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to sign in',
      }
    }
  },

  async signOut(): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { data: null, error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to sign out',
      }
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) throw userError
      if (!user) return { data: null, error: null }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      const userData: User = {
        id: user.id,
        name: profile?.name || user.user_metadata.name,
        phone_number: profile?.phone_number || user.phone || '',
        email: profile?.email || user.email,
        is_verified: false,
        address: profile?.address || '',
        created_at: user.created_at,
        updated_at: user.updated_at,
      }

      return { data: userData, error: null }
    } catch (error) {
      console.error('Get current user error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to get user',
      }
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString(),
      }
      
      if (updates.name !== undefined) updateData.name = updates.name
      if (updates.phone_number !== undefined) updateData.phone_number = updates.phone_number
      if (updates.address !== undefined) updateData.address = updates.address
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      return { data: data as User, error: null }
    } catch (error) {
      console.error('Update profile error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      }
    }
  },

  async resetPassword(phone: string): Promise<ApiResponse<null>> {
    try {
      const formattedPhone = formatPhoneNumber(phone)
      const email = generateEmailFromPhone(formattedPhone)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      
      if (error) throw error
      
      return { data: null, error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to reset password',
      }
    }
  },
}