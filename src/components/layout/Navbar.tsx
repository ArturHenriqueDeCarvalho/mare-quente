'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { SearchIcon, CartIcon, LogoutIcon, ThemeToggle, StoreIcon } from '@/components/ui'
import { useCart } from '@/contexts/CartContext'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { cartCount } = useCart()

  const currentFilter = searchParams.get('filter') || 'tudo'
  const isCatalog = pathname === '/'

  const filters = [
    { id: 'tudo', label: 'Tudo' },
    { id: 'conjunto', label: 'Conjuntos' },
    { id: 'top', label: 'Tops' },
    { id: 'bottom', label: 'Calcinhas' }
  ]

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--glass)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 28 }}>
        <Link href="/?filter=tudo" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <StoreIcon size={32} color="var(--magenta)" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--ink)' }}>Maré Quente</span>
        </Link>
        <nav className="row" style={{ gap: 6, marginLeft: 8 }}>
          {filters.map(f => (
            <Link key={f.id} href={`/?filter=${f.id}`} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15, padding: '8px 12px', borderRadius: 'var(--r-pill)',
              color: isCatalog && currentFilter === f.id ? 'var(--magenta)' : 'var(--ink-2)',
              textDecoration: 'none'
            }}>
              {f.label}
            </Link>
          ))}
        </nav>
        <div className="grow" />
        <div className="input-icon" style={{ width: 220 }}>
          <SearchIcon size={18} />
          <input className="input" placeholder="Buscar peças..." style={{ height: 40, borderRadius: 'var(--r-pill)' }} />
        </div>
        <ThemeToggle />
        <button className="btn btn-icon btn-soft" onClick={() => router.push('/carrinho')} style={{ position: 'relative' }}>
          <CartIcon size={20} />
          {cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--magenta)', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>}
        </button>
        <button className="btn btn-icon btn-soft" title="Sair da loja"><LogoutIcon size={18} /></button>
      </div>
    </header>
  )
}
