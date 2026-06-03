import { supabase } from '@/lib/supabase'
import { Cart, CartItem, ApiResponse } from '@/types'

export const cartService = {
  async getCart(userId: string): Promise<ApiResponse<Cart>> {
    try {
      const { data, error } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      return { data: data as Cart, error: null }
    } catch (error) {
      console.error('Error fetching cart:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch cart',
      }
    }
  },

  async createCart(userId: string, items: CartItem[] = []): Promise<ApiResponse<Cart>> {
    try {
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      const { data, error } = await supabase
        .from('carts')
        .insert({
          user_id: userId,
          items: items,
          total_items: items.length,
          total_price: subtotal,
        })
        .select()
        .single()

      if (error) throw error

      return { data: data as Cart, error: null }
    } catch (error) {
      console.error('Error creating cart:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to create cart',
      }
    }
  },

  async updateCart(cartId: string, items: CartItem[]): Promise<ApiResponse<Cart>> {
    try {
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      const { data, error } = await supabase
        .from('carts')
        .update({
          items: items,
          total_items: items.length,
          total_price: subtotal,
          updated_at: new Date().toISOString(),
        })
        .eq('id', cartId)
        .select()
        .single()

      if (error) throw error

      return { data: data as Cart, error: null }
    } catch (error) {
      console.error('Error updating cart:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to update cart',
      }
    }
  },

  async clearCart(cartId: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('carts')
        .update({
          items: [],
          total_items: 0,
          total_price: 0,
        })
        .eq('id', cartId)

      if (error) throw error

      return { data: null, error: null }
    } catch (error) {
      console.error('Error clearing cart:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to clear cart',
      }
    }
  },
}