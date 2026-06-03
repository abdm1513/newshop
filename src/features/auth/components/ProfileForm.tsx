import { useState, useEffect } from 'react'
import { User, Phone, MapPin, Save } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import { validateName, validatePhoneNumber, formatPhoneNumber } from '../utils/authValidation'
import { showSuccess, showError, showLoading } from '@/utils/toast'
import { cn } from '@/utils/cn'
import toast from 'react-hot-toast'

export function ProfileForm() {
  const { user, refreshUser, setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone_number: user?.phone_number || '',
    address: user?.address || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
      })
    }
  }, [user])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name) {
      newErrors.name = 'ስም ያስፈልጋል'
    } else if (!validateName(formData.name)) {
      newErrors.name = 'ስም ቢያንስ 2 ፊደላት መሆን አለበት'
    }
    
    if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
      newErrors.phone_number = 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return
    if (!user) return
    
    setIsLoading(true)
    const loadingToast = showLoading('እባክዎ ይጠብቁ...')
    
    try {
      const formattedPhone = formData.phone_number ? formatPhoneNumber(formData.phone_number) : undefined
      
      const updates = {
        name: formData.name,
        phone_number: formattedPhone,
        address: formData.address,
      }
      
      const response = await authService.updateProfile(user.id, updates)
      
      if (response.error) {
        showError(response.error)
      } else if (response.data) {
        // Update the user in the store with the new address
        const updatedUser = { ...user, ...updates, address: formData.address }
        setUser(updatedUser)
        await refreshUser()
        showSuccess('መገለጫዎ በሚገባ ተዘምኗል')
        setIsEditing(false)
      }
    } catch (error) {
      showError('እባክዎ በኋላ ይሞክሩ')
    } finally {
      setIsLoading(false)
      toast.dismiss(loadingToast)
    }
  }

  if (!user) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">መገለጫ</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition"
          >
            አርትዕ
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsEditing(false)
                setFormData({
                  name: user.name || '',
                  phone_number: user.phone_number || '',
                  address: user.address || '',
                })
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ሰርዝ
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              {isLoading ? 'እባክዎ ይጠብቁ...' : 'አስቀምጥ'}
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ሙሉ ስም
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className={cn(
                "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                !isEditing && "bg-gray-50",
                errors.name ? "border-red-500" : "border-gray-200"
              )}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ስልክ ቁጥር
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              disabled={!isEditing}
              placeholder="+251XXXXXXXXX"
              className={cn(
                "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                !isEditing && "bg-gray-50",
                errors.phone_number ? "border-red-500" : "border-gray-200"
              )}
              dir="ltr"
            />
          </div>
          {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            አድራሻ
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <textarea
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              rows={3}
              placeholder="ክፍለ ከተማ፣ ቀበሌ፣ ቤት ቁጥር..."
              className={cn(
                "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                !isEditing && "bg-gray-50",
                "border-gray-200"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}