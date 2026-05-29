'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLIcon, Badge, Button, ProductSwatch, SparkIcon, TruckIcon, PixIcon, CheckIcon, HeartIcon } from '@/components/ui'
import { byId, money, TYPE_LABEL } from '@/lib/data'
import { useCart } from '@/contexts/CartContext'

function SizeRow({ label, sizes, value, onChange }: any) {
  return (
    <div>
      <div className="between row" style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 700 }}>{label}</span>
        <a href="#" style={{ fontSize: 13, color: 'var(--magenta)', textDecoration: 'none', fontWeight: 600 }}>Tabela de medidas</a>
      </div>
      <div className="row wrap" style={{ gap: 8 }}>
        {sizes.map((s: any) => (
          <button 
            key={s.size} 
            disabled={s.stock === 0} 
            onClick={() => onChange(s.size)}
            className={`size-pill ${value === s.size ? 'active' : ''} ${s.stock === 0 ? 'out' : ''}`}
          >
            {s.size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  
  const id = params.id as string
  const p = byId[id]
  
  const isConj = p?.type === 'conjunto'
  const top = isConj ? byId[p.topRef] : null
  const bottom = isConj ? byId[p.bottomRef] : null

  const [topSize, setTopSize] = useState<string | null>(null)
  const [botSize, setBotSize] = useState<string | null>(null)
  const [single, setSingle] = useState<string | null>(null)

  if (!p) return <div style={{ padding: '64px', textAlign: 'center' }}>Produto não encontrado</div>

  const ready = isConj ? (topSize && botSize) : single

  function add() {
    if (!ready) return
    const sizeLabel = isConj ? `${topSize} / ${botSize}` : single
    addItem({ product: p, qty: 1, size: sizeLabel! })
    router.push('/carrinho')
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 28px 64px' }}>
      <button className="btn btn-text" onClick={() => router.push('/?filter=tudo')} style={{ paddingLeft: 0, marginBottom: 16 }}>
        <ArrowLIcon size={18} /> Voltar à loja
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <ProductSwatch grad={p.grad} type={p.type} h={520} radius="var(--r-xl)" />
        
        <div>
          <span className="muted-3" style={{ fontSize: 13 }}>{p.collection} · {p.print}</span>
          <h1 style={{ fontSize: 38, margin: '6px 0', fontFamily: 'var(--font-display)' }}>{p.name}</h1>
          <div className="row" style={{ gap: 10, marginBottom: 20 }}>
            <span style={{ fontWeight: 800, fontSize: 30, color: 'var(--magenta)' }}>{money(p.price)}</span>
            <Badge tone="mag">{TYPE_LABEL[p.type]}</Badge>
          </div>

          {isConj ? (
            <div className="col" style={{ gap: 22 }}>
              <div className="card card-pad" style={{ background: 'var(--sand-50)', padding: 18 }}>
                <p className="row" style={{ gap: 8, fontWeight: 600, margin: '0 0 4px' }}>
                  <SparkIcon size={18} color="var(--magenta)" /> Tamanhos independentes
                </p>
                <p className="muted" style={{ fontSize: 14, margin: 0 }}>
                  Escolha o tamanho do top e da calcinha separadamente — eles não precisam ser iguais.
                </p>
              </div>
              <SizeRow label={`Tamanho do top — ${top.name}`} sizes={top.sizes} value={topSize} onChange={setTopSize} />
              <SizeRow label={`Tamanho da calcinha — ${bottom.name}`} sizes={bottom.sizes} value={botSize} onChange={setBotSize} />
            </div>
          ) : (
            <SizeRow label="Escolha o tamanho" sizes={p.sizes} value={single} onChange={setSingle} />
          )}

          <div className="row" style={{ gap: 12, marginTop: 28 }}>
            <Button variant="primary" size="lg" className="grow" icon="cart" disabled={!ready} onClick={add}>
              {ready ? 'Adicionar à sacola' : 'Selecione o tamanho'}
            </Button>
            <Button variant="ghost" size="lg" className="btn-icon" style={{ width: 56, height: 56 }}>
              <HeartIcon size={22} />
            </Button>
          </div>
          <div className="row wrap" style={{ gap: 18, marginTop: 22, color: 'var(--ink-2)', fontSize: 13 }}>
            <span className="row" style={{ gap: 6 }}><TruckIcon size={18} /> Envio em 24h</span>
            <span className="row" style={{ gap: 6 }}><PixIcon size={16} /> 10% off no Pix</span>
            <span className="row" style={{ gap: 6 }}><CheckIcon size={16} /> Troca grátis</span>
          </div>
        </div>
      </div>
    </div>
  )
}
