// types/product.types.ts
import { SupabaseRow } from './global.types'

export interface Product extends SupabaseRow {
  name: string
  description?: string
  price: number
  unit: string
  sku?: string
  category_id: string
  images: string[]
  stock_quantity: number
  is_available: boolean
  is_featured: boolean
  sort_order: number
}

export interface ProductFilters {
  category_id?: string
  is_available?: boolean
  is_featured?: boolean
  search?: string
}

