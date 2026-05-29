'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLIcon, Button, Field, Input, CheckIcon, PixIcon, TagIcon } from '@/components/ui'
import { useCart } from '@/contexts/CartContext'
import { money } from '@/lib/data'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [pay, setPay] = useState('pix')
  const [loading, setLoading] = useState(false)

  const subtotal = totalPrice
  const total = pay === 'pix' ? subtotal * 0.9 : subtotal

  const methods = [
    ['pix', 'Pix', PixIcon, '10% de desconto · aprovação na hora'], 
    ['card', 'Cartão de crédito', TagIcon, 'Até 6x sem juros'], 
    ['boleto', 'Boleto', TagIcon, 'Vence em 3 dias']
  ] as const

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total })
      })
      const data = await res.json()

      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert('Erro ao gerar pagamento. Configure o Access Token do Mercado Pago em .env.local')
        setLoading(false)
      }
    } catch (err) {
      alert('Erro na comunicação com a API.')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 28px 64px' }}>
      <button className="btn btn-text" onClick={() => router.push('/carrinho')} style={{ paddingLeft: 0, marginBottom: 12 }}>
        <ArrowLIcon size={18} /> Voltar à sacola
      </button>
      
      <form onSubmit={handleCheckout} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'start' }}>
        <div className="col" style={{ gap: 22 }}>
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 14, fontFamily: 'var(--font-display)' }}>Dados de entrega</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Nome completo"><input required className="input" defaultValue="Larissa Mendes" /></Field>
              <Field label="CPF"><input required className="input" placeholder="000.000.000-00" /></Field>
              <Field label="CEP"><input required className="input" placeholder="00000-000" /></Field>
              <Field label="Telefone"><input required className="input" placeholder="(00) 00000-0000" /></Field>
              <div style={{ gridColumn: '1 / -1' }}><Field label="Endereço"><input required className="input" placeholder="Rua, número, bairro, cidade" /></Field></div>
            </div>
          </div>
          
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 6, fontFamily: 'var(--font-display)' }}>Pagamento</h2>
            <p className="muted row" style={{ fontSize: 13, marginTop: 0, marginBottom: 14 }}>
              <CheckIcon size={15} color="var(--success)" /> Processado com segurança via Mercado Pago
            </p>
            
            <div className="col" style={{ gap: 10 }}>
              {methods.map(([id, label, Ico, desc]) => (
                <button type="button" key={id} onClick={() => setPay(id)} style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 'var(--r-md)', cursor: 'pointer', background: 'var(--white)', border: `1.5px solid ${pay === id ? 'var(--magenta)' : 'var(--line-2)'}`, boxShadow: pay === id ? '0 0 0 4px rgba(196,44,110,.10)' : 'none' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${pay === id ? 'var(--magenta)' : 'var(--line-2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {pay === id && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--magenta)' }} />}
                  </span>
                  <Ico size={22} color="var(--ink-2)" />
                  <span className="grow"><span style={{ fontWeight: 700, display: 'block' }}>{label}</span><span className="muted-3" style={{ fontSize: 12 }}>{desc}</span></span>
                </button>
              ))}
            </div>

            {pay === 'pix' && (
              <div className="card" style={{ marginTop: 14, padding: 18, display: 'flex', gap: 16, alignItems: 'center', background: 'var(--sand-50)' }}>
                <div style={{ width: 92, height: 92, borderRadius: 'var(--r-md)', background: 'repeating-conic-gradient(var(--ink) 0% 25%, #fff 0% 50%) 0/16px 16px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, margin: 0 }}>Pague com QR Code</p>
                  <p className="muted" style={{ fontSize: 13, margin: '4px 0 0' }}>O Mercado Pago gera o código ao confirmar. Aprovação imediata.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card card-pad" style={{ position: 'sticky', top: 90 }}>
          <h3 style={{ fontSize: 18, marginBottom: 14, fontFamily: 'var(--font-display)' }}>Seu pedido</h3>
          <div className="col" style={{ gap: 12, marginBottom: 14 }}>
            {items.map((it, i) => (
              <div key={i} className="row" style={{ gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: it.product.grad, flexShrink: 0 }} />
                <div className="grow">
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{it.product.name}</div>
                  <div className="muted-3" style={{ fontSize: 12 }}>{it.qty}× · Tam. {it.size}</div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{money(it.product.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '6px 0 12px' }} />
          <div className="between row" style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
            <span>Total</span><span style={{ color: 'var(--magenta)' }}>{money(total)}</span>
          </div>
          <Button variant="primary" className="btn-block" icon="check" disabled={loading} onClick={() => {}}>
            {loading ? 'Redirecionando...' : 'Confirmar e pagar'}
          </Button>
          <p className="muted-3" style={{ fontSize: 11, textAlign: 'center', marginTop: 10 }}>
            Ao confirmar você concorda com os termos da Maré Quente.
          </p>
        </div>
      </form>
    </div>
  )
}
