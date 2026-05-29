import React from 'react'

export type BadgeTone = 'mag' | 'ok' | 'warn' | 'dang' | 'info' | 'soft'

export interface BadgeProps {
  tone?: BadgeTone
  children: React.ReactNode
  className?: string
}

export function Badge({ tone = 'soft', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${tone} ${className}`}>
      {children}
    </span>
  )
}
