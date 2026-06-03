import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
}

export function AuthDialog({ isOpen, onClose, defaultMode = 'login' }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)

  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
          
          <div className="p-6">
            {mode === 'login' ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <RegisterForm onSuccess={handleSuccess} />
            )}
            
            <div className="mt-4 text-center">
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-sm text-green-600 hover:text-green-700"
              >
                {mode === 'login' 
                  ? 'አዲስ መለያ ለመፍጠር እዚህ ይጫኑ' 
                  : 'አካውንት አለኝ? ግባ'}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}