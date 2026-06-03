import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Phone, User as UserIcon, Lock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { 
  validatePhoneNumber, 
  validateName, 
  validatePassword, 
  validateConfirmPassword,
  formatPhoneNumber 
} from '../utils/authValidation'
import { cn } from '@/utils/cn'

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const navigate = useNavigate()
  const { signUp, isLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name) {
      newErrors.name = 'ስም ያስፈልጋል'
    } else if (!validateName(formData.name)) {
      newErrors.name = 'ስም ቢያንስ 2 ፊደላት መሆን አለበት'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'ስልክ ቁጥር ያስፈልጋል'
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (+251XXXXXXXXX)'
    }
    
    if (!formData.password) {
      newErrors.password = 'የይለፍ ቃል ያስፈልጋል'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'እባክዎ የይለፍ ቃል ያረጋግጡ'
    } else if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'የይለፍ ቃሎች አይዛመዱም'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    await signUp({
      name: formData.name,
      phone: formatPhoneNumber(formData.phone),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    })
    onSuccess?.()
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">ተመዝገብ</h2>
        <p className="text-gray-600 text-sm mt-1">አዲስ መለያ ፍጠር</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ሙሉ ስም
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              setErrors({})
            }}
            className={cn(
              "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
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
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value })
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
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          የይለፍ ቃል
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
              setErrors({})
            }}
            className={cn(
              "w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
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
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          የይለፍ ቃል አረጋግጥ
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value })
              setErrors({})
            }}
            className={cn(
              "w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
              errors.confirmPassword ? "border-red-500" : "border-gray-200"
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 mt-6"
      >
        {isLoading ? 'እባክዎ ይጠብቁ...' : 'ተመዝገብ'}
      </button>
    </form>
  )
}