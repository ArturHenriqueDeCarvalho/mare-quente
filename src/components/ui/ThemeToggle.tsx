'use client'

import React, { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from './Icons'

function getTheme() {
  if (typeof document !== 'undefined') {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  }
  return 'light'
}

function applyTheme(t: 'light' | 'dark') {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = t
    try {
      localStorage.setItem('mq-theme', t)
    } catch (e) {}
  }
}

export function ThemeToggle({ light = false, style = {}, className = '' }: { light?: boolean; style?: React.CSSProperties; className?: string }) {
  const [t, setT] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setT(getTheme())
  }, [])

  const toggle = () => {
    const n = t === 'dark' ? 'light' : 'dark'
    applyTheme(n)
    setT(n)
  }

  const onGlass = light

  return (
    <button
      onClick={toggle}
      title={t === 'dark' ? 'Tema claro' : 'Tema escuro'}
      aria-label="Alternar tema"
      className={className}
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: onGlass ? 'rgba(255,255,255,.2)' : 'var(--sand-100)',
        color: onGlass ? '#fff' : 'var(--ink-2)',
        ...style
      }}
    >
      {t === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  )
}
