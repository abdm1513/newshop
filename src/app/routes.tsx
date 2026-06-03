import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ProtectedRoute } from './protectedRoute'
import { Layout } from '@/components/layout/Layout'

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const ProductDetailsPage = lazy(() => import('@/pages/ProductDetailsPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const OrderHistoryPage = lazy(() => import('@/pages/OrderHistoryPage'))
const OrderDetailsPage = lazy(() => import('@/pages/OrderDetailsPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const HelpFaqsPage = lazy(() => import('@/pages/HelpFaqsPage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={withSuspense(HomePage)} />
        <Route path="products" element={withSuspense(ProductsPage)} />
        <Route path="products/:id" element={withSuspense(ProductDetailsPage)} />
        <Route path="cart" element={withSuspense(CartPage)} />
        <Route path="about" element={withSuspense(AboutPage)} />
        <Route path="contact" element={withSuspense(ContactPage)} />
        <Route path="help" element={withSuspense(HelpFaqsPage)} />
        <Route path="terms" element={withSuspense(TermsPage)} />
        <Route path="privacy" element={withSuspense(PrivacyPolicyPage)} />
        
        {/* Auth Routes */}
        <Route path="login" element={withSuspense(LoginPage)} />
        <Route path="register" element={withSuspense(RegisterPage)} />
        <Route path="forgot-password" element={withSuspense(ForgotPasswordPage)} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="checkout" element={withSuspense(CheckoutPage)} />
          <Route path="orders" element={withSuspense(OrderHistoryPage)} />
          <Route path="orders/:id" element={withSuspense(OrderDetailsPage)} />
          <Route path="profile" element={withSuspense(ProfilePage)} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={withSuspense(NotFoundPage)} />
      </Route>
    </Routes>
  )
}