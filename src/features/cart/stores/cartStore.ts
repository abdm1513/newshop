import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore, CartItem } from '@/types'
import { cartService } from '../services/cartService'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { showSuccess } from '@/utils/toast'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart_id: null,
      items: [],
      delivery_method: 'delivery',
      status: 'idle',
      error: null,
      is_hydrated: false,

      setCartId: (id) => set({ cart_id: id }),
      
      setItems: (items) => set({ items }),
      
      setItemsFromRemote: async (items) => {
        set({ items, status: 'success' })
        
        // Sync to backend if user is logged in
        const { user } = useAuthStore.getState()
        if (user && get().cart_id) {
          await cartService.updateCart(get().cart_id!, items)
        }
      },
      
      addItem: (item) => {
        const { items, cart_id } = get()
        const existingIndex = items.findIndex(i => i.product_id === item.product_id)
        
        let newItems: CartItem[]
        if (existingIndex >= 0) {
          newItems = [...items]
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + item.quantity,
          }
        } else {
          newItems = [...items, item]
        }
        
        set({ items: newItems })
        showSuccess('በቅርጫት ውስጥ ተጨምሯል')
        
        // Sync to backend
        const { user } = useAuthStore.getState()
        if (user && cart_id) {
          cartService.updateCart(cart_id, newItems)
        }
      },
      
      removeItem: (product_id) => {
        const { items, cart_id } = get()
        const newItems = items.filter(i => i.product_id !== product_id)
        set({ items: newItems })
        
        // Sync to backend
        const { user } = useAuthStore.getState()
        if (user && cart_id) {
          cartService.updateCart(cart_id, newItems)
        }
      },
      
      updateQuantity: (product_id, quantity) => {
        const { items, cart_id } = get()
        if (quantity <= 0) {
          get().removeItem(product_id)
          return
        }
        
        const newItems = items.map(item =>
          item.product_id === product_id ? { ...item, quantity } : item
        )
        set({ items: newItems })
        
        // Sync to backend
        const { user } = useAuthStore.getState()
        if (user && cart_id) {
          cartService.updateCart(cart_id, newItems)
        }
      },
      
      clearCart: () => {
        const { cart_id } = get()
        set({ items: [] })
        
        // Sync to backend
        const { user } = useAuthStore.getState()
        if (user && cart_id) {
          cartService.clearCart(cart_id)
        }
      },
      
      setDeliveryMethod: (method) => set({ delivery_method: method }),
      
      setStatus: (status) => set({ status }),
      
      setError: (error) => set({ error }),
      
      setHydrated: (hydrated) => set({ is_hydrated: hydrated }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items, 
        delivery_method: state.delivery_method,
        cart_id: state.cart_id,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)

// Subscribe to auth changes to sync cart
useAuthStore.subscribe(async (state) => {
  const cartStore = useCartStore.getState()
  
  if (state.user && !cartStore.cart_id) {
    // User logged in, load cart from backend
    cartStore.setStatus('loading')
    const response = await cartService.getCart(state.user.id)
    
    if (response.data) {
      cartStore.setCartId(response.data.id)
      cartStore.setItems(response.data.items)
      cartStore.setStatus('success')
    } else if (cartStore.items.length > 0) {
      // Create new cart with existing items
      const createResponse = await cartService.createCart(state.user.id, cartStore.items)
      if (createResponse.data) {
        cartStore.setCartId(createResponse.data.id)
        cartStore.setStatus('success')
      }
    }
  } else if (!state.user && cartStore.cart_id) {
    // User logged out, clear backend cart reference
    cartStore.setCartId(null)
  }
})