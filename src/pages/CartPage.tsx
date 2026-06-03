import { useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import { CartItem, DeliveryOptionSelector, CartSummary, useCart } from '@/features/cart'
import { useInternetStatus } from '@/hooks/useInternetStatus'

export default function CartPage() {
  const navigate = useNavigate()
  const isOnline = useInternetStatus()
  const { 
    items, 
    delivery_method, 
    subtotal, 
    deliveryFee, 
    total, 
    itemCount,
    isValidForDelivery,
    updateQuantity, 
    removeItem, 
    clearCart,
    setDeliveryMethod 
  } = useCart()

  // Cart is stored in localStorage, so it should be available offline
  // But if there are no items, show appropriate message
  if (items.length === 0) {
    return (
      <div className="container-custom py-8 sm:py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">ቅርጫትዎ ባዶ ነው</h2>
          <p className="text-gray-500 mb-6">ምርቶችን ይጨምሩ እና ትዕዛዝ ያስገቡ</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            ግዢውን ጀምር
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-4 sm:py-8">
      {/* Offline indicator for cart (cart is stored locally, so it works offline) */}
      {!isOnline && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-center">
          <p className="text-yellow-700 text-sm">
            ከመስመር ውጭ ነዎት። ቅርጫትዎ ይታያል ነገር ግን ትዕዛዝ ማስገባት አይችሉም። እባክዎ በይነመረብ መስመርዎን ያገናኙ።
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft size={20} />
          <span>ተመለስ</span>
        </button>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
        >
          <Trash2 size={18} />
          <span>ቅርጫት አጽዳ</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">የግዢ ቅርጫት ({itemCount} ዕቃዎች)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {items.map((item) => (
              <CartItem
                key={item.product_id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Delivery Option */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <DeliveryOptionSelector
              selectedMethod={delivery_method}
              onSelect={setDeliveryMethod}
              subtotal={subtotal}
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <CartSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            itemCount={itemCount}
            isValidForDelivery={isValidForDelivery && isOnline}
            onCheckout={() => navigate('/checkout')}
          />
          
          {!isOnline && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg text-center">
              <p className="text-red-600 text-sm">
                ትዕዛዝ ማስገባት ከመስመር ጋር ሲገናኙ ብቻ ይቻላል።
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}