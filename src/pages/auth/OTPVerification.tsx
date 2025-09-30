import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoadingButton, LoadingScreen, FinePrint, SuccessModal } from '@/components/common'
import { ROUTES } from '@/constants/routes'
import resetSideImage from '@/assets/images/reset-side.jpg'
import logoImage from '@/assets/images/isn-logo-113.png'

const OTPVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, ] = useState(false)
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [resendAttempts, setResendAttempts] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Get email from location state or use default
  const email = location.state?.email || 'admin@example.com'
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Auto-focus first input on component mount
  useEffect(() => {
    // Focus the first input when component mounts
    inputRefs.current[0]?.focus()
  }, [])

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      setCanResend(true)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown])

  // Check if all OTP boxes are filled
  const isOTPComplete = otp.every(digit => digit !== '')

  const handleChange = useCallback((element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, '') // Only allow digits
    
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input on value entry
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }, [otp])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }, [otp])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]
    
    for (let i = 0; i < pasteData.length && i < 6; i++) {
      newOtp[i] = pasteData[i]
    }
    
    setOtp(newOtp)
    
    // Focus on the next empty input or the last input
    const nextIndex = Math.min(pasteData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }, [otp])

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isOTPComplete) return
    
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock OTP verification - in a real app, you'd verify with backend
    console.log('Verifying OTP:', otp.join(''))
    
    setIsLoading(false)
    
    // Show success modal and then navigate to new password
    setShowSuccessModal(true)
  }

  const handleSuccessModalAction = () => {
    setShowSuccessModal(false)
    navigate(ROUTES.AUTH.NEW_PASSWORD)
  }

  const handleResendOTP = async () => {
    if (!canResend || resendAttempts >= 5) return
    
    setIsLoading(true)
    setCanResend(false)
    setCountdown(60)
    setResendAttempts(prev => prev + 1)
    setOtp(new Array(6).fill(''))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    
    // Focus first input
    inputRefs.current[0]?.focus()
  }

  const handleGoBack = () => {
    navigate(ROUTES.AUTH.RESET_PASSWORD)
  }

  // Show full page loading
  if (isPageLoading) {
    return (
      <LoadingScreen
        variant="spinner"
        size="lg"
        showLogo={true}
        loadingText="Verifying Code"
        message="Please wait while we verify your code..."
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

      {/* Right side - OTP Verification Form */}
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

          {/* Verification Header */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-fine">
              Enter the 6-digit code sent to <span className="font-medium">{email}</span>
            </p>
          </div>

          {/* OTP Form */}
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            {/* OTP Input Boxes */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Verification Code
              </label>
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${
                      digit 
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                        : 'bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Resend OTP Section */}
            <div className="text-center space-y-2">
              {canResend && resendAttempts < 5 ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-fine font-medium disabled:opacity-50"
                >
                  Resend Code
                </button>
              ) : (
                <FinePrint variant="subtle" className="text-fine-sm">
                  {resendAttempts >= 5 
                    ? "Maximum resend attempts reached" 
                    : `Resend code in ${countdown}s`
                  }
                </FinePrint>
              )}
              
              {resendAttempts > 0 && (
                <FinePrint variant="subtle" className="text-fine-xs">
                  Attempts: {resendAttempts}/5
                </FinePrint>
              )}
            </div>

            {/* Verify Button */}
            <div className="space-y-4">
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingText="Verifying..."
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!isOTPComplete}
              >
                Verify Code
              </LoadingButton>
            </div>
          </form>
          
          {/* Help text */}
          <div className="mt-6 text-center">
            <FinePrint variant="subtle" className="text-fine-sm">
              Didn't receive the code? Check your spam folder or{' '}
              <button 
                onClick={handleGoBack}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                try a different email
              </button>
            </FinePrint>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Verification Successful"
        message="Your email has been verified successfully."
        actionButton={{
          text: "Create New Password",
          onClick: handleSuccessModalAction
        }}
      />
    </div>
  )
}

export default OTPVerification