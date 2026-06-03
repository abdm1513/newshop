// src/components/ui/OptimizedImage.tsx

import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react'
import { getOptimizedImageUrl, PLACEHOLDER_IMAGE } from '@/utils/imageUtils'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  lazy?: boolean
  priority?: boolean
  fallbackSrc?: string
  width?: number
  height?: number
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  objectFit = 'contain',
  lazy = true,
  priority = false,
  fallbackSrc = PLACEHOLDER_IMAGE,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState<string>(fallbackSrc)

  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!src) {
      setCurrentSrc(fallbackSrc)
      return
    }

    setIsLoaded(false)
    setError(false)

    const optimizedUrl = getOptimizedImageUrl(src, {
      width,
      height,
      quality: 85,
    })

    setCurrentSrc(optimizedUrl)
  }, [src, width, height, fallbackSrc])

  useEffect(() => {
    if (priority && imgRef.current) {
      const img = imgRef.current
      if (img.complete && !isLoaded) {
        setIsLoaded(true)
      }
    }
  }, [priority, isLoaded])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)

    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
    }
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" />
      )}

      <img
        ref={imgRef}
        src={error ? fallbackSrc : currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
        }}
        {...props}
      />
    </div>
  )
}