import { useEffect, useState } from 'react'
import { WifiOff, CheckCircle } from 'lucide-react'
import { useInternetStatus } from '@/hooks/useInternetStatus'

export function InternetStatusBanner() {
  const isOnline = useInternetStatus()
  const [showBanner, setShowBanner] = useState(false)
  const [bannerType, setBannerType] = useState<'online' | 'offline'>('online')

  useEffect(() => {
    if (!isOnline) {
      setBannerType('offline')
      setShowBanner(true)
    } else if (isOnline && bannerType === 'offline') {
      setBannerType('online')
      setShowBanner(true)
      // Auto hide after 3 seconds when coming back online
      const timer = setTimeout(() => {
        setShowBanner(false)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (isOnline && showBanner && bannerType === 'online') {
      const timer = setTimeout(() => setShowBanner(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline])

  if (!showBanner) return null

  if (bannerType === 'offline') {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-2 text-center animate-slide-down">
        <div className="container-custom flex items-center justify-center gap-2">
          <WifiOff size={18} />
          <span className="text-sm font-medium">
            የበይነመረብ ግንኙነት ተቋርጧል። እባክዎ ይፈትሹ
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white px-4 py-2 text-center animate-slide-down animate-fade-out">
      <div className="container-custom flex items-center justify-center gap-2">
        <CheckCircle size={18} />
        <span className="text-sm font-medium">
          በይነመረብ መስመር ተመልሷል
        </span>
      </div>
    </div>
  )
}