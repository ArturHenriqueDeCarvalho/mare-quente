'use client'

import React from 'react'
import { Badge, ProductCard } from '@/components/ui'
import { conjuntos, tops, bottoms } from '@/lib/data'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filter = searchParams.get('filter') || 'tudo'

  const list = filter === 'tudo' ? [...conjuntos, ...tops, ...bottoms]
    : filter === 'conjunto' ? conjuntos : filter === 'top' ? tops : bottoms

  const titles: Record<string, string> = { tudo: 'Coleção Verão 26', conjunto: 'Conjuntos', top: 'Partes de cima', bottom: 'Partes de baixo' }
  const filtersList = [['tudo', 'Tudo'], ['conjunto', 'Conjuntos'], ['top', 'Tops'], ['bottom', 'Calcinhas']]

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px 64px' }}>
      {/* Hero */}
      <div style={{ background: 'var(--grad-sunset)', borderRadius: 'var(--r-xl)', padding: '44px 48px', color: '#fff', margin: '24px 0 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,.13)', top: -100, right: -40 }} />
        <Badge tone="soft">☀︎ Nova coleção</Badge>
        <h1 style={{ color: '#fff', fontSize: 44, maxWidth: 560, margin: '14px 0 10px', fontFamily: 'var(--font-display)' }}>Monte seu biquíni do seu jeito</h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,.92)', maxWidth: 480 }}>Escolha o top e a calcinha em tamanhos diferentes. Ou leve o conjunto completo.</p>
      </div>
      
      {/* Filtros */}
      <div className="between row" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 26, fontFamily: 'var(--font-display)' }}>{titles[filter]}</h2>
        <div className="row" style={{ gap: 8 }}>
          {filtersList.map(([f, l]) => (
            <button key={f} onClick={() => router.push(`/?filter=${f}`)} className="size-pill" style={{ height: 38, borderRadius: 'var(--r-pill)', padding: '0 16px', border: 'none', ...(filter === f ? { background: 'var(--magenta)', color: '#fff' } : {}) }}>{l}</button>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {list.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
