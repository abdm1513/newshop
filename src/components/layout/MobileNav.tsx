import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ShoppingBag, User, HelpCircle, LogOut, Truck, Home } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuthStore } from '@/features/auth/stores/authStore'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const [_isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      setTimeout(() => setIsAnimating(false), 300)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    handleClose()
  }

  const handleLogout = async () => {
    await signOut()
    handleClose()
  }

  const navLinks = [
    { path: '/', label: 'መነሻ', icon: Home },
    { path: '/products', label: 'ምርቶች', icon: ShoppingBag },
    { path: '/orders', label: 'ትዕዛዞቼ', icon: Truck, protected: true },
    { path: '/profile', label: 'መገለጫ', icon: User, protected: true },
    { path: '/help', label: 'እርዳታ', icon: HelpCircle },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black transition-opacity duration-300 z-50',
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 bottom-0 w-[60%] max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-green-600">ምናሌ</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 bg-green-50 border-b border-green-100">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.phone_number}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 py-4">
          {navLinks.map((link) => {
            if (link.protected && !user) return null
            const Icon = link.icon
            return (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              ውጣ
            </button>
          ) : (
            <button
              onClick={() => handleNavigate('/login')}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              ግባ
            </button>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fade-out {
          animation: fadeOut 3s ease-out forwards;
        }
      `}</style>
    </>
  )
}