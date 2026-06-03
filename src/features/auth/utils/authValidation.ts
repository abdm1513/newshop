import { z } from 'zod'
import { PHONE_REGEX } from '@/constants/config'

// Zod schemas
export const phoneSchema = z.string()
  .min(1, 'ስልክ ቁጥር ያስፈልጋል')
  .regex(PHONE_REGEX, 'እባክዎ ትክክለኛ የኢትዮ ቴሌኮም ወይም ሳፋሪኮም ስልክ ቁጥር ያስገቡ (+251XXXXXXXXX)')

export const nameSchema = z.string()
  .min(1, 'ስም ያስፈልጋል')
  .min(2, 'ስም ቢያንስ 2 ፊደላት መሆን አለበት')
  .max(50, 'ስም ቢበዛ 50 ፊደላት መሆን አለበት')

export const passwordSchema = z.string()
  .min(1, 'የይለፍ ቃል ያስፈልጋል')
  .min(6, 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት')

export const confirmPasswordSchema = z.string()
  .min(1, 'እባክዎ የይለፍ ቃል ያረጋግጡ')

export const signUpSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "የይለፍ ቃሎች አይዛመዱም",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
  phone: phoneSchema,
})

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  phone_number: phoneSchema.optional(),
  address: z.string().optional(),
})

// Types
export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

// Validation functions
export const validatePhoneNumber = (phone: string): boolean => {
  return phoneSchema.safeParse(phone).success
}

export const formatPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('0')) {
    cleaned = '251' + cleaned.slice(1)
  }
  
  if (cleaned.startsWith('251')) {
    return '+' + cleaned
  }
  
  if (phone.startsWith('+251')) {
    return phone
  }
  
  return phone
}

export const generateEmailFromPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '')
  const phoneNumber = cleanPhone.replace(/^251/, '')
  return `${phoneNumber}@grocery-app.com`
}

export const validateName = (name: string): boolean => {
  return nameSchema.safeParse(name).success
}

export const validatePassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success
}

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && validatePassword(password)
}