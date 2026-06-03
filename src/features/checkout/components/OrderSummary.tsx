import { ShoppingBag, Truck, Gift } from 'lucide-react'
import { CartItem, DeliveryMethod } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getProductImageUrl } from '@/utils/imageUtils'
import { FREE_DELIVERY_THRESHOLD } from '@/constants/config'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryMethod: DeliveryMethod
}

export function OrderSummary({ items, subtotal, deliveryFee, total, deliveryMethod }: OrderSummaryProps) {
  const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
      {/* Header */}
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag size={20} />
          የትዕዛዝ ማጠቃለያ
        </h2>
        <p className="text-sm text-gray-500 mt-1">{items.length} ዕቃዎች</p>
      </div>

      {/* Items List */}
      <div className="max-h-80 overflow-y-auto p-5 space-y-3 border-b border-gray-200">
        {items.map((item) => (
          <div key={item.product_id} className="flex gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
              <OptimizedImage
                src={getProductImageUrl(item.image)}
                alt={item.name}
                className="w-full h-full"
                objectFit="contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm truncate">{item.name}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">ብዛት: {item.quantity}</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>የምርቶች ዋጋ</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center gap-1">
            <Truck size={16} />
            <span>የዴሊቨሪ ክፍያ</span>
          </div>
          <span>{deliveryFee === 0 ? 'ነጻ' : formatCurrency(deliveryFee)}</span>
        </div>
        
        {deliveryMethod === 'delivery' && remainingForFreeDelivery > 0 && remainingForFreeDelivery <= FREE_DELIVERY_THRESHOLD && (
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <Gift size={14} className="text-green-600" />
            <span className="text-xs text-green-700">
              {formatCurrency(remainingForFreeDelivery)} ተጨማሪ ግዙ እና ነጻ ዴሊቨሪ ያግኙ
            </span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-bold text-gray-800 text-lg">
            <span>ጠቅላላ</span>
            <span className="text-green-600">{formatCurrency(total)}</span>
          </div>
          {deliveryMethod === 'delivery' && (
            <p className="text-xs text-gray-500 mt-2">
              * ክፍያ ምርቶቹ ሲደርሱ ይከፈላል
            </p>
          )}
        </div>
      </div>
    </div>
  )
}