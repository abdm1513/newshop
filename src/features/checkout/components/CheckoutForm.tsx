// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { User, Phone, MapPin, Calendar, AlertCircle } from 'lucide-react'
// import { DeliveryMethod } from '@/types'
// import { checkoutSchema, CheckoutFormData } from '../utils/checkoutValidation'
// import { useAuth } from '@/features/auth'
// import { cn } from '@/utils/cn'

// interface CheckoutFormProps {
//   deliveryMethod: DeliveryMethod
//   onSubmit: (data: CheckoutFormData) => Promise<boolean>
//   isSubmitting: boolean
// }

// export function CheckoutForm({ deliveryMethod, onSubmit, isSubmitting }: CheckoutFormProps) {
//   const { user } = useAuth()
//   const [deliveryTime, setDeliveryTime] = useState<'asap' | 'scheduled'>('asap')

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema(deliveryMethod)),
//     defaultValues: {
//       name: user?.name || '',
//       phone: user?.phone_number || '',
//       address: user?.address || '',
//       deliveryTime: 'asap',
//       notes: '',
//     },
//   })

//   const watchedDeliveryTime = watch('deliveryTime')

//   const onSubmitForm = async (data: CheckoutFormData) => {
//     await onSubmit(data)
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
//       {/* Personal Info */}
//       <div className="bg-white rounded-xl border border-gray-200 p-5">
//         <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <User size={18} />
//           የግል መረጃ
//         </h3>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               ሙሉ ስም *
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 {...register('name')}
//                 className={cn(
//                   "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
//                   errors.name ? "border-red-500" : "border-gray-200"
//                 )}
//               />
//             </div>
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               ስልክ ቁጥር *
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 {...register('phone')}
//                 placeholder="+251XXXXXXXXX"
//                 className={cn(
//                   "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
//                   errors.phone ? "border-red-500" : "border-gray-200"
//                 )}
//                 dir="ltr"
//               />
//             </div>
//             {errors.phone && (
//               <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
//             )}
//           </div>

//           {deliveryMethod === 'delivery' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 አድራሻ *
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                 <textarea
//                   {...register('address')}
//                   rows={3}
//                   placeholder="ክፍለ ከተማ፣ ቀበሌ፣ ቤት ቁጥር፣ ምልክት..."
//                   className={cn(
//                     "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
//                     errors.address ? "border-red-500" : "border-gray-200"
//                   )}
//                 />
//               </div>
//               {errors.address && (
//                 <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Delivery Time */}
//       <div className="bg-white rounded-xl border border-gray-200 p-5">
//         <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <Calendar size={18} />
//           የማድረሻ ጊዜ
//         </h3>

//         <div className="space-y-3">
//           <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input
//               type="radio"
//               value="asap"
//               {...register('deliveryTime')}
//               className="w-4 h-4 text-green-600"
//             />
//             <div>
//               <p className="font-medium text-gray-800">በተቻለ ፍጥነት</p>
//               <p className="text-xs text-gray-500">ትዕዛዝ ከገባ በ 60 ደቂቃ ውስጥ</p>
//             </div>
//           </label>

//           <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input
//               type="radio"
//               value="scheduled"
//               {...register('deliveryTime')}
//               className="w-4 h-4 text-green-600"
//             />
//             <div>
//               <p className="font-medium text-gray-800">በተወሰነ ሰዓት</p>
//               <p className="text-xs text-gray-500">ለኋላ ቀን ማቀድ ይችላሉ</p>
//             </div>
//           </label>

//           {watchedDeliveryTime === 'scheduled' && (
//             <div className="pt-2">
//               <input
//                 {...register('scheduledTime')}
//                 type="datetime-local"
//                 min={new Date().toISOString().slice(0, 16)}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Notes */}
//       <div className="bg-white rounded-xl border border-gray-200 p-5">
//         <h3 className="font-semibold text-gray-800 mb-4">ማስታወሻ (ካለ)</h3>
//         <textarea
//           {...register('notes')}
//           rows={3}
//           placeholder="ማንኛውም ተጨማሪ መረጃ ወይም ልዩ ጥያቄ..."
//           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
//       >
//         {isSubmitting ? 'ትዕዛዝ በመስጠት ላይ...' : 'ትዕዛዝ አስገባ'}
//       </button>

//       <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
//         <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
//         <p className="text-xs text-blue-700">
//           ትዕዛዝዎ ከተረጋገጠ በኋላ የምርቶቹ ዋጋ በደረሰ ጊዜ ይከፈላል
//         </p>
//       </div>
//     </form>
//   )
// }

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Phone, MapPin, Calendar, AlertCircle } from 'lucide-react'
import { DeliveryMethod } from '@/types'
import { checkoutSchema, CheckoutFormData } from '../utils/checkoutValidation'
import { useAuth } from '@/features/auth'
import { cn } from '@/utils/cn'

interface CheckoutFormProps {
  deliveryMethod: DeliveryMethod
  onSubmit: (data: CheckoutFormData) => Promise<boolean>
  isSubmitting: boolean
  userAddress?: string
  userName?: string
  userPhone?: string
}

export function CheckoutForm({ 
  deliveryMethod, 
  onSubmit, 
  isSubmitting, 
  userAddress,
  userName,
  userPhone 
}: CheckoutFormProps) {
  const { user } = useAuth()
  // const [deliveryTime, setDeliveryTime] = useState<'asap' | 'scheduled'>('asap')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema(deliveryMethod)),
    defaultValues: {
      name: userName || user?.name || '',
      phone: userPhone || user?.phone_number || '',
      address: userAddress || user?.address || '',
      deliveryTime: 'asap',
      notes: '',
    },
  })

  // Update form when user data changes
  useEffect(() => {
    if (userName) setValue('name', userName)
    if (userPhone) setValue('phone', userPhone)
    if (userAddress) setValue('address', userAddress)
  }, [userName, userPhone, userAddress, setValue])

  const watchedDeliveryTime = watch('deliveryTime')

  const onSubmitForm = async (data: CheckoutFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
      {/* Personal Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User size={18} />
          የግል መረጃ
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ሙሉ ስም *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register('name')}
                className={cn(
                  "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                  errors.name ? "border-red-500" : "border-gray-200"
                )}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ስልክ ቁጥር *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register('phone')}
                placeholder="+251XXXXXXXXX"
                className={cn(
                  "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                  errors.phone ? "border-red-500" : "border-gray-200"
                )}
                dir="ltr"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {deliveryMethod === 'delivery' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                አድራሻ *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  {...register('address')}
                  rows={3}
                  placeholder="ክፍለ ከተማ፣ ቀበሌ፣ ቤት ቁጥር፣ ምልክት..."
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
                    errors.address ? "border-red-500" : "border-gray-200"
                  )}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={18} />
          የማድረሻ ጊዜ
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="asap"
              {...register('deliveryTime')}
              className="w-4 h-4 text-green-600"
            />
            <div>
              <p className="font-medium text-gray-800">በተቻለ ፍጥነት</p>
              <p className="text-xs text-gray-500">ትዕዛዝ ከገባ በ 60 ደቂቃ ውስጥ</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="scheduled"
              {...register('deliveryTime')}
              className="w-4 h-4 text-green-600"
            />
            <div>
              <p className="font-medium text-gray-800">በተወሰነ ሰዓት</p>
              <p className="text-xs text-gray-500">ለኋላ ቀን ማቀድ ይችላሉ</p>
            </div>
          </label>

          {watchedDeliveryTime === 'scheduled' && (
            <div className="pt-2">
              <input
                {...register('scheduledTime')}
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">ማስታወሻ (ካለ)</h3>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="ማንኛውም ተጨማሪ መረጃ ወይም ልዩ ጥያቄ..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'ትዕዛዝ በመስጠት ላይ...' : 'ትዕዛዝ አስገባ'}
      </button>

      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
        <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">
          ትዕዛዝዎ ከተረጋገጠ በኋላ የምርቶቹ ዋጋ በደረሰ ጊዜ ይከፈላል
        </p>
      </div>
    </form>
  )
}