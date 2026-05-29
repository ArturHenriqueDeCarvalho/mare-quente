'use client'

import React, { useEffect, useState } from 'react'
import { ChartIcon, CartIcon, TagIcon, UsersIcon, Badge } from '@/components/ui'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, customers: 0 })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)
      
      // Fetch products count
      const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
      
      // Fetch users count
      const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true })

      // Fetch orders count & total
      const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
      
      const ordersCount = orders?.length || 0
      const revenue = orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0

      setStats({
        revenue,
        orders: ordersCount,
        products: productsCount || 0,
        customers: usersCount || 0
      })

      setRecentOrders(orders?.slice(0, 5) || [])
      setLoading(false)
    }
    
    loadDashboard()
  }, [])

  return (
    <div className="col gap-6" style={{ padding: 'var(--sp-8)' }}>
      <header>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>Dashboard</h1>
        <p className="muted">Visão geral da sua loja</p>
      </header>

      <div className="row gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Vendas', value: `R$ ${stats.revenue.toFixed(2).replace('.', ',')}`, icon: ChartIcon, tone: 'ok' },
          { label: 'Pedidos', value: loading ? '...' : stats.orders, icon: CartIcon, tone: 'info' },
          { label: 'Produtos', value: loading ? '...' : stats.products, icon: TagIcon, tone: 'mag' },
          { label: 'Clientes', value: loading ? '...' : stats.customers, icon: UsersIcon, tone: 'warn' },
        ].map((k, i) => (
          <div key={i} className="card card-p col gap-3">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="muted font-display" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{k.label}</span>
              <div className={`badge badge-${k.tone}`} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <k.icon size={16} />
              </div>
            </div>
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{k.value}</span>
          </div>
        ))}
      </div>

      <div className="card card-p-lg col gap-4">
        <h2 style={{ fontSize: 'var(--text-lg)' }}>Últimos Pedidos</h2>
        {loading ? <p>Carregando...</p> : recentOrders.length === 0 ? <p className="muted">Nenhum pedido recente.</p> : (
          <table className="table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id}>
                  <td>
                    <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{o.id.split('-')[0]}</span>
                  </td>
                  <td>{o.customer_name}</td>
                  <td>{new Date(o.created_at).toLocaleDateString('pt-BR')}</td>
                  <td>R$ {Number(o.total).toFixed(2).replace('.', ',')}</td>
                  <td>
                    <Badge tone={o.status === 'pending' ? 'warn' : o.status === 'paid' ? 'ok' : 'info'}>
                      {o.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
