import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Phone } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { validatePhoneNumber } from '../utils/authValidation'
import { cn } from '@/utils/cn'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, isLoading } = useAuth()
  
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({})

  const from = location.state?.from?.pathname || '/'

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!phone) {
      newErrors.phone = 'ስልክ ቁጥር ያስፈልጋል'
    } else if (!validatePhoneNumber(phone)) {
      newErrors.phone = 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (+251XXXXXXXXX)'
    }
    
    if (!password) {
      newErrors.password = 'የይለፍ ቃል ያስፈልጋል'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    await signIn({ phone, password })
    onSuccess?.()
    navigate(from, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">ግባ</h2>
        <p className="text-gray-600 text-sm mt-1">እንኳን ደህና መጡ!</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ስልክ ቁጥር
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setErrors({})
            }}
            placeholder="+251XXXXXXXXX"
            className={cn(
              "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
              errors.phone ? "border-red-500" : "border-gray-200"
            )}
            dir="ltr"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          የይለፍ ቃል
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({})
            }}
            className={cn(
              "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
              errors.password ? "border-red-500" : "border-gray-200"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      
      <div className="text-right">
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-green-600 hover:text-green-700"
        >
          የይለፍ ቃል ረሳሁ?
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {isLoading ? 'እባክዎ ይጠብቁ...' : 'ግባ'}
      </button>
    </form>
  )
}