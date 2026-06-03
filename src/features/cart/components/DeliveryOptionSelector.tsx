import { Truck, Building2 } from 'lucide-react'
import { DeliveryMethod } from '@/types'
import { cn } from '@/utils/cn'
import { DELIVERY_FEE } from '@/constants/config'
import { formatCurrency } from '@/utils/formatters'

interface DeliveryOptionSelectorProps {
  selectedMethod: DeliveryMethod
  onSelect: (method: DeliveryMethod) => void
  subtotal: number
}

export function DeliveryOptionSelector({ selectedMethod, onSelect, subtotal }: DeliveryOptionSelectorProps) {
  const deliveryFee = subtotal >= 5000 ? 0 : DELIVERY_FEE

  const options = [
    {
      id: 'delivery' as DeliveryMethod,
      title: 'ዴሊቨሪ',
      icon: Truck,
      description: 'ወደ ቤትዎ እናደርሳለን',
      price: deliveryFee === 0 ? 'ነጻ' : formatCurrency(deliveryFee),
      note: subtotal >= 5000 ? 'ለዚህ ትዕዛዝ ነጻ ዴሊቨሪ' : undefined,
    },
    {
      id: 'pickup' as DeliveryMethod,
      title: 'ፒክአፕ',
      icon: Building2,
      description: 'ከሱቃችን ይሰብስቡ',
      price: 'ነጻ',
      note: 'አድራሻ: ቦሌ, አዲስ አበባ',
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800">የማድረሻ ዘዴ</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon
          const isSelected = selectedMethod === option.id
          
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex items-start gap-3 p-4 border-2 rounded-xl text-left transition-all",
                isSelected
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                isSelected ? "bg-green-100" : "bg-gray-100"
              )}>
                <Icon size={20} className={isSelected ? "text-green-600" : "text-gray-600"} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className={cn(
                    "font-semibold",
                    isSelected ? "text-green-700" : "text-gray-800"
                  )}>
                    {option.title}
                  </p>
                  <p className="text-sm font-medium text-green-600">{option.price}</p>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                {option.note && (
                  <p className="text-xs text-orange-600 mt-1">{option.note}</p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}