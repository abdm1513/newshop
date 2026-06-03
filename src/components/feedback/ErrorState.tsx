import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ 
  title = 'ስህተት ተፈጥሯል', 
  message = 'ይቅርታ, አገልግሎቱን ለማግኘት ችግር ተፈጥሯል። እባክዎ በኋላ ይሞክሩ።',
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("text-center py-12 px-4", className)}>
      <div className="flex justify-center mb-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <RefreshCw size={18} />
          እንደገና ሞክር
        </button>
      )}
    </div>
  )
}