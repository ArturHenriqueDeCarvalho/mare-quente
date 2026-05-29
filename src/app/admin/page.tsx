import React from 'react'
import { ChartIcon, CartIcon, TagIcon, UsersIcon } from '@/components/ui'

export default function AdminDashboard() {
  return (
    <div className="col gap-6" style={{ padding: 'var(--sp-8)' }}>
      <header>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>Dashboard</h1>
        <p className="muted">Visão geral da sua loja</p>
      </header>

      <div className="row gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Vendas (Mês)', value: 'R$ 14.250,00', icon: ChartIcon, tone: 'ok' },
          { label: 'Pedidos', value: '42', icon: CartIcon, tone: 'info' },
          { label: 'Produtos', value: '18', icon: TagIcon, tone: 'mag' },
          { label: 'Clientes', value: '105', icon: UsersIcon, tone: 'warn' },
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
            {[1, 2, 3].map(i => (
              <tr key={i}>
                <td>#100{i}</td>
                <td>Cliente {i}</td>
                <td>Hoje, 14:{i}0</td>
                <td>R$ 149,90</td>
                <td><span className="badge badge-warn">Pendente</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
