'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle, Button, Field, Badge, Avatar } from '@/components/ui'
import { CheckIcon, EyeIcon, EyeOffIcon, GoogleIcon } from '@/components/ui/Icons'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

const DEMO_ACCOUNTS = [
  { role: 'admin', label: 'Administrador', name: 'Marina Prado', email: 'marina@marequente.com.br', initial: 'MP' },
  { role: 'vendedor', label: 'Vendedor', name: 'Tatiane Reis', email: 'tati@marequente.com.br', initial: 'TR' },
  { role: 'customer', label: 'Cliente', name: 'Larissa Mendes', email: 'lari.mendes@gmail.com', initial: 'LM' },
]

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { user, appUser } = useAuth()
  
  // Se já estiver logado, redireciona
  React.useEffect(() => {
    if (user && appUser) {
      if (appUser.role === 'admin' || appUser.role === 'seller') {
        router.push('/admin/produtos')
      } else {
        router.push('/')
      }
    }
  }, [user, appUser, router])

  const isSignup = mode === 'signup'

  const toggleMode = () => {
    setMode(isSignup ? 'login' : 'signup')
    setError('')
  }

  const handleAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role: 'customer'
            }
          }
        })
        if (signUpError) throw signUpError
        // In a real app, you might want to show a success message or login immediately
        // For simplicity, we'll try to log them in directly
      }
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'senha123'
      })
      
      if (signInError) throw signInError
      
      // router.push() will be handled by the useEffect above once user state updates
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('senha123')
    
    setLoading(true)
    setError('')
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: 'senha123'
      })
      if (signInError) throw signInError
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar com conta demo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.05fr 1fr', background: 'var(--sand-50)' }} className="grid-split">
      {/* Lado visual */}
      <div className="mobile-hidden" style={{ background: 'var(--grad-glow)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 56px', color: '#fff' }}>
        <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'rgba(255,255,255,.12)', top: -160, right: -120 }} />
        <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,.10)', bottom: -120, left: -80 }} />
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32 }}>Maré Quente</div>
        <div style={{ position: 'relative' }}>
          <h1 style={{ color: '#fff', fontSize: 46, lineHeight: 1.05, maxWidth: 460 }}>O verão inteiro num só painel.</h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,.9)', maxWidth: 420, marginTop: 14 }}>
            Controle de estoque por peça, vendas e clientes — tops e calcinhas vendidos juntos ou separados, em qualquer tamanho.
          </p>
        </div>
        <div className="row" style={{ gap: 18, color: 'rgba(255,255,255,.85)', fontSize: 13 }}>
          <span className="row" style={{ gap: 6 }}><CheckIcon size={16} /> Estoque por tamanho</span>
          <span className="row" style={{ gap: 6 }}><CheckIcon size={16} /> Mercado Pago</span>
          <span className="row" style={{ gap: 6 }}><CheckIcon size={16} /> Multiusuário</span>
        </div>
      </div>

      {/* Lado formulário */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 24, right: 24 }}><ThemeToggle /></div>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontSize: 30 }}>{isSignup ? 'Criar conta' : 'Bem-vinda de volta'}</h2>
          <p className="muted" style={{ marginTop: 6, marginBottom: 26 }}>
            {isSignup ? 'Preencha seus dados para começar.' : 'Acesse sua conta Maré Quente.'}
          </p>

          <Button variant="ghost" className="btn-block" disabled={loading} style={{ borderRadius: 'var(--r-md)', padding: '13px', justifyContent: 'center' }}>
            <GoogleIcon size={20} /> Continuar com o Google
          </Button>

          <div className="row" style={{ gap: 12, margin: '22px 0' }}>
            <div style={{ height: 1, background: 'var(--line)', flex: 1 }} />
            <span className="muted-3" style={{ fontSize: 12 }}>ou com e-mail</span>
            <div style={{ height: 1, background: 'var(--line)', flex: 1 }} />
          </div>

          <form onSubmit={handleAuth} className="col" style={{ gap: 14 }}>
            {isSignup && (
              <Field label="Nome completo">
                <input className="input" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required={isSignup} />
              </Field>
            )}
            <Field label="E-mail">
              <input className="input" type="email" placeholder="voce@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </Field>
            <Field label="Senha">
              <div className="input-icon" style={{ position: 'relative' }}>
                <input className="input" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: 44, paddingLeft: 14 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 0 }}>
                  {showPw ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </Field>

            {error && <p style={{ color: 'var(--danger)', fontSize: 13, margin: 0 }}>{error}</p>}

            {!isSignup && (
              <div className="between row">
                <label className="row muted" style={{ gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--magenta)', width: 16, height: 16 }} /> Lembrar de mim
                </label>
                <a href="#" style={{ fontSize: 13, color: 'var(--magenta)', fontWeight: 600, textDecoration: 'none' }}>Esqueci a senha</a>
              </div>
            )}

            {isSignup && (
              <p className="muted-3 row" style={{ gap: 8, fontSize: 12.5, margin: '-2px 0 2px', alignItems: 'flex-start' }}>
                <CheckIcon size={15} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 }} /> Sua conta será criada como <strong style={{ color: 'var(--ink-2)' }}>Cliente</strong>. Um administrador pode alterar o papel depois.
              </p>
            )}
            <Button type="submit" variant="primary" className="btn-block" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? 'Aguarde...' : isSignup ? 'Criar conta' : 'Entrar'}
            </Button>
          </form>

          {/* Contas de demonstração */}
          {!isSignup && (
            <div className="card" style={{ marginTop: 22, padding: 14, background: 'var(--sand-50)', border: '1px dashed var(--line-2)' }}>
              <p className="muted-3" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700, margin: '0 0 4px' }}>Contas de demonstração</p>
              <p className="hint" style={{ margin: '0 0 10px' }}>Cada conta já tem seu papel. Clique para entrar.</p>
              <div className="col" style={{ gap: 8 }}>
                {DEMO_ACCOUNTS.map(a => (
                  <button key={a.role} type="button" onClick={() => handleDemoLogin(a.email)} disabled={loading}
                    className="row" style={{ gap: 10, width: '100%', textAlign: 'left', cursor: 'pointer', background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '8px 10px' }}>
                    <Avatar initial={a.initial} size={32} tone={a.role === 'customer' ? 'var(--sand-300)' : undefined} />
                    <span className="grow"><span style={{ fontWeight: 700, fontSize: 13, display: 'block', color: 'var(--ink)' }}>{a.name}</span><span className="muted-3" style={{ fontSize: 11 }}>{a.email}</span></span>
                    <Badge tone={a.role === 'admin' ? 'mag' : a.role === 'vendedor' ? 'info' : 'soft'}>{a.label}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="muted" style={{ textAlign: 'center', marginTop: 22, fontSize: 14 }}>
            {isSignup ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
            <button onClick={toggleMode} style={{ background: 'none', border: 'none', color: 'var(--magenta)', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              {isSignup ? 'Entrar' : 'Criar agora'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
