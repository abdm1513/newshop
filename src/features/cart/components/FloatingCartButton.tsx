import { useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../hooks/useCart'

export function FloatingCartButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const { itemCount, items } = useCart()
  
  // Don't show on cart page or if cart is empty
  if (location.pathname === '/cart' || itemCount === 0 || items.length === 0) {
    return null
  }

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
    >
      <div className="relative">
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
    </button>
  )
}