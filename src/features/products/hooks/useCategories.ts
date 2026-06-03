import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { QUERY_KEYS } from '@/constants/config'

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      const response = await productService.getCategories()
      if (response.error) throw new Error(response.error)
      return response.data || []
    },
    staleTime: 10 * 60 * 1000,
  })
}