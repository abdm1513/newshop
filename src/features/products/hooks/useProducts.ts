import { useInfiniteQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { QUERY_KEYS } from '@/constants/config'

export function useProducts(params?: {
  categoryId?: string
  isFeatured?: boolean
  search?: string
  limit?: number
}) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: ({ pageParam = 0 }) =>
      productService.getProducts({
        ...params,
        limit: params?.limit || 20,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.data) return undefined
      const { hasMore, offset, limit } = lastPage.data
      return hasMore ? offset + limit : undefined
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000, // Keep cached data for 30 minutes
  })
}