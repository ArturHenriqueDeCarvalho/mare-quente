'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GridIcon, TagIcon, CartIcon, GearIcon, LogoutIcon, ThemeToggle, StoreIcon, UsersIcon } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { signOut, appUser } = useAuth()

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: GridIcon },
    { label: 'Produtos', href: '/admin/produtos', icon: TagIcon },
    { label: 'Pedidos', href: '/admin/pedidos', icon: CartIcon },
    ...(appUser?.role === 'admin' ? [{ label: 'Usuários', href: '/admin/usuarios', icon: UsersIcon }] : []),
    { label: 'Configurações', href: '/admin/configuracoes', icon: GearIcon },
  ]

  return (
    <div className="row" style={{ minHeight: '100vh', background: 'var(--sand-50)' }}>
      {/* Sidebar */}
      <aside className="col" style={{ width: 260, background: 'var(--white)', borderRight: '1px solid var(--line)', padding: 'var(--sp-6) var(--sp-4)', gap: 'var(--sp-8)' }}>
        <div className="row gap-2">
          <StoreIcon size={24} color="var(--magenta)" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-lg)' }}>Maré Quente</span>
        </div>

        <nav className="col gap-2 grow">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="row gap-3" style={{ padding: '12px 16px', borderRadius: 'var(--r-md)', background: active ? 'var(--sand-100)' : 'transparent', color: active ? 'var(--magenta)' : 'var(--ink-2)', fontWeight: active ? 700 : 500, textDecoration: 'none' }}>
                <item.icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="col gap-4">
          <ThemeToggle />
          <button className="row gap-3" onClick={signOut} style={{ padding: '12px 16px', color: 'var(--danger)', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <LogoutIcon size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="col grow scrollbar" style={{ height: '100vh', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
