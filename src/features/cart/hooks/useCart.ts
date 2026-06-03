import { useCartStore } from '../stores/cartStore'
import { Product, productToCartItem } from '@/types'
import { calculateSubtotal, calculateDeliveryFee, calculateTotal, getCartItemCount, isCartValidForDelivery } from '../utils/cartUtils'

export function useCart() {
  const {
    items,
    delivery_method,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setDeliveryMethod,
  } = useCartStore()

  const subtotal = calculateSubtotal(items)
  const deliveryFee = delivery_method === 'delivery' ? calculateDeliveryFee(subtotal) : 0
  const total = calculateTotal(items, delivery_method)
  const itemCount = getCartItemCount(items)
  const isValidForDelivery = isCartValidForDelivery(items)

  const addToCart = (product: Product, quantity: number = 1) => {
    const cartItem = productToCartItem(product, quantity)
    addItem(cartItem)
  }

  const incrementQuantity = (productId: string) => {
    const item = items.find(i => i.product_id === productId)
    if (item) {
      updateQuantity(productId, item.quantity + 1)
    }
  }

  const decrementQuantity = (productId: string) => {
    const item = items.find(i => i.product_id === productId)
    if (item) {
      updateQuantity(productId, item.quantity - 1)
    }
  }

  return {
    items,
    delivery_method,
    subtotal,
    deliveryFee,
    total,
    itemCount,
    isValidForDelivery,
    addToCart,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    setDeliveryMethod,
  }
}