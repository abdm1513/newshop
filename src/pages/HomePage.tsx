import { useState, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { BannerCarousel } from '@/features/banners'
import { Categories, FeaturedProducts, ProductGrid, ProductCard, useProducts } from '@/features/products'
import { useCart } from '@/features/cart'
import { useInternetStatus } from '@/hooks/useInternetStatus'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'
import { OfflineEmptyState } from '@/components/feedback/OfflineEmptyState'
import { QUERY_KEYS } from '@/constants/config'

export default function HomePage() {
  const isOnline = useInternetStatus()
  const queryClient = useQueryClient()
  const { addToCart, incrementQuantity, decrementQuantity, items: cartItems } = useCart()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasCachedData, setHasCachedData] = useState(true)
  const initialLoadDone = useRef(false)
  
  const { data, isLoading, refetch, isFetching, isError } = useProducts({ limit: 12 })
  
  const products = data?.pages.flatMap(page => page.data?.data || []) || []
  const hasProducts = products.length > 0

  // Check for cached data on initial load
  useEffect(() => {
    const checkCachedData = () => {
      const cachedProducts = queryClient.getQueryData([QUERY_KEYS.PRODUCTS])
      const cachedCategories = queryClient.getQueryData([QUERY_KEYS.CATEGORIES])
      const cachedBanners = queryClient.getQueryData([QUERY_KEYS.BANNERS])
      
      const hasCache = !!(cachedProducts || cachedCategories || cachedBanners)
      setHasCachedData(hasCache)
    }
    
    if (!initialLoadDone.current && !isLoading) {
      checkCachedData()
      initialLoadDone.current = true
    }
  }, [queryClient, isLoading])

  // Auto-refresh when internet comes back - only once
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const refreshData = async () => {
      if (isOnline && !isLoading && !isFetching && !isRefreshing && hasProducts) {
        setIsRefreshing(true)
        try {
          await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] })
          await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] })
          await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BANNERS] })
          await refetch()
        } catch (err) {
          console.error('Refresh failed:', err)
        } finally {
          // Hide refresh indicator after 2 seconds
          timeoutId = setTimeout(() => {
            setIsRefreshing(false)
          }, 2000)
        }
      }
    }
    
    // Only refresh if we were previously offline and now online
    if (isOnline && !initialLoadDone.current) {
      refreshData()
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isOnline, queryClient, refetch, isLoading, isFetching, isRefreshing, hasProducts])

  // Show offline empty state when offline, no cached data, and not loading
  if (!isOnline && !hasCachedData && !isLoading && !hasProducts) {
    return <OfflineEmptyState />
  }

  // Show error state when online but error occurred and no cached data
  if (isError && !hasCachedData && !isLoading && !hasProducts) {
    return <ErrorState onRetry={() => refetch()} />
  }

  // Show loading only on initial load
  if (isLoading && !hasProducts) {
    return <PageLoader />
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Banners - only show if online or have data */}
      {(isOnline || hasCachedData) && <BannerCarousel />}

      <div className="container-custom space-y-6 sm:space-y-8">
        {/* Categories Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">ምድቦች</h2>
          </div>
          <Categories variant="home" />
        </section>

        {/* Featured Products Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">ታዋቂ ምርቶች</h2>
          </div>
          <FeaturedProducts />
        </section>

        {/* All Products Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">ሁሉም ምርቶች</h2>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">ምንም ምርቶች አልተገኙም</p>
            </div>
          ) : (
            <ProductGrid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItem={cartItems.find(item => item.product_id === product.id)}
                  onAddToCart={addToCart}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                />
              ))}
            </ProductGrid>
          )}

          {/* Load More Button */}
          {data?.pages[data.pages.length - 1]?.data?.hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                {isFetching ? 'በመጫን ላይ...' : 'ተጨማሪ ምርቶች'}
              </button>
            </div>
          )}
        </section>

        {/* Offline indicator - shows when offline but has cached data */}
        {!isOnline && hasCachedData && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg text-sm">
              ከመስመር ውጭ ነዎት። የተቀመጠ መረጃ እያዩ ነው።
            </div>
          </div>
        )}

        {/* Refresh Indicator - shows when refreshing after coming online */}
        {isRefreshing && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              መረጃ እየታደሰ ነው...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}