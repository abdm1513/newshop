import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { OrderDetails, useOrder } from '@/features/orders'
import { useAuth } from '@/features/auth'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [debugOrder, setDebugOrder] = useState<any>(null)
  
  const { data: order, isLoading, error } = useOrder(id!, user?.id)

  // Debug: Direct fetch to see what's happening
  useEffect(() => {
    const debugFetch = async () => {
      if (!id || !user?.id) return
      
      console.log('🔍 Debug fetching order:', id, 'for user:', user.id)
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()
      
      console.log('🔍 Direct fetch result:', { data, error })
      setDebugOrder(data)
    }
    
    debugFetch()
  }, [id, user])

  console.log('OrderDetailsPage state:', { 
    orderId: id, 
    userId: user?.id,
    isAuthenticated,
    isLoading,
    hasOrder: !!order,
    error,
    debugOrder 
  })

  if (isLoading) {
    return <PageLoader />
  }

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
          {debugOrder && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-mono">Debug: Order found in direct query but not in hook</p>
              <pre className="text-xs overflow-auto">{JSON.stringify(debugOrder, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    )
  }

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

        <OrderDetails order={order} />
      </div>
    </div>
  )
}