import { Dialog } from '@headlessui/react'
import { CheckCircle, X, Printer, ShoppingBag } from 'lucide-react'
import { Order } from '@/types'
import { formatCurrency } from '@/utils/formatters'

interface OrderConfirmationDialogProps {
  isOpen: boolean
  onClose: (action?: 'viewOrders' | 'continueShopping') => void
  order: Order | null
}

export function OrderConfirmationDialog({ isOpen, onClose, order }: OrderConfirmationDialogProps) {
  const handleViewOrders = () => {
    onClose('viewOrders')
  }

  const handleContinueShopping = () => {
    onClose('continueShopping')
  }

  const handlePrint = () => {
    window.print()
  }

  if (!order) return null

  return (
    <Dialog open={isOpen} onClose={() => onClose('continueShopping')} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => onClose('continueShopping')}
            className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
          
          <div className="p-6 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            
            <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
              ትዕዛዝዎ ተረጋግጧል!
            </Dialog.Title>
            
            <p className="text-gray-600 mb-4">
              እንኳን ደስ ያለዎት! ትዕዛዝዎ በሚገባ ተመዝግቧል።
            </p>

            {/* Order Number */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-500">ትዕዛዝ ቁጥር</p>
              <p className="text-lg font-mono font-bold text-gray-800">{order.order_number}</p>
            </div>

            {/* Order Summary */}
            <div className="bg-green-50 rounded-xl p-4 mb-6 text-left">
              <h4 className="font-semibold text-gray-800 mb-2">የትዕዛዝ ማጠቃለያ</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ጠቅላላ ድምር</span>
                  <span className="font-semibold text-green-600">{formatCurrency(order.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">የማድረሻ ዘዴ</span>
                  <span>{order.order_type === 'delivery' ? 'ዴሊቨሪ' : 'ፒክአፕ'}</span>
                </div>
                {order.order_type === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">አድራሻ</span>
                    <span className="text-right text-xs">{order.delivery_address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleViewOrders}
                className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                ትዕዛዞቼን ተመልከት
              </button>
              
              <button
                onClick={handleContinueShopping}
                className="w-full py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition"
              >
                ግዢውን ቀጥል
              </button>
              
              <button
                onClick={handlePrint}
                className="w-full py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Printer size={18} />
                ደረሰኝ አትም
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}