'use client'

import React, { useEffect, useState } from 'react'
import { Button, Badge } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { AppUser } from '@/types'

export default function AdminUsers() {
  const { appUser } = useAuth()
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)

  async function loadUsers() {
    setLoading(true)
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    if (data) setUsers(data as AppUser[])
    if (error) console.error(error)
    setLoading(false)
  }

  useEffect(() => {
    if (appUser?.role === 'admin') {
      loadUsers()
    } else {
      setLoading(false)
    }
  }, [appUser])

  async function updateRole(id: string, newRole: string) {
    const { error } = await supabase.from('users').update({ role: newRole }).eq('id', id)
    if (!error) loadUsers()
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active'
    const { error } = await supabase.from('users').update({ status: newStatus }).eq('id', id)
    if (!error) loadUsers()
  }

  if (appUser?.role !== 'admin') {
    return <div style={{ padding: 32 }}>Você não tem permissão para acessar esta página.</div>
  }

  return (
    <div className="col gap-6" style={{ padding: 'var(--sp-8)' }}>
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div className="col gap-1">
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Usuários</h1>
          <p className="muted">Gerencie permissões e acessos</p>
        </div>
      </header>

      <div className="card card-p-lg col gap-4">
        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome / Email</th>
                <th>Papel</th>
                <th>Status</th>
                <th>Cadastrado em</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="col">
                      <span style={{ fontWeight: 600 }}>{u.name || 'Sem nome'}</span>
                      <span className="muted-3" style={{ fontSize: 13 }}>{u.email}</span>
                    </div>
                  </td>
                  <td>
                    <select
                      className="input"
                      style={{ padding: '4px 8px', height: 'auto' }}
                      value={u.role}
                      onChange={e => updateRole(u.id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="seller">Vendedor</option>
                      <option value="customer">Cliente</option>
                    </select>
                  </td>
                  <td>
                    <Badge tone={u.status === 'active' ? 'ok' : 'dang'}>
                      {u.status === 'active' ? 'Ativo' : 'Bloqueado'}
                    </Badge>
                  </td>
                  <td>
                    <span className="muted-3" style={{ fontSize: 13 }}>
                      {new Date(u.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Button 
                      variant="ghost" 
                      onClick={() => toggleStatus(u.id, u.status)}
                      style={{ color: u.status === 'active' ? 'var(--danger)' : 'var(--success)' }}
                    >
                      {u.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                    </Button>
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
