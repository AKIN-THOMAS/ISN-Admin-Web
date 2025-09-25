/**
 * Route constants for the application
 * Centralized routing configuration
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  
  // Authentication routes
  AUTH: {
    LOGIN: '/login',
    RESET_PASSWORD: '/reset-password',
    OTP_VERIFICATION: '/otp-verification',
    NEW_PASSWORD: '/new-password',
  },
  
  // Protected routes
  DASHBOARD: '/dashboard',
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
} as const

// Type for route paths
export type RouteKey = typeof ROUTES[keyof typeof ROUTES]
export type AuthRouteKey = typeof ROUTES.AUTH[keyof typeof ROUTES.AUTH]

// Navigation helper functions
export const getAuthRoute = (route: keyof typeof ROUTES.AUTH): string => {
  return ROUTES.AUTH[route]
}

// Route groups for easier management
export const PUBLIC_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.RESET_PASSWORD,
  ROUTES.AUTH.OTP_VERIFICATION,
  ROUTES.AUTH.NEW_PASSWORD,
] as const

export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.DASHBOARD,
] as const

export const isPublicRoute = (path: string): boolean => {
  return PUBLIC_ROUTES.includes(path as any)
}

export const isProtectedRoute = (path: string): boolean => {
  return PROTECTED_ROUTES.includes(path as any)
}