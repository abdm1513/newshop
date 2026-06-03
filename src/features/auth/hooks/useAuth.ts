import { useAuthStore } from '../stores/authStore'
import { useEffect } from 'react'

export function useAuth() {
  const {
    user,
    session,
    status,
    signIn,
    signUp,
    signOut,
    refreshUser,
    setUser,
  } = useAuthStore()

  // Compute isAuthenticated based on status and user
  const isAuthenticated = status === 'authenticated' && !!user
  const isLoading = status === 'loading'

  // Log auth state for debugging
  useEffect(() => {
    console.log('useAuth state:', { 
      userId: user?.id, 
      status, 
      isAuthenticated, 
      isLoading,
      hasUser: !!user 
    })
  }, [user, status, isAuthenticated, isLoading])

  return {
    user,
    session,
    status,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshUser,
    setUser,
  }
}