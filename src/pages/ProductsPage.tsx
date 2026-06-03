import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid, ProductCard, useProducts } from '@/features/products'
import { Categories } from '@/features/products'
import { useCart } from '@/features/cart'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'
import { OfflineEmptyState } from '@/components/feedback/OfflineEmptyState'
import { useInternetStatus } from '@/hooks/useInternetStatus'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/config'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category') || undefined
  const isOnline = useInternetStatus()
  const queryClient = useQueryClient()
  const [hasCachedData, setHasCachedData] = useState(true)
  const [isCheckingCache, setIsCheckingCache] = useState(true)
  
  const { addToCart, incrementQuantity, decrementQuantity, items: cartItems } = useCart()
  
  
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useProducts({ 
    categoryId,
    limit: 20
  })

  const products = data?.pages.flatMap(page => page.data?.data || []) || []
  const totalProducts = data?.pages[0]?.data?.total || 0

  // Check for cached data
  useEffect(() => {
    const checkCachedData = () => {
      const cachedProducts = queryClient.getQueryData([QUERY_KEYS.PRODUCTS, { categoryId, limit: 20 }])
      
      let hasCache = false
      if (cachedProducts && typeof cachedProducts === 'object' && 'pages' in cachedProducts) {
        const pages = (cachedProducts as any).pages
        if (Array.isArray(pages) && pages.length > 0) {
          const firstPage = pages[0]
          if (firstPage?.data?.data && firstPage.data.data.length > 0) {
            hasCache = true
          }
        }
      }
      
      setHasCachedData(hasCache)
      setIsCheckingCache(false)
    }
    
    checkCachedData()
  }, [queryClient, categoryId])

  // Update cached data status when products load
  useEffect(() => {
    if (products.length > 0) {
      setHasCachedData(true)
    }
  }, [products])

  // Clear category filter function
  const clearCategory = () => {
    // This will trigger your Categories component's handleCategoryClick
    setSearchParams({})
  }

  // Prefetch adjacent categories for smoother navigation
  useEffect(() => {
    if (categoryId) {
      // Optional: Prefetch next/prev categories if you have that data
      // This makes category switching feel instant
    }
  }, [categoryId])

  // Show loading while checking cache
  if (isCheckingCache) {
    return <PageLoader />
  }

  // Show offline empty state when offline, no cached data, and not loading
  if (!isOnline && !hasCachedData && !isLoading && products.length === 0) {
    return <OfflineEmptyState 
      title="ምርቶች ማምጣት አልተቻለም"
      description="በይነመረብ መስመርዎ ተቋርጧል እና የተቀመጠ መረጃ የለም። እባክዎ በይነመረብ መስመርዎን ይፈትሹ እና እንደገና ይሞክሩ።"
    />
  }

  // Show error state when online but error occurred and no cached data
  if (isError && !hasCachedData && !isLoading && products.length === 0 && isOnline) {
    return <ErrorState onRetry={() => refetch()} />
  }

  if (isLoading && products.length === 0) {
    return <PageLoader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom py-6 sm:py-10">
        {/* Hero Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            ምርቶቻችን
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {totalProducts > 0 ? `${totalProducts} ምርቶች ተገኝተዋል` : 'ምርቶች እየተጫኑ ነው...'}
          </p>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">ምድቦች</h2>
            {categoryId && (
              <button
                onClick={clearCategory}
                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1 transition-colors"
              >
                ሁሉንም አሳይ
                <span className="text-lg">→</span>
              </button>
            )}
          </div>
          
          {/* Your Categories component - no changes needed! */}
          <Categories variant="products" />
        </div>

        {/* Active Category Badge */}
        {categoryId && (
          <div className="mb-6 flex items-center gap-2 animate-fadeIn">
            <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
              በምድብ ውስጥ እያዩ ነው
            </div>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && hasCachedData && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-yellow-700 text-sm">ከመስመር ውጭ ነዎት። የተቀመጠ መረጃ እያዩ ነው።</p>
            </div>
          </div>
        )}

        {/* Products Grid - Add key to force re-render animation */}
        <div key={categoryId || 'all'}>
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm animate-fadeIn">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">ምንም ምርቶች አልተገኙም</p>
              <p className="text-gray-400 text-sm mt-1">እባክዎ ሌላ ምድብ ይሞክሩ</p>
            </div>
          ) : (
            <>
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

              {/* Load More Button */}
              {hasNextPage && (
                <div className="text-center mt-10 animate-fadeIn">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-8 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 border border-green-200"
                  >
                    {isFetchingNextPage ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        በመጫን ላይ...
                      </span>
                    ) : (
                      'ተጨማሪ ምርቶች'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}