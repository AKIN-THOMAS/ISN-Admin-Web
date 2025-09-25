import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Whether button is disabled */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
  /** Button content */
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50'
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500 dark:hover:bg-primary-950',
    ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500 dark:hover:bg-primary-950',
    link: 'text-primary-500 underline-offset-4 hover:underline focus:ring-primary-500'
  }

  const sizeClasses = {
    xs: 'h-7 px-2 text-btn-xs gap-1',      // Extra compact
    sm: 'h-8 px-2.5 text-btn-xs gap-1.5',  // Compact small
    md: 'h-9 px-3.5 text-btn-sm gap-1.5',  // Compact medium  
    lg: 'h-10 px-4 text-btn-base gap-2'    // Compact large
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

// Icon Button variant for compact icon-only buttons
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  /** Icon element or string */
  icon: React.ReactNode
  /** Accessibility label */
  'aria-label': string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  className,
  ...props
}) => {
  const iconSizeClasses = {
    xs: 'w-6 h-6 p-1',      // 24px square
    sm: 'w-7 h-7 p-1.5',    // 28px square
    md: 'w-8 h-8 p-1.5',    // 32px square
    lg: 'w-9 h-9 p-2'       // 36px square
  }

  return (
    <Button
      size={size}
      className={cn(
        'rounded-md',
        iconSizeClasses[size],
        className
      )}
      {...props}
    >
      {icon}
    </Button>
  )
}

// Button Group for organizing related actions
export interface ButtonGroupProps {
  /** Button elements */
  children: React.ReactNode
  /** Size for all buttons in group */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  size = 'md',
  className
}) => {
  return (
    <div
      className={cn(
        'inline-flex rounded-md shadow-sm',
        '[&>button]:rounded-none',
        '[&>button:first-child]:rounded-l-md',
        '[&>button:last-child]:rounded-r-md',
        '[&>button:not(:first-child)]:border-l-0',
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { size } as any)
          : child
      )}
    </div>
  )
}