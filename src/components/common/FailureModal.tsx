import React from 'react'
import { cn } from '@/lib/utils'

export interface FailureModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Function to close the modal */
  onClose: () => void
  /** Failure header text */
  header: string
  /** Failure message - can be text or JSX for links */
  message: React.ReactNode
  /** Optional retry button */
  retryButton?: {
    text: string
    onClick: () => void
  }
  /** Additional CSS classes */
  className?: string
}

const FailureModal: React.FC<FailureModalProps> = ({
  isOpen,
  onClose,
  header,
  message,
  retryButton,
  className
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className={cn(
          "bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl transform transition-all duration-300 scale-100",
          className
        )}>
          {/* Error Icon */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: '#FFABAB2B' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: '#FF0000' }}>
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {header}
          </h2>

          {/* Message */}
          <div className="text-gray-600 dark:text-gray-300 text-fine mb-8">
            {message}
          </div>

          {/* Retry Button */}
          {retryButton && (
            <button
              onClick={retryButton.onClick}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
            >
              {retryButton.text}
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default FailureModal