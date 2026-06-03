import { useQuery } from '@tanstack/react-query'
import { bannerService } from '../services/bannerService'
import { QUERY_KEYS } from '@/constants/config'

export function useBanners() {
  return useQuery({
    queryKey: [QUERY_KEYS.BANNERS],
    queryFn: async () => {
      const response = await bannerService.getBanners()
      if (response.error) throw new Error(response.error)
      return response.data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}