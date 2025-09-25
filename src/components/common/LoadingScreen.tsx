import React from 'react'

export interface LoadingScreenProps {
  /** Message to display below the loading indicator */
  message?: string
  /** Size of the loading spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Type of loading animation */
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  /** Whether to show as overlay (fixed position) or inline */
  overlay?: boolean
  /** Custom background color for overlay */
  backgroundColor?: string
  /** Whether to show the company logo */
  showLogo?: boolean
  /** Custom loading text */
  loadingText?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  size = 'md',
  variant = 'spinner',
  overlay = false,
  backgroundColor = 'bg-white/80',
  showLogo = false,
  loadingText = 'Please wait'
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      spinner: 'w-8 h-8',
      text: 'text-sm',
      logo: 'w-12 h-12',
      container: 'gap-3'
    },
    md: {
      spinner: 'w-12 h-12',
      text: 'text-base',
      logo: 'w-16 h-16',
      container: 'gap-4'
    },
    lg: {
      spinner: 'w-16 h-16',
      text: 'text-lg',
      logo: 'w-20 h-20',
      container: 'gap-5'
    },
    xl: {
      spinner: 'w-24 h-24',
      text: 'text-xl',
      logo: 'w-32 h-32',
      container: 'gap-6'
    }
  }

  const currentSize = sizeClasses[size]

  // Loading animation variants
  const renderLoadingAnimation = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div
            className={`${currentSize.spinner} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin`}
          />
        )
      
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )
      
      case 'pulse':
        return (
          <div className={`${currentSize.spinner} bg-primary-500 rounded-full animate-pulse`} />
        )
      
      case 'bars':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-8 bg-primary-500 animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-8 bg-primary-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-8 bg-primary-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-8 bg-primary-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-8 bg-primary-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )
      
      default:
        return (
          <div
            className={`${currentSize.spinner} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin`}
          />
        )
    }
  }

  const baseClasses = `
    flex flex-col items-center justify-center
    ${currentSize.container}
    ${overlay 
      ? `fixed inset-0 z-50 ${backgroundColor} backdrop-blur-sm` 
      : 'w-full h-full min-h-[200px]'
    }
  `

  return (
    <div className={baseClasses}>
      {/* Company Logo */}
      {showLogo && (
        <div className="mb-4">
          <img
            src="/src/assets/images/isn-logo-113.png"
            alt="ISN Logo"
            className={`${currentSize.logo} object-contain animate-pulse`}
          />
        </div>
      )}

      {/* Loading Animation */}
      <div className="flex items-center justify-center">
        {renderLoadingAnimation()}
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h3 className={`${currentSize.text} font-medium text-gray-900 mb-1`}>
          {loadingText}
        </h3>
        {message && (
          <p className={`${size === 'sm' ? 'text-xs' : 'text-sm'} text-gray-600`}>
            {message}
          </p>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 rounded-full animate-loading-bar origin-left" />
      </div>
    </div>
  )
}

export default LoadingScreen

// Hook for easy usage with loading states
export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingMessage, setLoadingMessage] = React.useState<string>()

  const showLoading = (message?: string) => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
    setLoadingMessage(undefined)
  }

  return {
    isLoading,
    loadingMessage,
    showLoading,
    hideLoading
  }
}