import React from 'react'
import * as Icons from './Icons'

export interface ProductSwatchProps {
  grad?: string
  type?: 'top' | 'bottom' | 'set' | string
  radius?: string
  h?: number | string
  label?: string
  imageUrl?: string
}

export function ProductSwatch({ grad = 'var(--grad-sunset)', type, radius = 'var(--r-md)', h = 200, label, imageUrl }: ProductSwatchProps) {
  const IconComponent = type === 'top' ? Icons.ShirtIcon : type === 'bottom' ? Icons.TagIcon : Icons.HeartIcon

  return (
    <div
      style={{
        background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : grad,
        borderRadius: radius,
        height: h,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!imageUrl && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,.35), transparent 60%)' }} />
          <div style={{ color: 'rgba(255,255,255,.92)' }}>
            <IconComponent size={typeof h === 'number' ? Math.min(h * 0.32, 64) : 64} />
          </div>
        </>
      )}
      {label && <span style={{ position: 'absolute', top: 10, left: 10 }} className="badge badge-mag">{label}</span>}
    </div>
  )
}
