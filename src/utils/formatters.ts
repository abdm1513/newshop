export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('am-ET')} ብር`
}

export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('am-ET', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return ''
  // Format: +251 9X XXX XXXX
  if (phone.startsWith('+251') && phone.length === 13) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`
  }
  return phone
}

export const formatOrderNumber = (orderNumber: string): string => {
  return `#${orderNumber.slice(0, 8)}`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}