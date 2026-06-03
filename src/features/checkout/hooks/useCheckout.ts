import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { useCart } from '@/features/cart'
import { useCreateOrder } from '@/features/orders'
import { generateOrderNumber } from '@/features/orders/utils/orderUtils'
import { CreateOrderInput, OrderItem } from '@/types'
import { validateCheckout } from '../utils/checkoutValidation'
import { showError } from '@/utils/toast'

export function useCheckout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, delivery_method, subtotal, deliveryFee, total } = useCart()
  const { mutateAsync: createOrder, isPending } = useCreateOrder()
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [createdOrder, setCreatedOrder] = useState<any>(null)

  const handleSubmit = async (formData: any): Promise<boolean> => {
    if (!user) {
      showError('እባክዎ መጀመሪያ ይግቡ')
      navigate('/login')
      return false
    }

    if (items.length === 0) {
      showError('ቅርጫትዎ ባዶ ነው')
      return false
    }

    // Validate form
    const validation = validateCheckout(formData, delivery_method)
    if (!validation.success) {
      const firstError = validation.error.issues[0]
      showError(firstError.message)
      return false
    }

    // Prepare order items
    const orderItems: OrderItem[] = items.map(item => ({
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      image: item.image,
    }))

    const orderData: CreateOrderInput = {
      order_number: generateOrderNumber(),
      user_id: user.id,
      user_name: formData.name,
      user_phone: formData.phone,
      items: orderItems,
      sub_total: subtotal,
      delivery_fee: deliveryFee,
      total: total,
      order_type: delivery_method,
      order_status: 'pending',
      payment_method: 'cod',
      delivery_address: formData.address || '',
      delivery_time: formData.deliveryTime,
      scheduled_time: formData.deliveryTime === 'scheduled' ? formData.scheduledTime : null,
      notes: formData.notes || null,
    }

    try {
      // Create order
      const response = await createOrder(orderData)
      
      if (response) {
        console.log('Order created successfully in hook:', response)
        setCreatedOrder(response)
        setOrderCompleted(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Order creation failed:', error)
      showError('ትዕዛዝ ማስገባት አልተቻለም')
      return false
    }
  }

  const resetCheckout = () => {
    setOrderCompleted(false)
    setCreatedOrder(null)
  }

  return {
    items,
    delivery_method,
    subtotal,
    deliveryFee,
    total,
    isPending,
    orderCompleted,
    createdOrder,
    handleSubmit,
    resetCheckout,
  }
}