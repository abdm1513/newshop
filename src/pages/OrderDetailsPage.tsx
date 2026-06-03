import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { OrderDetails, useOrder } from '@/features/orders'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth'

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [debugInfo, setDebugInfo] = useState<any>(null)
  
  const { data: order, isLoading, error, refetch } = useOrder(id!)

  // Debug: Direct fetch to see what's happening
  useEffect(() => {
    const debugFetch = async () => {
      if (!id) return
      
      console.log('🔍 Debug - Order ID:', id)
      console.log('🔍 Debug - User ID:', user?.id)
      
      // Try to fetch the order directly
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()
      
      console.log('🔍 Debug - Direct fetch result:', { data, error })
      setDebugInfo({ data, error })
    }
    
    debugFetch()
  }, [id, user])

  console.log('📊 OrderDetailsPage state:', {
    orderId: id,
    userId: user?.id,
    isLoading,
    hasOrder: !!order,
    error: error?.message,
    debugInfo
  })

  // Show loading state
  if (isLoading) {
    return <PageLoader />
  }

  // Show error state with debug info
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
            onRetry={() => {
              console.log('Retrying...')
              refetch()
            }}
          />
          
          {/* Debug info - only show in development */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
              <p className="font-bold mb-2">Debug Information:</p>
              <p>Order ID: {id}</p>
              <p>User ID: {user?.id}</p>
              <p>Direct fetch error: {debugInfo.error?.message || 'None'}</p>
              {debugInfo.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer">View order data</summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {JSON.stringify(debugInfo.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}
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