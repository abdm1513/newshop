import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '../services/orderService'
import { QUERY_KEYS } from '@/constants/config'
import { showSuccess, showError } from '@/utils/toast'
import { CreateOrderInput } from '@/types'
import { useAuth } from '@/features/auth'

export function useOrders(limit: number = 20) {
  const { user, isAuthenticated, status } = useAuth()
  
  const isEnabled = !!user?.id && isAuthenticated && status === 'authenticated'
  
  console.log('useOrders hook state:', { 
    userId: user?.id, 
    isAuthenticated, 
    status,
    isEnabled 
  })
  
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ORDERS, user?.id],
    queryFn: ({ pageParam = 0 }) => {
      console.log('Fetching orders page:', pageParam, 'User ID:', user?.id)
      // Don't fetch if no user
      if (!user?.id || !isAuthenticated) {
        console.log('No user authenticated, returning empty orders')
        return Promise.resolve({
          data: {
            data: [],
            total: 0,
            limit: limit,
            offset: pageParam,
            hasMore: false,
          },
          error: null,
        })
      }
      return orderService.getUserOrders(user.id, limit, pageParam)
    },
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage?.data) return undefined
      const { hasMore, offset, limit } = lastPage.data
      return hasMore ? offset + limit : undefined
    },
    initialPageParam: 0,
    enabled: isEnabled,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

// Rest of the hooks remain the same...
export function useOrder(orderId: string) {
  const { user, isAuthenticated } = useAuth()
  
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId, user?.id],
    queryFn: async () => {
      if (!user?.id || !isAuthenticated) {
        throw new Error('User not authenticated')
      }
      const response = await orderService.getOrderById(orderId, user.id)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: !!orderId && !!user?.id && isAuthenticated,
    staleTime: 1 * 60 * 1000,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (orderData: CreateOrderInput) => {
      console.log('Creating order with user:', user?.id)
      if (!user?.id) {
        throw new Error('User not authenticated')
      }
      const orderWithUser = {
        ...orderData,
        user_id: user.id,
      }
      console.log('Order data being sent:', orderWithUser)
      const response = await orderService.createOrder(orderWithUser)
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    },
    onSuccess: (data) => {
      if (data) {
        console.log('Order created successfully, invalidating queries')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] })
        showSuccess('ትዕዛዝዎ በሚገባ ተመዝግቧል!')
      }
    },
    onError: (error: Error) => {
      console.error('Create order error:', error)
      showError(error.message || 'ትዕዛዝ ማስገባት አልተቻለም')
    },
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: ({ orderId }: { orderId: string }) => {
      if (!user?.id) {
        throw new Error('User not authenticated')
      }
      return orderService.cancelOrder(orderId, user.id)
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] })
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER, data.data.id] })
        showSuccess('ትዕዛዝዎ ተሰርዟል')
      } else if (data.error) {
        showError(data.error)
      }
    },
    onError: (error: Error) => {
      showError(error.message || 'ትዕዛዝ መሰረዝ አልተቻለም')
    },
  })
}