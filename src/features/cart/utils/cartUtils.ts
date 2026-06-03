import { CartItem } from '@/types'
import { MIN_ORDER_AMOUNT, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '@/constants/config'

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const calculateDeliveryFee = (subtotal: number): number => {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0
  if (subtotal >= MIN_ORDER_AMOUNT) return DELIVERY_FEE
  return 0
}

export const calculateTotal = (items: CartItem[], deliveryMethod: 'delivery' | 'pickup'): number => {
  const subtotal = calculateSubtotal(items)
  const deliveryFee = deliveryMethod === 'delivery' ? calculateDeliveryFee(subtotal) : 0
  return subtotal + deliveryFee
}

export const getCartItemCount = (items: CartItem[]): number => {
  return items.length
}

export const getTotalQuantity = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export const isCartValidForDelivery = (items: CartItem[]): boolean => {
  const subtotal = calculateSubtotal(items)
  return subtotal >= MIN_ORDER_AMOUNT
}

export const getMinimumOrderMessage = (items: CartItem[]): string | null => {
  const subtotal = calculateSubtotal(items)
  if (subtotal < MIN_ORDER_AMOUNT) {
    const remaining = MIN_ORDER_AMOUNT - subtotal
    return `እባክዎ ቢያንስ ${MIN_ORDER_AMOUNT.toLocaleString('am-ET')} ብር መግዛት አለብዎት። ቀሪ: ${remaining.toLocaleString('am-ET')} ብር`
  }
  return null
}