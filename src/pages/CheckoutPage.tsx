import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { CheckoutForm, OrderSummary, useCheckout } from '@/features/checkout'
import { OrderConfirmationDialog } from '@/features/orders'
import { OfflineEmptyState } from '@/components/feedback/OfflineEmptyState'
import { useCart } from '@/features/cart'
import { useInternetStatus } from '@/hooks/useInternetStatus'
import { useAuth } from '@/features/auth'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const isOnline = useInternetStatus()
  const { user } = useAuth()
  const { items, clearCart } = useCart()
  const { 
    delivery_method, 
    subtotal, 
    deliveryFee, 
    total, 
    isPending, 
    orderCompleted, 
    createdOrder, 
    handleSubmit, 
    resetCheckout 
  } = useCheckout()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const orderProcessedRef = useRef(false)

  // Show confirmation dialog when order is completed
  useEffect(() => {
    console.log('Order status:', { orderCompleted, createdOrder, showConfirmation })
    
    if (orderCompleted && createdOrder && !orderProcessedRef.current) {
      orderProcessedRef.current = true
      setShowConfirmation(true)
      // Clear cart after order is confirmed
      clearCart()
    }
  }, [orderCompleted, createdOrder, clearCart])

  // Handle redirect to cart only when not processing an order
  useEffect(() => {
    if (!orderProcessedRef.current && items.length === 0 && !isPending) {
      navigate('/cart')
    }
  }, [items, navigate, isPending])

  const handleDialogClose = (action?: 'viewOrders' | 'continueShopping') => {
    console.log('Dialog closed with action:', action)
    setShowConfirmation(false)
    resetCheckout()
    orderProcessedRef.current = false
    
    if (action === 'viewOrders') {
      navigate('/orders')
    } else if (action === 'continueShopping') {
      navigate('/')
    }
  }

  // Show offline empty state when offline
  if (!isOnline) {
    return (
      <OfflineEmptyState 
        title="ትዕዛዝ ማስገባት አይቻልም"
        description="እባክዎ በይነመረብ መስመርዎን ያገናኙ እና እንደገና ይሞክሩ። ትዕዛዝ ማስገባት ከመስመር ጋር ሲገናኙ ብቻ ይቻላል።"
      />
    )
  }

  // Don't show checkout form if order is completed (showing dialog instead)
  if (orderProcessedRef.current && showConfirmation && createdOrder) {
    return (
      <OrderConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleDialogClose}
        order={createdOrder}
      />
    )
  }

  if (items.length === 0 && !orderProcessedRef.current) {
    return null
  }

  return (
    <div className="container-custom py-4 sm:py-8">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-6"
      >
        <ArrowLeft size={20} />
        <span>ተመለስ</span>
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">ትዕዛዝ አስገባ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm
            deliveryMethod={delivery_method}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            userAddress={user?.address}
            userName={user?.name}
            userPhone={user?.phone_number}
          />
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary
            items={items}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            deliveryMethod={delivery_method}
          />
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <OrderConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleDialogClose}
        order={createdOrder}
      />
    </div>
  )
}