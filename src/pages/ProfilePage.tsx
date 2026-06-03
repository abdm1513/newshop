import { useNavigate } from 'react-router-dom'
import { User, ShoppingBag, Truck, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import { ProfileForm, useAuth } from '@/features/auth'
import { PageLoader } from '@/components/feedback/PageLoader'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, signOut, isLoading } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return null
  }

  const menuItems = [
    { id: 'orders', icon: ShoppingBag, label: 'የትዕዛዝ ታሪክ', path: '/orders', color: 'text-blue-600' },
    { id: 'delivery-status', icon: Truck, label: 'የዴሊቨሪ ሁኔታ', path: '/orders', color: 'text-orange-600' },
    { id: 'help', icon: HelpCircle, label: 'እርዳታ', path: '/help', color: 'text-purple-600' },
  ]

  return (
    <div className="container-custom py-4 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-white/80 text-sm mt-1">{user.phone_number}</p>
              {user.address && (
                <p className="text-white/70 text-xs mt-1">{user.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <ProfileForm />

        {/* Menu Items */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={item.color} />
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            )
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          ውጣ
        </button>
      </div>
    </div>
  )
}