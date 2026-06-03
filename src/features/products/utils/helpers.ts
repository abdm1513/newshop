import { Product } from '@/types'

export const filterProductsByCategory = (products: Product[], categoryId?: string): Product[] => {
  if (!categoryId) return products
  return products.filter(product => product.category_id === categoryId)
}

export const filterProductsByPrice = (products: Product[], min?: number, max?: number): Product[] => {
  let filtered = [...products]
  if (min !== undefined) {
    filtered = filtered.filter(product => product.price >= min)
  }
  if (max !== undefined) {
    filtered = filtered.filter(product => product.price <= max)
  }
  return filtered
}

export const sortProducts = (products: Product[], sortBy: 'price_asc' | 'price_desc' | 'newest' | 'name'): Product[] => {
  const sorted = [...products]
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category_id))
  return Array.from(categories)
}