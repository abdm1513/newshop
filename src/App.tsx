// import { Toaster } from 'react-hot-toast'
// import { AppProviders } from '@/app/providers'
// import { AppRoutes } from '@/app/routes'

// function App() {
//   return (
//     <AppProviders>
//       <Toaster position="top-center" reverseOrder={false} />
//       <AppRoutes />
//     </AppProviders>
//   )
// }

// export default App

import { useEffect } from 'react'
import { AppProviders } from '@/app/providers'
import { AppRoutes } from '@/app/routes'
import { useAuthStore } from '@/features/auth/stores/authStore'

function AppContent() {
  const { refreshUser, status } = useAuthStore()

  useEffect(() => {
    // Initialize auth on app start
    refreshUser()
  }, [refreshUser])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">እባክዎ ይጠብቁ...</p>
        </div>
      </div>
    )
  }

  return <AppRoutes />
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  )
}

export default App