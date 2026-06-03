import { useProducts } from '../hooks/useProducts'
import { ProductCard } from './ProductCard'
import { useCart } from '@/features/cart'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

interface FeaturedProductsProps {
  onAddToCart?: (product: any) => void
}

export function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const { data, isLoading } = useProducts({ isFeatured: true, limit: 10 })
  const { addToCart, incrementQuantity, decrementQuantity, items: cartItems } = useCart()
  const scrollRef = useRef<HTMLDivElement>(null)

  const products = data?.pages.flatMap(page => page.data?.data || []) || []

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleAddToCart = (product: any) => {
    if (onAddToCart) {
      onAddToCart(product)
    } else {
      addToCart(product)
    }
  }

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-40 sm:w-48">
            <div className="bg-white rounded-xl border border-gray-200 p-3">
              <div className="h-28 bg-gray-200 rounded-lg animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-2/3" />
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="relative">
      <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('left')}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-36 sm:w-42">
            <ProductCard
              product={product}
              cartItem={cartItems.find(item => item.product_id === product.id)}
              onAddToCart={handleAddToCart}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          </div>
        ))}
      </div>
      
      <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('right')}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}