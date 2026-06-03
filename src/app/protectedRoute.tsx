import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { PageLoader } from '@/components/feedback/PageLoader'

export function ProtectedRoute() {
  const { user, status } = useAuthStore()
  const location = useLocation()

  if (status === 'loading') {
    return <PageLoader />
  }

  if (!user || status === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}