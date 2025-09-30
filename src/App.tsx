import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { hideSplash } from '@/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'

// Layout Components
import Layout from '@/components/layout/Layout'

// Auth Components
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import PublicRoute from '@/components/auth/PublicRoute'

// Page Components
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/auth/Login'
import ResetPassword from '@/pages/auth/ResetPassword'
import OTPVerification from '@/pages/auth/OTPVerification'
import NewPassword from '@/pages/auth/NewPassword'
import NotFound from '@/pages/NotFound'
import Unauthorized from '@/pages/Unauthorized'

// Common Components
import SplashScreen from '@/components/common/SplashScreen'


// Dashboard Subpages (create these files/components as needed)
import Clients from '@/pages/dashboard/Clients'
import Hardware from '@/pages/dashboard/Hardware'
import Others from '@/pages/dashboard/Others'
import Notifications from '@/pages/dashboard/Notifications'
import Profile from '@/pages/dashboard/Profile'

function App() {
  const dispatch = useAppDispatch()
  const uiState = useAppSelector(state => state.ui)
  const showSplash = uiState?.showSplash !== false // Show splash by default

  const handleSplashComplete = () => {
    dispatch(hideSplash())
  }

  // Show splash screen on first load
  if (showSplash) {
    return <SplashScreen onLoadingComplete={handleSplashComplete} />
  }

  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path={ROUTES.AUTH.LOGIN} element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      <Route path={ROUTES.AUTH.RESET_PASSWORD} element={
        <PublicRoute redirectIfAuthenticated={false}>
          <ResetPassword />
        </PublicRoute>
      } />
      
      <Route path={ROUTES.AUTH.OTP_VERIFICATION} element={
        <PublicRoute redirectIfAuthenticated={false}>
          <OTPVerification />
        </PublicRoute>
      } />
      
      <Route path={ROUTES.AUTH.NEW_PASSWORD} element={
        <PublicRoute redirectIfAuthenticated={false}>
          <NewPassword />
        </PublicRoute>
      } />

      {/* Protected Routes with Layout */}
      <Route path={ROUTES.HOME} element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path={ROUTES.DASHBOARD} element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Dashboard Subpages */}
      <Route path="/dashboard/clients" element={
        <ProtectedRoute>
          <Layout>
            <Clients />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/hardware" element={
        <ProtectedRoute>
          <Layout>
            <Hardware />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/others" element={
        <ProtectedRoute>
          <Layout>
            <Others />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/notifications" element={
        <ProtectedRoute>
          <Layout>
            <Notifications />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Error Routes */}
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App