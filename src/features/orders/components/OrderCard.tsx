// import { useNavigate } from 'react-router-dom'
// import { MapPin, Package, Truck, XCircle } from 'lucide-react'
// import { Order } from '@/types'
// import { formatCurrency } from '@/utils/formatters'
// import { getOrderStatusLabel, getOrderStatusColor, getOrderTypeLabel, canCancelOrder, formatOrderDate } from '../utils/orderUtils'
// import { useCancelOrder } from '../hooks/useOrders'
// import { useState } from 'react'

// interface OrderCardProps {
//   order: Order
//   onCancel?: () => void
// }

// export function OrderCard({ order, onCancel }: OrderCardProps) {
//   const navigate = useNavigate()
//   const { mutate: cancelOrder } = useCancelOrder()
//   const [isCancelling, setIsCancelling] = useState(false)

//   const statusLabel = getOrderStatusLabel(order.order_status)
//   const statusColor = getOrderStatusColor(order.order_status)
//   const typeLabel = getOrderTypeLabel(order.order_type)
//   const canCancel = canCancelOrder(order)

//   const handleCancel = async (e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (!confirm('ትዕዛዝዎን መሰረዝ ይፈልጋሉ?')) return
    
//     setIsCancelling(true)
//     cancelOrder({ orderId: order.id }, {
//       onSuccess: () => {
//         onCancel?.()
//       },
//       onSettled: () => {
//         setIsCancelling(false)
//       }
//     })
//   }

//   const handleClick = () => {
//     navigate(`/orders/${order.id}`)
//   }

//   return (
//     <div
//       onClick={handleClick}
//       className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition cursor-pointer"
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <p className="text-xs text-gray-500">{formatOrderDate(order.created_at)}</p>
//           <p className="text-sm font-mono text-gray-600 mt-0.5">{order.order_number}</p>
//         </div>
//         <div className="text-right">
//           <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
//             {statusLabel}
//           </span>
//         </div>
//       </div>

//       {/* Items Preview */}
//       <div className="flex items-center gap-2 mb-3">
//         <Package size={16} className="text-gray-400" />
//         <p className="text-sm text-gray-700">
//           {order.items.slice(0, 2).map(item => item.name).join(', ')}
//           {order.items.length > 2 && ` + ${order.items.length - 2} ተጨማሪ`}
//         </p>
//       </div>

//       {/* Delivery Info */}
//       <div className="flex items-center gap-2 mb-2">
//         {order.order_type === 'delivery' ? (
//           <Truck size={16} className="text-gray-400" />
//         ) : (
//           <MapPin size={16} className="text-gray-400" />
//         )}
//         <p className="text-sm text-gray-600">
//           {typeLabel} • {formatCurrency(order.total)}
//         </p>
//       </div>

//       {order.order_type === 'delivery' && order.delivery_address && (
//         <div className="flex items-start gap-2 mb-3">
//           <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
//           <p className="text-xs text-gray-500 line-clamp-1">{order.delivery_address}</p>
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex justify-end gap-2 mt-2">
//         {canCancel && order.order_status !== 'cancelled' && (
//           <button
//             onClick={handleCancel}
//             disabled={isCancelling}
//             className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
//           >
//             <XCircle size={14} />
//             {isCancelling ? 'በመሰረዝ ላይ...' : 'ሰርዝ'}
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

import { useNavigate } from 'react-router-dom'
import { MapPin, Package, Truck, XCircle } from 'lucide-react'
import { Order } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { getOrderStatusLabel, getOrderStatusColor, getOrderTypeLabel, canCancelOrder, formatOrderDate } from '../utils/orderUtils'
import { useCancelOrder } from '../hooks/useOrders'
import { useState } from 'react'

interface OrderCardProps {
  order: Order
  onCancel?: () => void
}

export function OrderCard({ order, onCancel }: OrderCardProps) {
  const navigate = useNavigate()
  const { mutate: cancelOrder, isPending } = useCancelOrder()
  const [isCancelling, setIsCancelling] = useState(false)

  const statusLabel = getOrderStatusLabel(order.order_status)
  const statusColor = getOrderStatusColor(order.order_status)
  const typeLabel = getOrderTypeLabel(order.order_type)
  const canCancel = canCancelOrder(order)

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('ትዕዛዝዎን መሰረዝ ይፈልጋሉ?')) return
    
    setIsCancelling(true)
    cancelOrder({ orderId: order.id }, {
      onSuccess: () => {
        onCancel?.()
      },
      onSettled: () => {
        setIsCancelling(false)
      }
    })
  }

  const handleClick = () => {
    console.log('Navigating to order:', order.id)
    navigate(`/orders/${order.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs text-gray-500">{formatOrderDate(order.created_at)}</p>
          <p className="text-sm font-mono text-gray-600 mt-0.5">{order.order_number}</p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-2 mb-3">
        <Package size={16} className="text-gray-400" />
        <p className="text-sm text-gray-700">
          {order.items.slice(0, 2).map(item => item.name).join(', ')}
          {order.items.length > 2 && ` + ${order.items.length - 2} ተጨማሪ`}
        </p>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-2 mb-2">
        {order.order_type === 'delivery' ? (
          <Truck size={16} className="text-gray-400" />
        ) : (
          <MapPin size={16} className="text-gray-400" />
        )}
        <p className="text-sm text-gray-600">
          {typeLabel} • {formatCurrency(order.total)}
        </p>
      </div>

      {order.order_type === 'delivery' && order.delivery_address && (
        <div className="flex items-start gap-2 mb-3">
          <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 line-clamp-1">{order.delivery_address}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-2">
        {canCancel && order.order_status !== 'cancelled' && (
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
          >
            <XCircle size={14} />
            {isCancelling ? 'በመሰረዝ ላይ...' : 'ሰርዝ'}
          </button>
        )}
      </div>
    </div>
  )
}