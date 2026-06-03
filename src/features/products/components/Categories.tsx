import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getCategoryImageUrl } from '@/utils/imageUtils'
import { cn } from '@/utils/cn'

interface CategoriesProps {
  variant?: 'home' | 'products'
}

export function Categories({ variant = 'products' }: CategoriesProps) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories, isLoading } = useCategories()
  const selectedCategory = searchParams.get('category')

  const handleCategoryClick = (categoryId?: string) => {
    if (variant === 'home') {
      // On homepage, navigate to products page with category filter
      if (categoryId) {
        navigate(`/products?category=${categoryId}`)
      } else {
        navigate('/products')
      }
    } else {
      // On products page, update URL without page refresh
      if (categoryId) {
        setSearchParams({ category: categoryId })
      } else {
        setSearchParams({})
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-20 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mx-auto" />
            <div className="h-3 w-14 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    )
  }

  if (!categories || categories.length === 0) return null

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide p-2">
      {/* All Categories Option - Only show on products page */}
      {variant === 'products' && (
        <button
          onClick={() => handleCategoryClick()}
          className="flex-shrink-0 text-center group"
        >
          <div className={cn(
            "w-16 h-16 p-1 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center transition-all mx-auto",
            !selectedCategory
              ? "ring-2 ring-green-600 ring-offset-2"
              : "group-hover:ring-2 group-hover:ring-green-300"
          )}>
            <span className="text-2xl">📦</span>
          </div>
          <p className={cn(
            "text-xs mt-2 font-medium truncate w-16",
            !selectedCategory ? "text-green-600" : "text-gray-600"
          )}>
            ሁሉም
          </p>
        </button>
      )}

      {/* Categories */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="flex-shrink-0 text-center group"
        >
          <div className={cn(
            "w-16 h-16 p-1 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center transition-all mx-auto",
            variant === 'products' && selectedCategory === category.id
              ? "ring-2 ring-green-600 ring-offset-2"
              : variant === 'home'
              ? "hover:ring-2 hover:ring-green-300"
              : "group-hover:ring-2 group-hover:ring-green-300"
          )}>
            {category.image ? (
              <OptimizedImage
                src={getCategoryImageUrl(category.image)}
                alt={category.name}
                className="w-full h-full"
                objectFit="cover"
              />
            ) : (
              <span className="text-2xl">🏪</span>
            )}
          </div>
          <p className={cn(
            "text-xs mt-2 font-medium truncate w-16",
            variant === 'products' && selectedCategory === category.id 
              ? "text-green-600" 
              : "text-gray-600"
          )}>
            {category.name}
          </p>
        </button>
      ))}
    </div>
  )
}