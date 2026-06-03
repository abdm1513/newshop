import { cn } from '@/utils/cn'

interface PageLoaderProps {
  fullScreen?: boolean
  className?: string
}

export function PageLoader({ fullScreen = false, className }: PageLoaderProps) {
  const skeletons = (
    <div className={cn("space-y-4", className)}>
      {/* Hero Section Skeleton */}
      <div className="w-full h-48 sm:h-64 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse" />
      
      {/* Categories Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-20 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-14 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Products Grid Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-3">
              <div className="h-28 bg-gray-200 rounded-lg animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-2/3" />
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">እባክዎ ይጠብቁ...</p>
        </div>
      </div>
    )
  }

  return skeletons
}