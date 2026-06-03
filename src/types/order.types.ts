// types/order.types.ts
import { SupabaseRow } from './global.types'

export type OrderType = 'delivery' | 'pickup'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cod'
export type DeliveryTime = 'asap' | 'scheduled'

export interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
  unit: string
  image: string
}

export interface Order extends SupabaseRow {
  order_number: string
  user_id: string
  user_name: string
  user_phone: string
  items: OrderItem[]
  sub_total: number
  delivery_fee: number
  total: number
  order_type: OrderType
  order_status: OrderStatus
  payment_method: PaymentMethod
  delivery_address: string
  delivery_time: DeliveryTime
  scheduled_time?: string | null
  notes?: string | null
}

export interface CreateOrderInput {
  order_number: string
  user_id: string
  user_name: string
  user_phone: string
  items: {
    product_id: string
    name: string
    price: number
    quantity: number
    unit: string
    image: string
  }[]
  sub_total: number
  delivery_fee: number
  total: number
  order_type: 'delivery' | 'pickup'
  order_status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
  payment_method: 'cod'
  delivery_address: string
  delivery_time: 'asap' | 'scheduled'
  scheduled_time?: string | null
  notes?: string | null
}