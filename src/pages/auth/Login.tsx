import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { loginSuccess } from '@/store/slices/authSlice'
import { LoadingButton, LoadingScreen, FinePrint } from '@/components/common'
import { ROUTES } from '@/constants/routes'
import loginSideImage from '@/assets/images/login-side.jpg'
import logoImage from '@/assets/images/isn-logo-113.png'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock login - in a real app, you'd validate credentials
    dispatch(loginSuccess({
      user: {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      },
      token: 'mock-jwt-token'
    }))
    
    setIsLoading(false)
  }

  const handleLoadPage = () => {
    setIsPageLoading(true)
    // Simulate page loading
    setTimeout(() => {
      setIsPageLoading(false)
    }, 3000)
  }

  const handleForgotPassword = () => {
    navigate(ROUTES.AUTH.RESET_PASSWORD)
  }

  // Show full page loading
  if (isPageLoading) {
    return (
      <LoadingScreen
        variant="spinner"
        size="lg"
        showLogo={true}
        loadingText="Initializing Application"
        message="Setting up your workspace..."
        overlay={true}
      />
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image with logo and copyright */}
      <div className="hidden lg:flex lg:w-2/5 relative bg-gray-100">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${loginSideImage})` }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Logo in white circle */}
        <div className="absolute top-8 left-8 z-20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img 
              src={logoImage} 
              alt="ISN Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
        
        {/* Copyright at bottom */}
        <div className="absolute bottom-8 left-8 z-20">
          <FinePrint variant="default" className="text-white text-fine-xs font-medium text-white">
            © 2025 Internet Solutions Nigeria. All rights reserved.
          </FinePrint>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 lg:w-3/5 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Welcome Header */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-fine">
              Enter your details below to continue
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="input w-full rounded-md"
                  placeholder="Enter your email"
                  defaultValue="admin@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="input w-full rounded-md"
                  placeholder="Enter your password"
                  defaultValue="password"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-fine font-medium bg-transparent border-none cursor-pointer"
              >
                Forgot your password?
              </button>
            </div>

            {/* Sign In Button */}
            <div className="space-y-4">
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingText="Signing in..."
                variant="primary"
                size="lg"
                className="w-full"
              >
                Sign In
              </LoadingButton>
              
              {/* Demo Button */}
              <LoadingButton
                type="button"
                onClick={handleLoadPage}
                variant="outline"
                size="md"
                className="w-full"
              >
                Demo Login
              </LoadingButton>
            </div>
          </form>
          
          {/* Demo credentials info */}
          <div className="mt-6 text-center">
            <FinePrint variant="subtle" className="text-fine-sm">
              Demo: admin@example.com / password
            </FinePrint>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login