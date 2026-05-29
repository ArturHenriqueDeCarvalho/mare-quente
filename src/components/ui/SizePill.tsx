import React from 'react'

interface SizePillProps {
  size: string
  active?: boolean
  outOfStock?: boolean
  onClick?: () => void
}

export function SizePill({ size, active, outOfStock, onClick }: SizePillProps) {
  return (
    <button
      type="button"
      onClick={!outOfStock ? onClick : undefined}
      className={`size-pill ${active ? 'size-pill-active' : ''} ${outOfStock ? 'size-pill-out' : ''}`}
      disabled={outOfStock}
    >
      {size}
    </button>
  )
}
