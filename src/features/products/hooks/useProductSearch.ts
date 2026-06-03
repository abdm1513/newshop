import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { QUERY_KEYS } from '@/constants/config'

export function useProductSearch(searchTerm: string, limit: number = 10) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) return []
      const response = await productService.searchProducts(searchTerm, limit)
      if (response.error) throw new Error(response.error)
      return response.data || []
    },
    enabled: searchTerm.length >= 2,
    staleTime: 1 * 60 * 1000,
  })
}