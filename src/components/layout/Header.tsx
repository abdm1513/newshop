import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, Search, X } from 'lucide-react'
import { useCartStore } from '@/features/cart/stores/cartStore'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { useProductSearch } from '@/features/products/hooks/useProductSearch'
import { MobileNav } from './MobileNav'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getProductImageUrl } from '@/utils/imageUtils'
import { useDebounce } from '@/hooks/useDebounce'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items } = useCartStore()
  const { user } = useAuthStore()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  
  const debouncedSearch = useDebounce(searchQuery, 300)
  const { data: searchResults, isLoading } = useProductSearch(debouncedSearch)
  
  const cartItemCount = items.length

  // Navigation links for desktop
  const navLinks = [
    { path: '/products', label: 'ምርቶች', active: location.pathname === '/products' },
    { path: '/about', label: 'ስለ እኛ', active: location.pathname === '/about' },
    { path: '/contact', label: 'አግኙን', active: location.pathname === '/contact' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setShowSearchResults(false)
    setIsSearchOpen(false)
    setSearchQuery('')
  }, [location])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length >= 2) {
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`)
    setShowSearchResults(false)
    setSearchQuery('')
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container-custom py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - Left side */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-green-600">የግሮሰሪ መደብር</h1>
            </Link>

            {/* Desktop Navigation Links - Center */}
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition ${
                    link.active
                      ? 'text-green-600 border-b-2 border-green-600 pb-1'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden sm:flex flex-1 max-w-md relative" ref={searchRef}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="ምርት ፈልግ..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">በመፈለግ ላይ...</div>
                  ) : searchResults && searchResults.length > 0 ? (
                    <div>
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition text-left"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <OptimizedImage
                              src={getProductImageUrl(product.images[0] || '')}
                              alt={product.name}
                              className="w-10 h-10"
                              objectFit="contain"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-green-600">{product.price.toLocaleString('am-ET')} ብር</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.length >= 2 ? (
                    <div className="p-4 text-center text-gray-500">ምንም ምርት አልተገኘም</div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Actions - Right side */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Search size={22} />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Profile / Login Button */}
              {user ? (
                <button
                  onClick={() => navigate('/profile')}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <User size={22} />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                >
                  ግባ
                </button>
              )}

              {/* Mobile Menu Button - Rightmost */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="ምርት ፈልግ..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="p-2">
                <X size={22} />
              </button>
            </div>
          </div>
          <div className="p-4">
            {isLoading && <div className="text-center text-gray-500">በመፈለግ ላይ...</div>}
            {searchResults && searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <OptimizedImage
                        src={getProductImageUrl(product.images[0] || '')}
                        alt={product.name}
                        className="w-10 h-10"
                        objectFit="contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-green-600">{product.price.toLocaleString('am-ET')} ብር</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && searchResults?.length === 0 && !isLoading && (
              <div className="text-center text-gray-500 py-8">ምንም ምርት አልተገኘም</div>
            )}
          </div>
        </div>
      )}

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}