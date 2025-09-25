import React from 'react'
import LoadingScreen, { LoadingScreenProps } from './LoadingScreen'

export interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Color theme */
  color?: 'primary' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
  /** Whether to show text alongside spinner */
  showText?: boolean
  /** Custom text to display */
  text?: string
  /** Inline or block display */
  inline?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  showText = false,
  text = 'Loading...',
  inline = false
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6', 
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'border-primary-500',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600'
  }

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg'
  }

  const containerClasses = inline 
    ? 'inline-flex items-center gap-2'
    : 'flex items-center justify-center gap-3'

  return (
    <div className={containerClasses}>
      <div
        className={`
          ${sizeClasses[size]}
          border-2 border-gray-200 ${colorClasses[color]}
          border-t-transparent rounded-full animate-spin
        `}
      />
      {showText && (
        <span className={`${textSizeClasses[size]} text-gray-700 font-medium`}>
          {text}
        </span>
      )}
    </div>
  )
}

export default LoadingSpinner

// Button Loading Component
export interface LoadingButtonProps {
  /** Whether the button is in loading state */
  loading?: boolean
  /** Button text when not loading */
  children: React.ReactNode
  /** Loading text override */
  loadingText?: string
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes */
  className?: string
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  loadingText = 'Loading...',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1'
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 disabled:bg-primary-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500 disabled:border-primary-300 disabled:text-primary-300'
  }

  const sizeClasses = {
    xs: 'px-2 py-1 text-btn-xs',      // Extra compact
    sm: 'px-2.5 py-1.5 text-btn-xs',  // Compact small
    md: 'px-3.5 py-2 text-btn-sm',    // Compact medium  
    lg: 'px-4 py-2.5 text-btn-base'   // Compact large
  }

  const spinnerSizes = {
    xs: 'xs' as const,
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'md' as const
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading && (
        <LoadingSpinner 
          size={spinnerSizes[size]} 
          color="primary" 
          inline 
        />
      )}
      <span>{loading ? loadingText : children}</span>
    </button>
  )
}

// Page Loading Wrapper Component
export interface PageLoadingWrapperProps {
  /** Whether to show loading state */
  loading: boolean
  /** Children to render when not loading */
  children: React.ReactNode
  /** Loading screen props */
  loadingProps?: Partial<LoadingScreenProps>
}

export const PageLoadingWrapper: React.FC<PageLoadingWrapperProps> = ({
  loading,
  children,
  loadingProps = {}
}) => {
  if (loading) {
    return (
      <LoadingScreen
        variant="spinner"
        size="lg"
        showLogo={true}
        message="Please wait while we load your content..."
        {...loadingProps}
      />
    )
  }

  return <>{children}</>
}