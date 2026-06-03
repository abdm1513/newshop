import { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { WifiOff } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
  isOffline?: boolean
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action, 
  className,
  isOffline = false 
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12 px-4", className)}>
      <div className="flex justify-center mb-4">
        {icon || (
          <svg 
            className="w-16 h-16 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && <div>{action}</div>}
      {isOffline && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg inline-block">
          <p className="text-sm text-orange-700 flex items-center gap-2">
            <WifiOff size={16} />
            እባክዎ በይነመረብ መስመርዎን ይፈትሹ እና እንደገና ይሞክሩ
          </p>
        </div>
      )}
    </div>
  )
}