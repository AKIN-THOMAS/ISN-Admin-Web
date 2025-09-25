import { useEffect, useState } from 'react'
import logo from '@/assets/images/isn_logo-512.png'

export interface SplashScreenProps {
  onLoadingComplete: () => void
  duration?: number
}

const SplashScreen = ({ onLoadingComplete, duration = 3000 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [animationStage, setAnimationStage] = useState<'enter' | 'pulse' | 'exit'>('enter')

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStage('pulse')
    }, 500)

    const timer2 = setTimeout(() => {
      setAnimationStage('exit')
    }, duration - 800)

    const timer3 = setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete()
    }, duration)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [duration, onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Background gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 opacity-60" />
      
      {/* Main content container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Logo container with animations */}
        <div
          className={`
            relative transition-all duration-1000 ease-out
            ${animationStage === 'enter' 
              ? 'opacity-0 scale-75 translate-y-8' 
              : animationStage === 'pulse'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-110 translate-y-4'
            }
          `}
        >
          {/* Outer glow effect */}
          <div 
            className={`
              absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl
              ${animationStage === 'pulse' ? 'animate-pulse' : ''}
            `}
            style={{
              transform: 'scale(1.5)',
              animation: animationStage === 'pulse' ? 'glow 2s ease-in-out infinite alternate' : 'none'
            }}
          />
          
          {/* Logo image */}
          <div className="relative z-10">
            <img
              src={logo}
              alt="ISN Logo"
              className={`
                w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain
                filter drop-shadow-lg
                ${animationStage === 'pulse' ? 'animate-bounce-gentle' : ''}
              `}
              style={{
                animationDuration: animationStage === 'pulse' ? '3s' : 'none'
              }}
            />
          </div>
          
          {/* Rotating ring around logo */}
          <div 
            className={`
              absolute inset-0 border-2 border-transparent border-t-blue-500 border-r-purple-500 
              rounded-full animate-spin
              ${animationStage === 'pulse' ? 'opacity-40' : 'opacity-0'}
            `}
            style={{
              transform: 'scale(1.2)',
              animationDuration: '3s'
            }}
          />
        </div>

        {/* Company name with typing animation */}
        <div
          className={`
            mt-8 transition-all duration-1000 delay-500 ease-out
            ${animationStage === 'enter' 
              ? 'opacity-0 translate-y-4' 
              : animationStage === 'pulse'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
            }
          `}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ISN Admin
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center mt-2 font-medium">
            Enterprise Management Platform
          </p>
        </div>

        {/* Loading indicator */}
        <div
          className={`
            mt-12 transition-all duration-700 delay-1000
            ${animationStage === 'enter' 
              ? 'opacity-0 scale-95' 
              : animationStage === 'pulse'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
            }
          `}
        >
          {/* Progress bar */}
          <div className="w-48 md:w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left animate-loading-bar"
              style={{
                animation: 'loadingBar 2.5s ease-out forwards'
              }}
            />
          </div>
          
          {/* Loading dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles for extra visual appeal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes glow {
          0% { opacity: 0.2; transform: scale(1.5); }
          100% { opacity: 0.4; transform: scale(1.8); }
        }
        
        @keyframes loadingBar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

export default SplashScreen