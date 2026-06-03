import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { authService } from '../services/authService'
import { validatePhoneNumber, formatPhoneNumber } from '../utils/authValidation'
import { showSuccess, showError, showLoading } from '@/utils/toast'
import { cn } from '@/utils/cn'
import toast from 'react-hot-toast'

export function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!phone) {
      newErrors.phone = 'ስልክ ቁጥር ያስፈልጋል'
    } else if (!validatePhoneNumber(phone)) {
      newErrors.phone = 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (+251XXXXXXXXX)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsLoading(true)
    const loadingToast = showLoading('እባክዎ ይጠብቁ...')
    
    try {
      const formattedPhone = formatPhoneNumber(phone)
      const response = await authService.resetPassword(formattedPhone)
      
      if (response.error) {
        showError(response.error)
      } else {
        showSuccess('የይለፍ ቃል ማስተካከያ አገናኝ በኢሜይልዎ ተልኳል')
        setTimeout(() => navigate('/login'), 3000)
      }
    } catch (error) {
      showError('እባክዎ በኋላ ይሞክሩ')
    } finally {
      setIsLoading(false)
      toast.dismiss(loadingToast)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">የይለፍ ቃል ረሳሁ</h2>
        <p className="text-gray-600 text-sm mt-1">
          ስልክ ቁጥርዎን ያስገቡ የይለፍ ቃል ማስተካከያ አገናኝ እንልክልዎታለን
        </p>
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
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {isLoading ? 'እባክዎ ይጠብቁ...' : 'አገናኝ ላክ'}
      </button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm text-green-600 hover:text-green-700"
        >
          ወደ መግቢያ ገጽ ተመለስ
        </button>
      </div>
    </form>
  )
}