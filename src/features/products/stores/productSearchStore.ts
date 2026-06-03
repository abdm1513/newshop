import { create } from 'zustand'

interface ProductSearchState {
  searchQuery: string
  isSearchOpen: boolean
  setSearchQuery: (query: string) => void
  setIsSearchOpen: (isOpen: boolean) => void
  clearSearch: () => void
}

export const useProductSearchStore = create<ProductSearchState>((set) => ({
  searchQuery: '',
  isSearchOpen: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  clearSearch: () => set({ searchQuery: '', isSearchOpen: false }),
}))