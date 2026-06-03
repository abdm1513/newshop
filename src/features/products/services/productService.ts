import { supabase } from '@/lib/supabase'
import { Product, Category, ApiResponse, PaginatedResponse } from '@/types'

export const productService = {
  async getProducts(params?: {
    categoryId?: string
    isFeatured?: boolean
    search?: string
    limit?: number
    offset?: number
  }): Promise<ApiResponse<PaginatedResponse<Product>>> {
    try {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })

      if (params?.categoryId) {
        query = query.eq('category_id', params.categoryId)
      }

      if (params?.isFeatured !== undefined) {
        query = query.eq('is_featured', params.isFeatured)
      }

      if (params?.search) {
        query = query.ilike('name', `%${params.search}%`)
      }

      query = query
        .eq('is_available', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (params?.limit) {
        query = query.range(
          params.offset || 0,
          (params.offset || 0) + params.limit - 1
        )
      }

      const { data, error, count } = await query

      if (error) throw error

      const limit = params?.limit || 20
      const offset = params?.offset || 0
      const total = count || 0

      return {
        data: {
          data: data as Product[],
          total: total,
          limit: limit,
          offset: offset,
          hasMore: offset + limit < total,
        },
        error: null,
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      }
    }
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { data: data as Product, error: null }
    } catch (error) {
      console.error('Error fetching product:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      }
    }
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) throw error

      return { data: data as Category[], error: null }
    } catch (error) {
      console.error('Error fetching categories:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
      }
    }
  },

  async searchProducts(searchTerm: string, limit: number = 10): Promise<ApiResponse<Product[]>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
        .eq('is_available', true)
        .limit(limit)

      if (error) throw error

      return { data: data as Product[], error: null }
    } catch (error) {
      console.error('Error searching products:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to search products',
      }
    }
  },
}