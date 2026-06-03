import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Product, CartItem } from '@/types'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getProductImageUrl } from '@/utils/imageUtils'
import { formatCurrency } from '@/utils/formatters'

interface ProductCardProps {
  product: Product
  cartItem?: CartItem
  onAddToCart: (product: Product) => void
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
}

export function ProductCard({
  product,
  cartItem,
  onAddToCart,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const navigate = useNavigate()
  const quantity = cartItem?.quantity ?? 0
  const isInCart = quantity > 0
  const imageUrl = product.images?.[0]
    ? getProductImageUrl(product.images[0])
    : '/placeholder.png'

  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product)
  }

  const handleIncrementClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onIncrement(product.id)
  }

  const handleDecrementClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDecrement(product.id)
  }

  return (
    <div
      onClick={handleCardClick}
      className="
        group bg-white rounded-xl border border-gray-200
        overflow-hidden hover:shadow-md
        transition-all duration-300
        flex flex-col h-full
        cursor-pointer
      "
    >
      <div className="relative">
        <div className="h-28 sm:h-36 p-2 bg-gray-50 rounded-xl flex items-center justify-center">
          <OptimizedImage
            src={imageUrl}
            alt={product.name}
            objectFit="contain"
            className="group-hover:scale-105 transition-transform duration-300"
            lazy
          />
        </div>

        {!product.is_available && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            አልቋል
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-1 sm:mt-2 flex flex-wrap items-center gap-1">
          <p className="text-sm sm:text-base font-bold text-green-600">
            {formatCurrency(product.price)}
          </p>
          <span className="text-xs text-gray-600">
            / {product.unit}
          </span>
        </div>

        <div className="mt-auto pt-2">
          {!isInCart ? (
            <button
              onClick={handleAddToCartClick}
              disabled={!product.is_available}
              className="
                w-full h-8 sm:h-9 rounded-sm
                bg-green-600 hover:bg-green-700
                disabled:bg-gray-300 disabled:cursor-not-allowed
                text-white text-xs sm:text-sm font-medium
                flex items-center justify-center gap-2
                transition-colors
              "
            >
              <ShoppingCart size={14} />
              ወደ ቅርጫት
            </button>
          ) : (
            <div className="h-8 sm:h-9 rounded-sm border border-green-200 bg-green-50 flex items-center justify-between overflow-hidden">
              <button
                onClick={handleDecrementClick}
                className="flex-1 h-full flex items-center justify-center hover:bg-green-100 transition"
              >
                <Minus size={14} className="text-green-700" />
              </button>
              <span className="flex-1 text-center font-semibold text-green-800 text-sm">
                {quantity}
              </span>
              <button
                onClick={handleIncrementClick}
                className="flex-1 h-full flex items-center justify-center hover:bg-green-100 transition"
              >
                <Plus size={14} className="text-green-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}