import React from 'react'

export interface AvatarProps {
  initial?: string
  size?: number
  tone?: string
  imageUrl?: string
}

export function Avatar({ initial, size = 38, tone, imageUrl }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: tone || 'var(--grad-sunset)',
        color: '#fff',
        fontWeight: 700,
        fontSize: size * 0.38,
        flexShrink: 0,
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!imageUrl && initial}
    </div>
  )
}
