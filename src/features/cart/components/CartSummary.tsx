import { ShoppingBag, Truck, Gift } from 'lucide-react'
import { formatCurrency } from '@/utils/formatters'
import { FREE_DELIVERY_THRESHOLD, MIN_ORDER_AMOUNT } from '@/constants/config'

interface CartSummaryProps {
  subtotal: number
  deliveryFee: number
  total: number
  itemCount: number
  isValidForDelivery: boolean
  onCheckout?: () => void
}

export function CartSummary({
  subtotal,
  deliveryFee,
  total,
  itemCount,
  isValidForDelivery,
  onCheckout,
}: CartSummaryProps) {
  const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal
  const remainingForMinOrder = MIN_ORDER_AMOUNT - subtotal

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">ድምር</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>የምርቶች ዋጋ ({itemCount} ዕቃዎች)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center gap-1">
            <Truck size={16} />
            <span>የዴሊቨሪ ክፍያ</span>
          </div>
          <span>{deliveryFee === 0 ? 'ነጻ' : formatCurrency(deliveryFee)}</span>
        </div>
        
        {remainingForFreeDelivery > 0 && remainingForFreeDelivery <= FREE_DELIVERY_THRESHOLD && (
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-sm">
            <Gift size={16} className="text-green-600" />
            <span className="text-green-700">
              {formatCurrency(remainingForFreeDelivery)} ተጨማሪ ግዙ እና ነጻ ዴሊቨሪ ያግኙ
            </span>
          </div>
        )}
        
        {!isValidForDelivery && remainingForMinOrder > 0 && (
          <div className="p-2 bg-orange-50 rounded-lg text-sm">
            <p className="text-orange-700">
              ለዴሊቨሪ ቢያንስ {formatCurrency(MIN_ORDER_AMOUNT)} መግዛት አለብዎት
            </p>
            <p className="text-orange-600 text-xs mt-1">
              ቀሪ: {formatCurrency(remainingForMinOrder)}
            </p>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-bold text-gray-800 text-lg">
            <span>ጠቅላላ</span>
            <span className="text-green-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        disabled={!isValidForDelivery || itemCount === 0}
        className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-center gap-2">
          <ShoppingBag size={18} />
          ትዕዛዝ አስገባ
        </div>
      </button>
    </div>
  )
}