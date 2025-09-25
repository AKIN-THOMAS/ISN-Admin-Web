import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { ROUTES } from '@/constants/routes'

interface PublicRouteProps {
  children: ReactNode
  /** If true, authenticated users will be redirected to dashboard */
  redirectIfAuthenticated?: boolean
}

/**
 * PublicRoute component for authentication pages
 * Redirects authenticated users to dashboard if specified
 */
const PublicRoute = ({ children, redirectIfAuthenticated = true }: PublicRouteProps) => {
  const isAuthenticated = useAppSelector(state => state.auth?.isAuthenticated || false)
  const location = useLocation()

  if (isAuthenticated && redirectIfAuthenticated) {
    // Get the intended destination from location state, or default to dashboard
    const from = location.state?.from?.pathname || ROUTES.DASHBOARD
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}

export default PublicRoute