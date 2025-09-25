import React from 'react'
import { cn } from '@/lib/utils'

export interface FinePrintProps {
  /** The text content to display */
  children: React.ReactNode
  /** Size variant for fine-print text */
  size?: 'xs' | 'sm' | 'base'
  /** Color variant */
  variant?: 'default' | 'muted' | 'subtle' | 'primary' | 'warning' | 'error'
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify'
  /** Whether text should be italic */
  italic?: boolean
  /** Whether text should be uppercase */
  uppercase?: boolean
  /** Additional CSS classes */
  className?: string
  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'small'
}

const FinePrint: React.FC<FinePrintProps> = ({
  children,
  size = 'base',
  variant = 'default',
  align = 'left',
  italic = false,
  uppercase = false,
  className,
  as: Component = 'p'
}) => {
  const sizeClasses = {
    xs: 'text-fine-xs',    // 12px
    sm: 'text-fine-sm',    // 13px  
    base: 'text-fine'      // 14.2px
  }

  const variantClasses = {
    default: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    subtle: 'text-gray-400 dark:text-gray-500',
    primary: 'text-primary-600 dark:text-primary-400',
    warning: 'text-warning-600 dark:text-warning-400',
    error: 'text-error-600 dark:text-error-400'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const classes = cn(
    // Base fine-print styling
    'font-normal tracking-wide leading-tight',
    // Size
    sizeClasses[size],
    // Color variant
    variantClasses[variant],
    // Alignment
    alignClasses[align],
    // Modifiers
    italic && 'italic',
    uppercase && 'uppercase',
    // Custom classes
    className
  )

  return (
    <Component className={classes}>
      {children}
    </Component>
  )
}

export default FinePrint

// Specialized fine-print components for common use cases
export const LegalText: React.FC<Omit<FinePrintProps, 'variant' | 'size'>> = (props) => (
  <FinePrint variant="muted" size="xs" {...props} />
)

export const DisclaimerText: React.FC<Omit<FinePrintProps, 'variant' | 'italic'>> = (props) => (
  <FinePrint variant="subtle" italic {...props} />
)

export const CopyrightText: React.FC<Omit<FinePrintProps, 'variant' | 'size' | 'align'>> = (props) => (
  <FinePrint variant="muted" size="xs" align="center" {...props} />
)

export const TimestampText: React.FC<Omit<FinePrintProps, 'variant'>> = (props) => (
  <FinePrint variant="subtle" {...props} />
)

export const MetadataText: React.FC<Omit<FinePrintProps, 'variant'>> = (props) => (
  <FinePrint variant="muted" {...props} />
)