import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, SignInFormData, SignUpFormData } from '@/types'
import { authService } from '../services/authService'
import { showSuccess, showError, showLoading } from '@/utils/toast'
import toast from 'react-hot-toast'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      status: 'idle',

      setUser: (user) => set({ user, status: user ? 'authenticated' : 'unauthenticated' }),
      setSession: (session) => set({ session }),
      setStatus: (status) => set({ status }),

      signIn: async (credentials: SignInFormData) => {
        set({ status: 'loading' })
        const loadingToast = showLoading('እባክዎ ይጠብቁ...')
        
        try {
          const response = await authService.signIn(credentials)
          
          if (response.error) {
            showError(response.error)
            set({ status: 'unauthenticated', user: null, session: null })
            toast.dismiss(loadingToast)
            return
          }
          
          if (response.data) {
            set({
              user: response.data.user,
              session: response.data.session,
              status: 'authenticated',
            })
            showSuccess('በደስታ እንኳን ደህና መጡ!')
          }
        } catch (error) {
          console.error('Sign in error:', error)
          showError('የመግቢያ ሂደት አልተሳካም')
          set({ status: 'unauthenticated' })
        } finally {
          toast.dismiss(loadingToast)
        }
      },

      signUp: async (data: SignUpFormData) => {
        set({ status: 'loading' })
        const loadingToast = showLoading('እባክዎ ይጠብቁ...')
        
        try {
          const response = await authService.signUp(data)
          
          if (response.error) {
            showError(response.error)
            set({ status: 'unauthenticated' })
            toast.dismiss(loadingToast)
            return
          }
          
          if (response.data) {
            await get().signIn({
              phone: data.phone,
              password: data.password,
            })
          }
        } catch (error) {
          console.error('Sign up error:', error)
          showError('የምዝገባ ሂደት አልተሳካም')
          set({ status: 'unauthenticated' })
        } finally {
          toast.dismiss(loadingToast)
        }
      },

      signOut: async () => {
        set({ status: 'loading' })
        
        try {
          const response = await authService.signOut()
          
          if (response.error) {
            showError(response.error)
            set({ status: 'authenticated' })
            return
          }
          
          set({
            user: null,
            session: null,
            status: 'unauthenticated',
          })
          showSuccess('በሰላም ውጥታል')
        } catch (error) {
          console.error('Sign out error:', error)
          showError('የመውጫ ሂደት አልተሳካም')
        }
      },

      refreshUser: async () => {
        try {
          const response = await authService.getCurrentUser()
          
          if (response.data) {
            const currentUser = get().user
            set({ 
              user: {
                ...response.data,
                address: currentUser?.address || response.data.address,
              }, 
              status: 'authenticated' 
            })
          } else {
            set({ user: null, status: 'unauthenticated' })
          }
        } catch (error) {
          console.error('Refresh user error:', error)
          set({ user: null, status: 'unauthenticated' })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session,
        status: state.status,
      }),
    }
  )
)