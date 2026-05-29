'use client'
import React from 'react'

export interface IconProps { size?: number; className?: string; style?: React.CSSProperties; color?: string }

function BaseIcon({ d, size = 20, fill = 'none', className = '', style, color = 'currentColor' }: IconProps & { d: React.ReactNode, fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {d}
    </svg>
  )
}

export function GridIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>} />
}

export function BoxIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/></>} />
}

export function TagIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M3 7v5l9 9 7-7-9-9H5a2 2 0 0 0-2 2Z"/><circle cx="7.5" cy="10.5" r="1.3" fill="currentColor" stroke="none"/></>} />
}

export function CartIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2 12.5a1.6 1.6 0 0 0 1.6 1.3h9.6a1.6 1.6 0 0 0 1.6-1.3L20.5 7H5.3"/></>} />
}

export function UsersIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.1"/><path d="M18 14.2A6.5 6.5 0 0 1 21.5 20"/></>} />
}

export function GearIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></>} />
}

export function ChartIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6" rx="1" fill="currentColor" stroke="none"/><rect x="12" y="7" width="3" height="10" rx="1" fill="currentColor" stroke="none"/><rect x="17" y="13" width="3" height="4" rx="1" fill="currentColor" stroke="none"/></>} />
}

export function SearchIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>} />
}

export function PlusIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M12 5v14M5 12h14"/></>} />
}

export function BellIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>} />
}

export function EyeIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="2.6"/></>} />
}

export function EyeOffIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M9.9 5.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.4 3.2M6.2 6.2A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4-.8"/><path d="m3 3 18 18"/></>} />
}

export function ChevRIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="m9 6 6 6-6 6"/>} />
}

export function ChevDIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="m6 9 6 6 6-6"/>} />
}

export function CheckIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="M20 6 9 17l-5-5"/>} />
}

export function XIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M18 6 6 18M6 6l12 12"/></>} />
}

export function TrashIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6"/></>} />
}

export function EditIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></>} />
}

export function LogoutIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></>} />
}

export function HeartIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="M19 5.5a5 5 0 0 0-7 0L12 6l-.1-.1a5 5 0 1 0-7 7l7 7 7-7a5 5 0 0 0 0-6.9Z"/>} />
}

export function TruckIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></>} />
}

export function ShirtIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="M16 3 12 5 8 3 3 7l2.5 3L7 9v12h10V9l1.5 1L21 7z"/>} />
}

export function ArrowLIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M19 12H5M12 19l-7-7 7-7"/></>} />
}

export function StoreIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M3 9 4.5 4h15L21 9M4 9v11h16V9M4 9h16"/><path d="M9 20v-6h6v6"/></>} />
}

export function FilterIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M3 5h18M6 12h12M10 19h4"/></>} />
}

export function DotsIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></>} />
}

export function WarnIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></>} />
}

export function SunIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>} />
}

export function MoonIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>} />
}

export function PixIcon(props: IconProps) {
  return <BaseIcon {...props} d={<><path d="M12 2L2 12l10 10 10-10L12 2z"/><path d="M12 6L6 12l6 6 6-6-6-6z"/></>} />
}

export function SparkIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/>} />
}

export function GoogleIcon(props: IconProps) {
  return <BaseIcon {...props} d={<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>} />
}
