
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public`

export const PLACEHOLDER_IMAGE = '/placeholder.png'

export function getStorageUrl(bucket: string, path: string): string {
  if (!path) return PLACEHOLDER_IMAGE
  if (path.startsWith('http')) return path
  if (path.startsWith('/')) return path
  return `${STORAGE_URL}/${bucket}/${path}`
}

export function getProductImageUrl(imagePath: string): string {
  return getStorageUrl('products', imagePath)
}

export function getCategoryImageUrl(imagePath: string): string {
  return getStorageUrl('categories', imagePath)
}

export function getBannerImageUrl(imagePath: string): string {
  return getStorageUrl('banners', imagePath)
}

export function getOptimizedImageUrl(
  url: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!url || url === PLACEHOLDER_IMAGE || url.startsWith('/')) return url

  if (url.includes(SUPABASE_URL)) {
    const urlObj = new URL(url)
    const transformParams = new URLSearchParams()
    
    if (options.width) transformParams.append('width', options.width.toString())
    if (options.height) transformParams.append('height', options.height.toString())
    if (options.quality) transformParams.append('quality', options.quality.toString())
    transformParams.append('resize', 'cover')
    
    if (transformParams.toString()) {
      urlObj.search = transformParams.toString()
    }
    
    return urlObj.toString()
  }

  return url
}