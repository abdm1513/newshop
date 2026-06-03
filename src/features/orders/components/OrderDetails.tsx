import {  MapPin, Truck, Package, User, CreditCard, Clock, AlertCircle } from 'lucide-react'
import { Order } from '@/types'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { getOrderStatusLabel, getOrderStatusColor, getOrderTypeLabel } from '../utils/orderUtils'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getProductImageUrl } from '@/utils/imageUtils'

interface OrderDetailsProps {
  order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const statusLabel = getOrderStatusLabel(order.order_status)
  const statusColor = getOrderStatusColor(order.order_status)
  const typeLabel = getOrderTypeLabel(order.order_type)

  const getDeliveryTimeText = () => {
    if (order.delivery_time === 'asap') return 'በተቻለ ፍጥነት'
    if (order.scheduled_time) return formatDate(order.scheduled_time)
    return 'አልተገለጸም'
  }

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`rounded-xl p-4 ${statusColor.replace('text-', 'bg-').replace('800', '50')}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">የትዕዛዝ ሁኔታ</p>
            <p className="text-lg font-semibold mt-1">{statusLabel}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70">ትዕዛዝ ቁጥር</p>
            <p className="text-sm font-mono font-medium">{order.order_number}</p>
          </div>
        </div>
      </div>

      {/* Order Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-800">ደንበኛ</h3>
          </div>
          <p className="text-gray-700 text-sm">{order.user_name}</p>
          <p className="text-gray-500 text-sm mt-1">{order.user_phone}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-800">ክፍያ</h3>
          </div>
          <p className="text-gray-700 text-sm">በደረሰ ጊዜ ይከፈላል (COD)</p>
          <p className="text-gray-500 text-sm mt-1">ድምር: {formatCurrency(order.total)}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            {order.order_type === 'delivery' ? <Truck size={18} className="text-gray-500" /> : <MapPin size={18} className="text-gray-500" />}
            <h3 className="font-semibold text-gray-800">የማድረሻ ዘዴ</h3>
          </div>
          <p className="text-gray-700 text-sm">{typeLabel}</p>
          {order.order_type === 'delivery' && order.delivery_address && (
            <p className="text-gray-500 text-sm mt-1">{order.delivery_address}</p>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-800">የማድረሻ ጊዜ</h3>
          </div>
          <p className="text-gray-700 text-sm">{getDeliveryTimeText()}</p>
          <p className="text-gray-500 text-sm mt-1">ትዕዛዝ የገባበት: {formatDate(order.created_at)}</p>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-gray-500" />
            <h3 className="font-semibold text-gray-800">የትዕዛዝ ዝርዝር</h3>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-4 flex gap-3">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                <OptimizedImage
                  src={getProductImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full"
                  objectFit="contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.unit}</p>
                  </div>
                  <p className="font-semibold text-green-600">{formatCurrency(item.price * item.quantity)}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">ብዛት: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">የምርቶች ዋጋ</span>
              <span>{formatCurrency(order.sub_total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">የዴሊቨሪ ክፍያ</span>
              <span>{order.delivery_fee === 0 ? 'ነጻ' : formatCurrency(order.delivery_fee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-base">
              <span>ጠቅላላ</span>
              <span className="text-green-600">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-start gap-2">
            <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 text-sm">ማስታወሻ</p>
              <p className="text-yellow-700 text-sm mt-1">{order.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}