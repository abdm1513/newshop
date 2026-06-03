

// types/cart.types.ts
import { SupabaseRow } from './global.types'
import { Product } from './product.types'

export interface CartItem {
  product_id: string
  name: string
  price: number
  quantity: number
  unit: string
  image: string
}

export interface Cart extends SupabaseRow {
  user_id: string
  items: CartItem[]
  total_items: number
  total_price: number
}

export type DeliveryMethod = 'delivery' | 'pickup'


export interface CartStoreState {
  cart_id: string | null
  items: CartItem[]
  delivery_method: DeliveryMethod
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
  is_hydrated: boolean
}

export interface CartStoreActions {
  setCartId: (id: string | null) => void
  setItems: (items: CartItem[]) => void
  addItem: (item: CartItem) => void
  setItemsFromRemote: (items: CartItem[]) => void
  removeItem: (product_id: string) => void
  updateQuantity: (product_id: string, quantity: number) => void
  clearCart: () => void
  setDeliveryMethod: (method: DeliveryMethod) => void
  setStatus: (status: CartStoreState['status']) => void
  setError: (error: string | null) => void
  setHydrated: (hydrated: boolean) => void
}

export type CartStore = CartStoreState & CartStoreActions


export function productToCartItem(product: Product, quantity = 1): CartItem {
  return {
    product_id: product.id,
    name: product.name,
    price: product.price,
    quantity,
    unit: product.unit,
    image: product.images[0] ?? '',
  }
}