'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CartIcon, TrashIcon, Button, Badge } from '@/components/ui'
import { useCart } from '@/contexts/CartContext'
import { money, TYPE_LABEL } from '@/lib/data'

export default function CartPage() {
  const router = useRouter()
  const { items, totalPrice, updateQuantity, removeItem } = useCart()
  
  if (!items.length) return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '80px 28px', textAlign: 'center' }}>
      <div style={{ opacity: .4 }}><CartIcon size={64} /></div>
      <h2 style={{ marginTop: 16 }}>Sua sacola está vazia</h2>
      <p className="muted">Que tal montar um conjunto?</p>
      <Button variant="primary" onClick={() => router.push('/?filter=tudo')} style={{ marginTop: 16 }}>Ver coleção</Button>
    </div>
  )

  const subtotal = totalPrice
  const discountPix = subtotal * 0.1
  const total = subtotal * 0.9

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 28px 64px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'start' }}>
      <div>
        <h1 style={{ fontSize: 30, marginBottom: 18, fontFamily: 'var(--font-display)' }}>Sua sacola</h1>
        <div className="col" style={{ gap: 12 }}>
          {items.map((it, i) => (
            <div key={i} className="card" style={{ padding: 12, display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: 'var(--r-md)', background: it.product.grad, flexShrink: 0 }} />
              <div className="grow">
                <div className="between row">
                  <h3 style={{ fontSize: 16, fontFamily: 'var(--font-display)', margin: 0 }}>{it.product.name}</h3>
                  <button onClick={() => removeItem(it.product.id, it.size)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)' }}>
                    <TrashIcon size={18} />
                  </button>
                </div>
                <div className="row" style={{ gap: 8, margin: '4px 0 8px' }}>
                  <Badge tone="soft">{TYPE_LABEL[it.product.type]}</Badge>
                  <span className="muted" style={{ fontSize: 13 }}>Tam. {it.size}</span>
                </div>
                <div className="between row">
                  <div className="row" style={{ gap: 0, border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
                    <button onClick={() => updateQuantity(it.product.id, it.size, Math.max(1, it.qty - 1))} style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink-2)' }}>−</button>
                    <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{it.qty}</span>
                    <button onClick={() => updateQuantity(it.product.id, it.size, it.qty + 1)} style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink-2)' }}>+</button>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--magenta)' }}>{money(it.product.price * it.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card card-pad" style={{ position: 'sticky', top: 90 }}>
        <h3 style={{ fontSize: 18, marginBottom: 14, fontFamily: 'var(--font-display)' }}>Resumo</h3>
        <div className="col" style={{ gap: 10, fontSize: 14 }}>
          <div className="between row"><span className="muted">Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="between row"><span className="muted">Frete</span><span style={{ color: 'var(--success)' }}>Grátis</span></div>
          <div className="between row"><span className="muted">Desconto Pix (10%)</span><span>−{money(discountPix)}</span></div>
          <div style={{ height: 1, background: 'var(--line)', margin: '6px 0' }} />
          <div className="between row" style={{ fontSize: 18, fontWeight: 800 }}><span>Total</span><span style={{ color: 'var(--magenta)' }}>{money(total)}</span></div>
        </div>
        <Button variant="primary" className="btn-block" onClick={() => router.push('/checkout')} style={{ marginTop: 18 }}>
          Ir para o pagamento
        </Button>
      </div>
    </div>
  )
}
