import React from 'react'
import * as Icons from './Icons'

export type ButtonVariant = 'primary' | 'solid' | 'ghost' | 'soft' | 'text'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'block'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: keyof typeof Icons
  iconR?: keyof typeof Icons
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconR,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const IconComponent = icon ? Icons[icon] : null
  const IconRComponent = iconR ? Icons[iconR] : null

  const sizeClass = size === 'md' ? '' : `btn-${size}`
  
  return (
    <button className={`btn btn-${variant} ${sizeClass} ${className}`} {...props}>
      {IconComponent && <IconComponent size={size === 'sm' ? 16 : 18} />}
      {children}
      {IconRComponent && <IconRComponent size={size === 'sm' ? 16 : 18} />}
    </button>
  )
}
