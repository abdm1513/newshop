// types/category.types.ts
import { SupabaseRow } from './global.types'

export interface Category extends SupabaseRow {
  name: string
  image?: string
  sort_order: number
  is_active: boolean
}

