import { z } from 'zod'
import { DeliveryMethod } from '@/types'
import { PHONE_REGEX } from '@/constants/config'

export const checkoutSchema = (deliveryMethod: DeliveryMethod) => {
  const baseSchema = {
    name: z.string().min(2, 'ስም ቢያንስ 2 ፊደላት መሆን አለበት'),
    phone: z.string().regex(PHONE_REGEX, 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ'),
    deliveryTime: z.enum(['asap', 'scheduled']),
    scheduledTime: z.string().optional(),
    notes: z.string().optional(),
  }

  if (deliveryMethod === 'delivery') {
    return z.object({
      ...baseSchema,
      address: z.string().min(5, 'እባክዎ ሙሉ አድራሻ ያስገቡ'),
    })
  }

  return z.object({
    ...baseSchema,
    address: z.string().optional(),
  })
}

export type CheckoutFormData = z.infer<ReturnType<typeof checkoutSchema>>

export const validateCheckout = (data: any, deliveryMethod: DeliveryMethod) => {
  const schema = checkoutSchema(deliveryMethod)
  return schema.safeParse(data)
}