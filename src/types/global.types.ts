export interface SupabaseRow {
  id: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
}

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean  // Add this property
}