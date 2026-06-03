import { ForgotPasswordForm } from '@/features/auth'

export default function ForgotPasswordPage() {
  return (
    <div className="container-custom py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}