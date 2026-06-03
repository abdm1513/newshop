import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Clock, Check } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { useCart } from '@/features/cart'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getProductImageUrl } from '@/utils/imageUtils'
import { formatCurrency } from '@/utils/formatters'
import { QUERY_KEYS } from '@/constants/config'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart, items, incrementQuantity, decrementQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { data: product, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      const response = await productService.getProductById(id!)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: !!id,
  })

  const cartItem = product ? items.find(item => item.product_id === product.id) : undefined
  const isInCart = cartItem !== undefined
  const cartQuantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    // Only add to cart if the item is NOT already in cart
    if (product && !isInCart) {
      addToCart(product, quantity)
      // Don't reset quantity, keep it for reference
    }
  }

  const handleIncrement = () => {
    if (isInCart) {
      // If item is in cart, increment the cart quantity
      incrementQuantity(product!.id)
    } else {
      // If not in cart, increment the local quantity selector
      setQuantity(prev => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (isInCart) {
      // If item is in cart, decrement the cart quantity
      if (cartQuantity > 1) {
        decrementQuantity(product!.id)
      }
    } else {
      // If not in cart, decrement the local quantity selector
      if (quantity > 1) {
        setQuantity(prev => prev - 1)
      }
    }
  }

  const getButtonStatus = () => {
    if (!product?.is_available) return { text: 'አልቋል', disabled: true }
    if (isInCart) return { text: 'በቅርጫት ውስጥ አለ', disabled: true }
    return { text: 'ወደ ቅርጫት', disabled: false }
  }

  const buttonStatus = getButtonStatus()

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-80 bg-gray-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-1/2 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom py-8 text-center">
        <p className="text-gray-500">ምርት አልተገኘም</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          ወደ መነሻ ተመለስ
        </button>
      </div>
    )
  }

  const images = product.images || []
  const mainImage = images[selectedImage] || ''

  return (
    <div className="container-custom py-4 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-green-600 mb-4"
      >
        <ChevronLeft size={20} />
        <span>ተመለስ</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Images Section - Reduced height */}
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-center h-[200px] sm:h-[280px]">
            <OptimizedImage
              src={getProductImageUrl(mainImage)}
              alt={product.name}
              className="w-full h-full"
              objectFit="contain"
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    selectedImage === idx ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <OptimizedImage
                    src={getProductImageUrl(img)}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full"
                    objectFit="contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name}</h1>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">{formatCurrency(product.price)}</span>
            <span className="text-gray-500">/ {product.unit}</span>
          </div>

          {product.description && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-sm">
            {product.is_available && product.stock_quantity > 0 ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-green-600">አሁን ያለ</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{product.stock_quantity} ቀሪ</span>
              </>
            ) : (
              <span className="text-red-500">አልቋል</span>
            )}
          </div>

          {/* Delivery Info */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={16} />
              <span>በአዲስ አበባ ውስጥ ፈጣን ዴሊቨሪ</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>ትዕዛዝ ከገባ በ 60 ደቂቃ ውስጥ ይደርሳል</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-gray-700">ብዛት:</span>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg">
              <button
                onClick={handleDecrement}
                disabled={(!isInCart && quantity <= 1) || (isInCart && cartQuantity <= 1) || !product.is_available}
                className="p-2 disabled:opacity-50 hover:bg-gray-50 transition"
              >
                <Minus size={18} />
              </button>
              <span className="w-10 text-center font-medium">
                {isInCart ? cartQuantity : quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={!product.is_available}
                className="p-2 disabled:opacity-50 hover:bg-gray-50 transition"
              >
                <Plus size={18} />
              </button>
            </div>
            {isInCart && (
              <span className="text-sm text-green-600">
                (በቅርጫት ውስጥ)
              </span>
            )}
          </div>

          {/* Add to Cart Button - Disabled after item is added */}
          <button
            onClick={handleAddToCart}
            disabled={buttonStatus.disabled || !product.is_available}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
              isInCart
                ? 'bg-gray-100 text-green-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            } disabled:opacity-50`}
          >
            {isInCart ? (
              <>
                <Check size={20} />
                {buttonStatus.text}
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                {buttonStatus.text}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}