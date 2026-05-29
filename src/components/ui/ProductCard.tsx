'use client'

import React from 'react'
import { ProductSwatch } from './ProductSwatch'
import { Badge } from './Badge'
import { money, totalStock, TYPE_LABEL } from '@/lib/data'
import { useRouter } from 'next/navigation'

export function ProductCard({ p }: { p: any }) {
  const router = useRouter()
  const stock = totalStock(p)

  return (
    <button 
      onClick={() => router.push(`/produto/${p.id}`)} 
      style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 12, textAlign: 'left', cursor: 'pointer', boxShadow: 'var(--sh-sm)', transition: 'transform .15s, box-shadow .2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--sh-sm)'; }}
    >
      <ProductSwatch grad={p.grad} type={p.type} h={210} radius="var(--r-md)" />
      <div style={{ position: 'relative', marginTop: -24, marginLeft: 8 }}>
        <Badge tone="mag">{TYPE_LABEL[p.type]}</Badge>
      </div>
      <div style={{ padding: '16px 4px 4px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="between row">
          <span className="muted-3" style={{ fontSize: 12 }}>{p.collection}</span>
          {stock === 0 ? <Badge tone="dang">Esgotado</Badge> : stock < 8 ? <Badge tone="warn">Últimas</Badge> : null}
        </div>
        <h3 style={{ fontSize: 17, margin: '4px 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{p.name}</h3>
        <div className="between row" style={{ marginTop: 'auto' }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--magenta)' }}>{money(p.price)}</span>
          <span className="muted-3" style={{ fontSize: 12 }}>{p.print}</span>
        </div>
      </div>
    </button>
  )
}
