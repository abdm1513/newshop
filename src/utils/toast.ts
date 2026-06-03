import toast from 'react-hot-toast'

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#22c55e',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#22c55e',
    },
  })
}

export const showError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#ef4444',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  })
}

export const showLoading = (message: string) => {
  return toast.loading(message, {
    position: 'top-center',
    style: {
      background: '#3b82f6',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  })
}

export const showInfo = (message: string) => {
  toast(message, {
    duration: 3000,
    position: 'top-center',
    icon: 'ℹ️',
    style: {
      background: '#3b82f6',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  })
}