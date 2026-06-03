import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Package, RefreshCw } from 'lucide-react'
import { OrderCard, useOrders } from '@/features/orders'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'
import { OfflineEmptyState } from '@/components/feedback/OfflineEmptyState'
import { useAuth } from '@/features/auth'
import { useInternetStatus } from '@/hooks/useInternetStatus'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/config'
import { supabase } from '@/lib/supabase'

export default function OrderHistoryPage() {
  const { user, isAuthenticated, status, refreshUser } = useAuth()
  const isOnline = useInternetStatus()
  const queryClient = useQueryClient()
  const { ref, inView } = useInView()
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    refetch,
    isError 
  } = useOrders()

  // Force refresh auth on mount
  useEffect(() => {
    const initAuth = async () => {
      await refreshUser()
    }
    initAuth()
  }, [refreshUser])

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // First refresh auth
    await refreshUser()
    // Then invalidate and refetch orders
    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS, user?.id] })
    await refetch()
    setIsRefreshing(false)
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && isOnline && isAuthenticated) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isOnline, isAuthenticated])

  // Direct debug query
  useEffect(() => {
    const debugOrders = async () => {
      if (!user?.id) return
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      console.log('🔍 DIRECT SUPABASE QUERY - Orders:', orders?.length || 0, ordersError)
      console.log('🔍 User ID:', user.id)
      console.log('🔍 Auth Status:', { isAuthenticated, status })
    }
    
    if (user?.id) {
      debugOrders()
    }
  }, [user, isAuthenticated, status])

  const orders = data?.pages.flatMap(page => page.data?.data || []) || []
  const totalOrders = data?.pages[0]?.data?.total || 0

  console.log('📊 OrderHistoryPage render:', { 
    ordersCount: orders.length, 
    totalOrders, 
    isAuthenticated, 
    userId: user?.id,
    status,
    hasData: !!data,
    isLoading 
  })

  // Show loading state
  if ((isLoading || status === 'loading') && !isRefreshing && orders.length === 0) {
    return <PageLoader />
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated && status !== 'loading') {
    return (
      <div className="container-custom py-4 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">እባክዎ ይግቡ</h3>
            <p className="text-gray-500 text-sm mb-6">ትዕዛዞችዎን ለማየት መግባት ያስፈልጋል</p>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              ግባ
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (isError && isOnline && orders.length === 0) {
    return (
      <div className="container-custom py-4 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <ErrorState 
            title="ትዕዛዞችን ማምጣት አልተቻለም"
            message={error?.message || "እባክዎ በኋላ ይሞክሩ"}
            onRetry={handleRefresh}
          />
        </div>
      </div>
    )
  }

  // Show offline empty state when offline and no cached orders
  if (!isOnline && orders.length === 0 && !isLoading) {
    return (
      <OfflineEmptyState 
        title="የትዕዛዝ ታሪክ ማምጣት አልተቻለም"
        description="በይነመረብ መስመርዎ ተቋርጧል እና የተቀመጠ መረጃ የለም። እባክዎ በይነመረብ መስመርዎን ይፈትሹ እና እንደገና ይሞክሩ።"
      />
    )
  }

  return (
    <div className="container-custom py-4 sm:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with Refresh Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">የትዕዛዝ ታሪክ</h1>
            <p className="text-gray-500 text-sm mt-1">
              {totalOrders > 0 ? `${totalOrders} ትዕዛዞች` : 'ምንም ትዕዛዝ የለም'}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="text-sm">አድስ</span>
          </button>
        </div>

        {/* Auth Status Warning */}
        {!isAuthenticated && user && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-center">
            <p className="text-yellow-700 text-sm">
              የግቤት ሁኔታ እየተፈተሸ ነው... እባክዎ ይጠብቁ
            </p>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && orders.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-center">
            <p className="text-yellow-700 text-sm">ከመስመር ውጭ ነዎት። የተቀመጠ መረጃ እያዩ ነው።</p>
          </div>
        )}

        {/* No orders message */}
        {orders.length === 0 && !isLoading && isAuthenticated && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ምንም ትዕዛዝ የለም</h3>
            <p className="text-gray-500 text-sm mb-6">እስካሁን ምንም ትዕዛዝ አላስገቡም</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              ግዢውን ጀምር
            </button>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onCancel={handleRefresh} />
            ))}
            
            {/* Load More Trigger */}
            {hasNextPage && isOnline && (
              <div ref={ref} className="py-4 text-center">
                {isFetchingNextPage ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">ተጨማሪ ለማየት ወደ ታች ይሸብልሉ</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}