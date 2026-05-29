import React from 'react'
import { Button, ProductSwatch } from '@/components/ui'

export default function AdminProducts() {
  return (
    <div className="col gap-6" style={{ padding: 'var(--sp-8)' }}>
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div className="col gap-1">
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Produtos</h1>
          <p className="muted">Gerencie seu catálogo</p>
        </div>
        <Button variant="primary" icon="PlusIcon">Novo Produto</Button>
      </header>

      <div className="card card-p-lg col gap-4">
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(i => (
              <tr key={i}>
                <td>
                  <div className="row gap-3">
                    <ProductSwatch type="set" h={40} radius="var(--r-sm)" />
                    <span style={{ fontWeight: 600 }}>Conjunto Sol {i}</span>
                  </div>
                </td>
                <td>Conjunto</td>
                <td>R$ 149,90</td>
                <td><span className="badge badge-ok">Publicado</span></td>
                <td>
                  <Button variant="ghost" size="icon" icon="EditIcon" />
                  <Button variant="ghost" size="icon" icon="TrashIcon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
