import { queryClient } from '@/lib/queryClient'

export interface CacheCheckResult {
  hasCache: boolean
  dataType: 'products' | 'orders' | 'categories' | 'banners' | 'none'
}

export const hasCachedProducts = (params?: any): boolean => {
  const queryKey = [QUERY_KEYS.PRODUCTS]
  if (params) {
    queryKey.push(params)
  }
  
  const data = queryClient.getQueryData(queryKey)
  if (!data) return false
  
  if (typeof data === 'object' && data !== null && 'pages' in data) {
    const pages = (data as any).pages
    if (Array.isArray(pages) && pages.length > 0) {
      const firstPage = pages[0]
      if (firstPage?.data?.data && firstPage.data.data.length > 0) {
        return true
      }
    }
  }
  
  return false
}

export const hasCachedOrders = (): boolean => {
  const data = queryClient.getQueryData([QUERY_KEYS.ORDERS])
  if (!data) return false
  
  if (typeof data === 'object' && data !== null && 'pages' in data) {
    const pages = (data as any).pages
    if (Array.isArray(pages) && pages.length > 0) {
      const firstPage = pages[0]
      if (firstPage?.data?.data && firstPage.data.data.length > 0) {
        return true
      }
    }
  }
  
  return false
}

export const hasCachedCategories = (): boolean => {
  const data = queryClient.getQueryData([QUERY_KEYS.CATEGORIES])
  if (!data) return false
  if (Array.isArray(data) && data.length > 0) return true
  return false
}

export const hasCachedBanners = (): boolean => {
  const data = queryClient.getQueryData([QUERY_KEYS.BANNERS])
  if (!data) return false
  if (Array.isArray(data) && data.length > 0) return true
  return false
}

// Import QUERY_KEYS to avoid circular dependency
import { QUERY_KEYS } from '@/constants/config'