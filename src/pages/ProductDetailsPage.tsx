import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProductDetails } from '@/features/products'
import { productService } from '@/features/products'
import { useInternetStatus } from '@/hooks/useInternetStatus'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorState } from '@/components/feedback/ErrorState'
import { OfflineEmptyState } from '@/components/feedback/OfflineEmptyState'
import { QUERY_KEYS } from '@/constants/config'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const isOnline = useInternetStatus()
  
  const { data: product, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      const response = await productService.getProductById(id!)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })

  // Show loading state
  if (isLoading) {
    return <PageLoader />
  }

  // Show offline empty state when offline and no product data
  if (!isOnline && !product) {
    return (
      <OfflineEmptyState 
        title="የምርት ዝርዝር ማምጣት አልተቻለም"
        description="በይነመረብ መስመርዎ ተቋርጧል እና የተቀመጠ መረጃ የለም። እባክዎ በይነመረብ መስመርዎን ይፈትሹ እና እንደገና ይሞክሩ።"
      />
    )
  }

  // Show error state when online but error occurred
  if (error && isOnline) {
    return <ErrorState onRetry={() => refetch()} />
  }

  // Show error state when offline but have product (unlikely but possible)
  if (error && !isOnline && !product) {
    return (
      <OfflineEmptyState 
        title="የምርት ዝርዝር ማምጣት አልተቻለም"
        description="እባክዎ በይነመረብ መስመርዎን ይፈትሹ እና እንደገና ይሞክሩ።"
      />
    )
  }

  // Show product details
  return <ProductDetails />
}