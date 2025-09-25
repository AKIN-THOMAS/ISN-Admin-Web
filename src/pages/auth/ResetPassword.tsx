import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingButton, LoadingScreen, FinePrint } from '@/components/common'
import { ROUTES } from '@/constants/routes'
import resetSideImage from '@/assets/images/reset-side.jpg'
import logoImage from '@/assets/images/isn-logo-113.png'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock reset request - in a real app, you'd send reset email
    console.log('Reset password requested for:', email)
    
    setIsLoading(false)
    // Navigate to OTP verification screen
    navigate(ROUTES.AUTH.OTP_VERIFICATION, { state: { email } })
  }

  const handleGoBack = () => {
    navigate(ROUTES.AUTH.LOGIN)
  }

  // Show full page loading
  if (isPageLoading) {
    return (
      <LoadingScreen
        variant="spinner"
        size="lg"
        showLogo={true}
        loadingText="Processing Request"
        message="Sending reset instructions..."
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
          style={{ backgroundImage: `url(${resetSideImage})` }}
        >
          {/* Primary red overlay with opacity */}
          <div className="absolute inset-0 bg-primary-600 bg-opacity-40"></div>
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
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <FinePrint variant="default" className="text-white text-fine-xs font-medium">
            © 2025 Internet Solutions Nigeria. All rights reserved.
          </FinePrint>
        </div>
      </div>

      {/* Right side - Reset Password Form */}
      <div className="flex-1 lg:w-3/5 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Go Back Link */}
          <div className="text-right">
            <button
              onClick={handleGoBack}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-fine font-medium"
            >
              ← Go Back
            </button>
          </div>

          {/* Reset Header */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-fine">
              Enter your email address and we'll send you a verification code
            </p>
          </div>

          {/* Reset Form */}
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full rounded-md"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Send Reset Code Button */}
            <div className="space-y-4">
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingText="Sending code..."
                variant="primary"
                size="lg"
                className="w-full"
              >
                Send Reset Code
              </LoadingButton>
            </div>
          </form>
          
          {/* Help text */}
          <div className="mt-6 text-center">
            <FinePrint variant="subtle" className="text-fine-sm">
              Remember your password?{' '}
              <button 
                onClick={handleGoBack}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                Sign in instead
              </button>
            </FinePrint>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword