import { OrderStatus, OrderType } from '@/types'

export const MIN_ORDER_AMOUNT = 500
export const DELIVERY_FEE = 50
export const FREE_DELIVERY_THRESHOLD = 5000

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'የግሮሰሪ መደብር'
export const SUPPORTED_PHONE_PREFIXES = ['+2519', '+2517']

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'በመጠባበቅ ላይ',
  confirmed: 'ተረጋግጧል',
  preparing: 'እየተዘጋጀ ነው',
  out_for_delivery: 'ለማድረስ ወጥቷል',
  delivered: 'ደርሷል',
  cancelled: 'ተሰርዟል',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  delivery: 'ዴሊቨሪ',
  pickup: 'ፒክአፕ',
}

export const PHONE_REGEX = /^\+251[79]\d{8}$/

export const STORAGE_KEYS = {
  CART: 'grocery-cart',
  AUTH_TOKEN: 'grocery-auth-token',
  THEME: 'grocery-theme',
} as const

export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  CATEGORIES: 'categories',
  BANNERS: 'banners',
  CART: 'cart',
  ORDERS: 'orders',
  ORDER: 'order',
  USER: 'user',
} as const