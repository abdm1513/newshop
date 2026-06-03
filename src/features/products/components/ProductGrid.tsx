import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ProductGridProps {
  children: ReactNode
  className?: string
}

export function ProductGrid({ children, className = '' }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid gap-1.5 sm:gap-2",
        "grid-cols-2",
        "sm:grid-cols-3",
        "md:grid-cols-4",
        "lg:grid-cols-5",
        "xl:grid-cols-6",
        className
      )}
    >
      {children}
    </div>
  )
}