import { Order, OrderStatus, OrderType } from '@/types'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_TYPE_LABELS } from '@/constants/config'

export const getOrderStatusLabel = (status: OrderStatus): string => {
  return ORDER_STATUS_LABELS[status] || status
}

export const getOrderStatusColor = (status: OrderStatus): string => {
  return ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
}

export const getOrderTypeLabel = (type: OrderType): string => {
  return ORDER_TYPE_LABELS[type] || type
}

export const canCancelOrder = (order: Order): boolean => {
  return ['pending', 'confirmed'].includes(order.order_status)
}

export const formatOrderDate = (date: string): string => {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'አሁን'
  if (diffMins < 60) return `${diffMins} ደቂቃ በፊት`
  if (diffHours < 24) return `${diffHours} ሰዓት በፊት`
  if (diffDays < 7) return `${diffDays} ቀን በፊት`
  
  return d.toLocaleDateString('am-ET', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}