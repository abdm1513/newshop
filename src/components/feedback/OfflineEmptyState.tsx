import { WifiOff } from 'lucide-react'
import { EmptyState } from './EmptyState'

interface OfflineEmptyStateProps {
  title?: string
  description?: string
}

export function OfflineEmptyState({ 
  title = 'ከመረጃ ቋት ጋር መገናኘት አልተቻለም', 
  description = 'እባክዎ በይነመረብ መስመርዎን ይፈትሹ እና ገጹን እንደገና ይጫኑ' 
}: OfflineEmptyStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        title={title}
        description={description}
        icon={<WifiOff className="w-16 h-16 text-orange-500" />}
        isOffline={true}
        action={
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            እንደገና ሞክር
          </button>
        }
      />
    </div>
  )
}