import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { OrderDetails, useOrder } from '@/features/orders'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'

export function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // useOrder expects only orderId, it gets userId from auth context
  const { data: order, isLoading, error } = useOrder(id!)

  // Show loading state
  if (isLoading) {
    return <PageLoader />
  }

  // Show error state
  if (error || !order) {
    return (
      <div className="container-custom py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-6"
          >
            <ArrowLeft size={20} />
            <span>ወደ ትዕዛዞቼ ተመለስ</span>
          </button>
          <ErrorState 
            title="የትዕዛዝ ዝርዝር ማምጣት አልተቻለም"
            message={error?.message || "እባክዎ በኋላ ይሞክሩ"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-6"
        >
          <ArrowLeft size={20} />
          <span>ወደ ትዕዛዞቼ ተመለስ</span>
        </button>

        <OrderDetails order={order} />
      </div>
    </div>
  )
}