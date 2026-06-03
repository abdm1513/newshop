import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { OrderDetails, useOrder } from '@/features/orders'
import { useAuth } from '@/features/auth'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: order, isLoading, error } = useOrder(id!, user?.id || '')

  if (isLoading) {
    return <PageLoader />
  }

  if (error || !order) {
    return <ErrorState onRetry={() => navigate('/orders')} />
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