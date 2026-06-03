// import { supabase } from '@/lib/supabase'
// import { Order, CreateOrderInput, ApiResponse, PaginatedResponse } from '@/types'

// export const orderService = {
//   async createOrder(orderData: CreateOrderInput): Promise<ApiResponse<Order>> {
//     try {
//       console.log('Creating order with data:', orderData)
      
//       const { data, error } = await supabase
//         .from('orders')
//         .insert({
//           order_number: orderData.order_number,
//           user_id: orderData.user_id,
//           user_name: orderData.user_name,
//           user_phone: orderData.user_phone,
//           items: orderData.items,
//           sub_total: orderData.sub_total,
//           delivery_fee: orderData.delivery_fee,
//           total: orderData.total,
//           order_type: orderData.order_type,
//           order_status: orderData.order_status,
//           payment_method: orderData.payment_method,
//           delivery_address: orderData.delivery_address,
//           delivery_time: orderData.delivery_time,
//           scheduled_time: orderData.scheduled_time,
//           notes: orderData.notes,
//         })
//         .select()
//         .single()

//       if (error) {
//         console.error('Supabase error creating order:', error)
//         throw error
//       }

//       console.log('Order created successfully:', data)
//       return { data: data as Order, error: null }
//     } catch (error) {
//       console.error('Error creating order:', error)
//       return {
//         data: null,
//         error: error instanceof Error ? error.message : 'Failed to create order',
//       }
//     }
//   },

//   async getUserOrders(userId: string, limit?: number, offset?: number): Promise<ApiResponse<PaginatedResponse<Order>>> {
//     // Validate userId
//     if (!userId || userId === 'undefined' || userId === 'null') {
//       console.warn('Invalid user ID provided to getUserOrders:', userId)
//       return {
//         data: {
//           data: [],
//           total: 0,
//           limit: limit || 20,
//           offset: offset || 0,
//           hasMore: false,
//         },
//         error: null,
//       }
//     }

//     try {
//       console.log('Fetching orders for user:', userId)
      
//       let query = supabase
//         .from('orders')
//         .select('*', { count: 'exact' })
//         .eq('user_id', userId)
//         .order('created_at', { ascending: false })

//       if (limit) {
//         query = query.range(offset || 0, (offset || 0) + limit - 1)
//       }

//       const { data, error, count } = await query

//       if (error) {
//         console.error('Supabase error fetching orders:', error)
//         throw error
//       }

//       console.log(`Found ${count} orders for user ${userId}:`, data)

//       const currentLimit = limit || 20
//       const currentOffset = offset || 0
//       const total = count || 0

//       return {
//         data: {
//           data: data as Order[],
//           total: total,
//           limit: currentLimit,
//           offset: currentOffset,
//           hasMore: currentOffset + currentLimit < total,
//         },
//         error: null,
//       }
//     } catch (error) {
//       console.error('Error fetching user orders:', error)
//       return {
//         data: null,
//         error: error instanceof Error ? error.message : 'Failed to fetch orders',
//       }
//     }
//   },

//   async getOrderById(orderId: string, userId: string): Promise<ApiResponse<Order>> {
//     // Validate userId
//     if (!userId || userId === 'undefined' || userId === 'null') {
//       console.warn('Invalid user ID provided to getOrderById:', userId)
//       return {
//         data: null,
//         error: 'User not authenticated',
//       }
//     }

//     try {
//       const { data, error } = await supabase
//         .from('orders')
//         .select('*')
//         .eq('id', orderId)
//         .eq('user_id', userId)
//         .single()

//       if (error) throw error

//       return { data: data as Order, error: null }
//     } catch (error) {
//       console.error('Error fetching order:', error)
//       return {
//         data: null,
//         error: error instanceof Error ? error.message : 'Failed to fetch order',
//       }
//     }
//   },

//   async cancelOrder(orderId: string, userId: string): Promise<ApiResponse<Order>> {
//     // Validate userId
//     if (!userId || userId === 'undefined' || userId === 'null') {
//       console.warn('Invalid user ID provided to cancelOrder:', userId)
//       return {
//         data: null,
//         error: 'User not authenticated',
//       }
//     }

//     try {
//       const { data, error } = await supabase
//         .from('orders')
//         .update({ order_status: 'cancelled', updated_at: new Date().toISOString() })
//         .eq('id', orderId)
//         .eq('user_id', userId)
//         .select()
//         .single()

//       if (error) throw error

//       return { data: data as Order, error: null }
//     } catch (error) {
//       console.error('Error cancelling order:', error)
//       return {
//         data: null,
//         error: error instanceof Error ? error.message : 'Failed to cancel order',
//       }
//     }
//   },
// }

import { supabase } from '@/lib/supabase'
import { Order, CreateOrderInput, ApiResponse, PaginatedResponse } from '@/types'

export const orderService = {
  async createOrder(orderData: CreateOrderInput): Promise<ApiResponse<Order>> {
    try {
      console.log('Creating order with data:', orderData)
      
      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderData.order_number,
          user_id: orderData.user_id,
          user_name: orderData.user_name,
          user_phone: orderData.user_phone,
          items: orderData.items,
          sub_total: orderData.sub_total,
          delivery_fee: orderData.delivery_fee,
          total: orderData.total,
          order_type: orderData.order_type,
          order_status: orderData.order_status,
          payment_method: orderData.payment_method,
          delivery_address: orderData.delivery_address,
          delivery_time: orderData.delivery_time,
          scheduled_time: orderData.scheduled_time,
          notes: orderData.notes,
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating order:', error)
        throw error
      }

      console.log('Order created successfully:', data)
      return { data: data as Order, error: null }
    } catch (error) {
      console.error('Error creating order:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to create order',
      }
    }
  },

  async getUserOrders(userId: string, limit?: number, offset?: number): Promise<ApiResponse<PaginatedResponse<Order>>> {
    if (!userId || userId === 'undefined' || userId === 'null') {
      console.warn('Invalid user ID provided to getUserOrders:', userId)
      return {
        data: {
          data: [],
          total: 0,
          limit: limit || 20,
          offset: offset || 0,
          hasMore: false,
        },
        error: null,
      }
    }

    try {
      console.log('Fetching orders for user:', userId)
      
      let query = supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.range(offset || 0, (offset || 0) + limit - 1)
      }

      const { data, error, count } = await query

      if (error) {
        console.error('Supabase error fetching orders:', error)
        throw error
      }

      console.log(`Found ${count} orders for user ${userId}:`, data)

      const currentLimit = limit || 20
      const currentOffset = offset || 0
      const total = count || 0

      return {
        data: {
          data: data as Order[],
          total: total,
          limit: currentLimit,
          offset: currentOffset,
          hasMore: currentOffset + currentLimit < total,
        },
        error: null,
      }
    } catch (error) {
      console.error('Error fetching user orders:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch orders',
      }
    }
  },

  async getOrderById(orderId: string, userId: string): Promise<ApiResponse<Order>> {
    if (!userId || userId === 'undefined' || userId === 'null') {
      console.warn('Invalid user ID provided to getOrderById:', userId)
      return {
        data: null,
        error: 'User not authenticated',
      }
    }

    if (!orderId) {
      console.warn('Invalid order ID provided to getOrderById:', orderId)
      return {
        data: null,
        error: 'Invalid order ID',
      }
    }

    try {
      console.log('Fetching order:', orderId, 'for user:', userId)
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Supabase error fetching order:', error)
        throw error
      }

      if (!data) {
        console.warn('Order not found:', orderId)
        return {
          data: null,
          error: 'Order not found',
        }
      }

      console.log('Order found:', data)
      return { data: data as Order, error: null }
    } catch (error) {
      console.error('Error fetching order:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch order',
      }
    }
  },

  async cancelOrder(orderId: string, userId: string): Promise<ApiResponse<Order>> {
    if (!userId || userId === 'undefined' || userId === 'null') {
      console.warn('Invalid user ID provided to cancelOrder:', userId)
      return {
        data: null,
        error: 'User not authenticated',
      }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ order_status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error

      return { data: data as Order, error: null }
    } catch (error) {
      console.error('Error cancelling order:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to cancel order',
      }
    }
  },
}