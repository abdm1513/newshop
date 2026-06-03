import { Navigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth'
import { useAuth } from '@/features/auth'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container-custom py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}