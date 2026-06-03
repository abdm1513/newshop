// types/banner.types.ts
import { SupabaseRow } from './global.types'

export interface Banner extends SupabaseRow {
  image: string
  title?: string
  subtitle?: string
  link?: string
  is_active: boolean
  sort_order: number
}