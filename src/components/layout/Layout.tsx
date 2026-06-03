import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { InternetStatusBanner } from './InternetStatusBanner'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { FloatingCartButton } from '@/features/cart/components/FloatingCartButton'

export function Layout() {
  useScrollToTop()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <InternetStatusBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCartButton />
    </div>
  )
}