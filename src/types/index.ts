export type UserRole = 'admin' | 'seller' | 'customer'
export type UserStatus = 'active' | 'blocked'
export type AuthProvider = 'google' | 'password'

export interface AppUser {
  id: string
  email: string
  name: string
  photo_url?: string
  auth_provider: AuthProvider
  role: UserRole
  status: UserStatus
  created_at: string
  last_sign_in?: string
}

export type ProductType = 'top' | 'bottom' | 'set'

export interface Variant {
  size: string
  sku: string
  stock: number
  price?: number
}

export interface Product {
  id: string
  type: ProductType | 'conjunto'
  name: string
  collection: string
  print: string
  price: number
  photo_url?: string
  gradient?: string
  grad?: string
  published?: boolean
  variants?: Variant[]
  sizes?: any[]
  top_ref?: string
  bottom_ref?: string
  topRef?: string
  bottomRef?: string
  created_at?: string
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled'
export type PaymentMethod = 'pix' | 'card' | 'boleto'
export type OrderChannel = 'online' | 'whatsapp' | 'physical'

export interface OrderItem {
  product_id: string
  product_name: string
  type: ProductType
  top_size?: string
  bottom_size?: string
  size?: string
  qty: number
  unit_price: number
}

export interface Order {
  id: string
  customer_id: string
  customer_name: string
  customer_email: string
  customer_cpf?: string
  customer_address?: {
    zip: string
    street: string
    number: string
    complement?: string
    city: string
    state: string
  }
  items: OrderItem[]
  total: number
  status: OrderStatus
  channel: OrderChannel
  payment: {
    method: PaymentMethod
    mp_payment_id?: string
    mp_status?: string
  }
  created_at: string
}

export interface CartItem {
  product: Product
  top_size?: string
  bottom_size?: string
  size?: string
  qty: number
}
