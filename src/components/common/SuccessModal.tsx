import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import glittersGif from '@/assets/images/glitters.gif'

export interface SuccessModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Function to close the modal */
  onClose: () => void
  /** Success header text */
  header: string
  /** Success message - can be text or JSX for links */
  message: React.ReactNode
  /** Optional action button */
  actionButton?: {
    text: string
    onClick: () => void
  }
  /** Additional CSS classes */
  className?: string
}

// Confetti piece component
const ConfettiPiece: React.FC<{ delay: number; duration: number; color: string }> = ({ 
  delay, 
  duration, 
  color 
}) => (
  <div
    className={`absolute w-2 h-2 ${color} rounded-sm opacity-70`}
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animation: 'confetti-fall linear infinite'
    }}
  />
)

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  header,
  message,
  actionButton,
  className
}) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      // Stop confetti after 3 seconds
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Generate confetti pieces
  const confettiColors = [
    'bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 
    'bg-purple-400', 'bg-red-400', 'bg-indigo-400', 'bg-orange-400'
  ]
  
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
  }))

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with Glitters Background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Glitters Background */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url(${glittersGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
            {confettiPieces.map((piece) => (
              <ConfettiPiece
                key={piece.id}
                delay={piece.delay}
                duration={piece.duration}
                color={piece.color}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <div 
          className={cn(
            "rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl transform transition-all duration-300 scale-100 relative z-20 overflow-hidden",
            className
          )}
          style={{
            backgroundImage: `url(${glittersGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Modal Background Overlay for better content readability */}
          <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/80 rounded-2xl"></div>
          
          {/* Modal Content */}
          <div className="relative z-10">
          {/* Success Icon */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: '#B3FFBA2B' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: '#00B609' }}>
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
                  d="M5 13l4 4L19 7" 
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

          {/* Action Button */}
          {actionButton && (
            <button
              onClick={actionButton.onClick}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
            >
              {actionButton.text}
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
      </div>

      {/* Confetti CSS Animation */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default SuccessModal