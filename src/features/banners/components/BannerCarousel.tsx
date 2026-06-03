import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBanners } from '../hooks/useBanners'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getBannerImageUrl } from '@/utils/imageUtils'
import { cn } from '@/utils/cn'

export function BannerCarousel() {
  const { data: banners, isLoading } = useBanners()

  const actualLength = banners?.length || 0
  const startIndex = actualLength

  const [currentIndex, setCurrentIndex] = useState(startIndex)

  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Disable transition during instant reset
  const [enableTransition, setEnableTransition] = useState(true)

  // FIX: provide initial value
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Triple banners for infinite illusion
  const extendedBanners =
    banners && banners.length > 0
      ? [...banners, ...banners, ...banners]
      : []

  const goToSlide = useCallback((index: number) => {
    setEnableTransition(true)
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  // Auto play
  useEffect(() => {
    if (isLoading || !banners?.length || isHovered) return

    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isLoading, banners, isHovered, nextSlide])

  // Infinite reset logic
  useEffect(() => {
    if (actualLength === 0) return

    const handleTransitionEnd = () => {
      // Passed right boundary
      if (currentIndex >= actualLength * 2) {
        setEnableTransition(false)
        setCurrentIndex(startIndex)
      }

      // Passed left boundary
      if (currentIndex < startIndex) {
        setEnableTransition(false)
        setCurrentIndex(actualLength * 2 - 1)
      }
    }

    const timeout = setTimeout(handleTransitionEnd, 300)

    return () => clearTimeout(timeout)
  }, [currentIndex, actualLength, startIndex])

  // Re-enable transition after instant jump
  useEffect(() => {
    if (!enableTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true)
        })
      })
    }
  }, [enableTransition])

  // Reset index when banners load
  useEffect(() => {
    if (actualLength > 0) {
      setCurrentIndex(startIndex)
    }
  }, [actualLength, startIndex])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd

    if (distance > 50) {
      nextSlide()
    } else if (distance < -50) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  if (isLoading) {
    return (
      <div className="container-custom">
        <div className="w-full h-36 sm:h-64 md:h-80 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!banners || banners.length === 0) {
    return null
  }

  const getDisplayIndex = () => {
    return ((currentIndex - startIndex) % actualLength + actualLength) % actualLength
  }

  return (
    <div className="container-custom">
      <div
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            'flex',
            enableTransition && 'transition-transform duration-300 ease-out'
          )}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {extendedBanners.map((banner, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <div className="relative w-full h-36 sm:h-64 md:h-80">
                <OptimizedImage
                  src={getBannerImageUrl(banner.image)}
                  alt={banner.title || 'Banner'}
                  className="w-full h-full"
                  objectFit="cover"
                />

                {(banner.title || banner.subtitle) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                    <div className="px-4 sm:px-8 w-full">
                      <div className="max-w-md">
                        {banner.title && (
                          <h2 className="text-white text-xl sm:text-3xl font-bold mb-2">
                            {banner.title}
                          </h2>
                        )}

                        {banner.subtitle && (
                          <p className="text-white/90 text-sm sm:text-base">
                            {banner.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
            >
              <ChevronLeft size={20} className="text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
            >
              <ChevronRight size={20} className="text-gray-800" />
            </button>
          </>
        )}

        {/* Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(startIndex + idx)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  getDisplayIndex() === idx
                    ? 'w-2.5 h-2.5 bg-white'
                    : 'w-2 h-2 bg-white/50'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}