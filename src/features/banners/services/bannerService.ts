import { supabase } from '@/lib/supabase'
import { Banner, ApiResponse } from '@/types'

export const bannerService = {
  async getBanners(): Promise<ApiResponse<Banner[]>> {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) throw error

      return { data: data as Banner[], error: null }
    } catch (error) {
      console.error('Error fetching banners:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch banners',
      }
    }
  },
}