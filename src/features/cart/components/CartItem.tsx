import { Trash2, Plus, Minus } from 'lucide-react'
import { CartItem as CartItemType } from '@/types'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getProductImageUrl } from '@/utils/imageUtils'
import { formatCurrency } from '@/utils/formatters'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const imageUrl = item.image ? getProductImageUrl(item.image) : '/placeholder.png'

  return (
    <div className="flex gap-4 p-4 border-b border-gray-100">
      {/* Product Image */}
      <div className="w-14 sm:w-18 h-14 sm:h-18 bg-gray-50 rounded-sm p-1 flex-shrink-0 overflow-hidden">
        <OptimizedImage
          src={imageUrl}
          alt={item.name}
          className="w-full h-full"
          objectFit="contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{formatCurrency(item.price)}/{item.unit}</p>
          </div>
          <button
            onClick={() => onRemove(item.product_id)}
            className="p-1 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm">
            <button
              onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
              className="p-1.5 hover:bg-gray-50 transition"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
              className="p-1.5 hover:bg-gray-50 transition"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="font-semibold text-green-600">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}