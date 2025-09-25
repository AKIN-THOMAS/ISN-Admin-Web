import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingButton, LoadingScreen, FinePrint } from '@/components/common'
import SuccessModal from '@/components/common/SuccessModal'
import FailureModal from '@/components/common/FailureModal'
import { ROUTES } from '@/constants/routes'
import resetSideImage from '@/assets/images/reset-side.jpg'
import logoImage from '@/assets/images/isn-logo-113.png'

const NewPassword = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showFailureModal, setShowFailureModal] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  // Password validation
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const isMinLength = newPassword.length >= 8
  const hasMixedCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)
  const hasNumbersOrSymbols = /[0-9]/.test(newPassword) || /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const isPasswordValid = isMinLength // Basic validation for form submission
  const canSubmit = passwordsMatch && isPasswordValid

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock password creation - in real app, you'd call your API
    const success = Math.random() > 0.2 // 80% success rate for demo
    
    setIsLoading(false)
    
    if (success) {
      setShowSuccessModal(true)
      // Start countdown for redirect
      startRedirectCountdown()
    } else {
      setShowFailureModal(true)
    }
  }

  const startRedirectCountdown = () => {
    let countdown = 5
    setRedirectCountdown(countdown)
    
    const timer = setInterval(() => {
      countdown -= 1
      setRedirectCountdown(countdown)
      
      if (countdown <= 0) {
        clearInterval(timer)
        handleGoToLogin()
      }
    }, 1000)
  }

  const handleGoToLogin = () => {
    navigate(ROUTES.AUTH.LOGIN)
  }

  const handleGoBack = () => {
    navigate(ROUTES.AUTH.OTP_VERIFICATION)
  }

  // Show full page loading
  if (isPageLoading) {
    return (
      <LoadingScreen
        variant="spinner"
        size="lg"
        showLogo={true}
        loadingText="Creating Password"
        message="Securing your account..."
        overlay={true}
      />
    )
  }

  return (
    <>
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
          <div className="absolute bottom-8 left-8 z-20">
            <FinePrint variant="default" className="text-white text-fine-xs font-medium">
              © 2025 Internet Solutions Nigeria. All rights reserved.
            </FinePrint>
          </div>
        </div>

        {/* Right side - New Password Form */}
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

            {/* Header */}
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create New Password
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-fine">
                Choose a strong password for your account
              </p>
            </div>

            {/* Password Form */}
            <form className="mt-8 space-y-6" onSubmit={handleCreatePassword}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input w-full rounded-md"
                    placeholder="Enter new password"
                  />
                  {newPassword && !isMinLength && (
                    <FinePrint variant="error" className="text-fine-xs mt-1">
                      Password must be at least 8 characters long
                    </FinePrint>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input w-full rounded-md"
                    placeholder="Confirm new password"
                  />
                  {confirmPassword && !passwordsMatch && (
                    <FinePrint variant="error" className="text-fine-xs mt-1">
                      Passwords do not match
                    </FinePrint>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <FinePrint variant="subtle" className="text-fine-xs mb-2 font-medium">
                  Password Requirements:
                </FinePrint>
                <ul className="space-y-1">
                  <li className={`text-fine-xs flex items-center gap-2 ${isMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className={`w-1 h-1 rounded-full ${isMinLength ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                    At least 8 characters
                  </li>
                  <li className={`text-fine-xs flex items-center gap-2 ${hasMixedCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className={`w-1 h-1 rounded-full ${hasMixedCase ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                    Mix of uppercase and lowercase letters (recommended)
                  </li>
                  <li className={`text-fine-xs flex items-center gap-2 ${hasNumbersOrSymbols ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className={`w-1 h-1 rounded-full ${hasNumbersOrSymbols ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                    Include numbers and symbols (recommended)
                  </li>
                </ul>
              </div>

              {/* Create Password Button */}
              <div className="space-y-4">
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  loadingText="Creating password..."
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!canSubmit}
                >
                  Create Password
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Password Change Successful"
        message={
          <div>
            <p>You will be redirected to the login page to sign in</p>
            <p className="mt-2 text-sm">Redirecting in {redirectCountdown} seconds...</p>
          </div>
        }
        actionButton={{
          text: "Go to Login Now",
          onClick: handleGoToLogin
        }}
      />

      {/* Failure Modal */}
      <FailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        header="Password Change Failed"
        message="There was an error creating your new password. Please try again."
        retryButton={{
          text: "Try Again",
          onClick: () => {
            setShowFailureModal(false)
            setNewPassword('')
            setConfirmPassword('')
          }
        }}
      />
    </>
  )
}

export default NewPassword