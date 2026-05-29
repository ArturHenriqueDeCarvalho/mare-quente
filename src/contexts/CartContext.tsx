'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { CartItem, Product } from '@/types'

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size?: string, topSize?: string, bottomSize?: string) => void
  updateQuantity: (productId: string, qty: number, size?: string, topSize?: string, bottomSize?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('mq-cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {}
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mq-cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (newItem: CartItem) => {
    setItems(current => {
      const existingIndex = current.findIndex(item => 
        item.product.id === newItem.product.id && 
        item.size === newItem.size &&
        item.top_size === newItem.top_size &&
        item.bottom_size === newItem.bottom_size
      )

      if (existingIndex >= 0) {
        const updated = [...current]
        updated[existingIndex].qty += newItem.qty
        return updated
      }

      return [...current, newItem]
    })
  }

  const removeItem = (productId: string, size?: string, topSize?: string, bottomSize?: string) => {
    setItems(current => current.filter(item => 
      !(item.product.id === productId && 
        item.size === size && 
        item.top_size === topSize && 
        item.bottom_size === bottomSize)
    ))
  }

  const updateQuantity = (productId: string, qty: number, size?: string, topSize?: string, bottomSize?: string) => {
    if (qty <= 0) {
      removeItem(productId, size, topSize, bottomSize)
      return
    }

    setItems(current => current.map(item => {
      if (item.product.id === productId && 
          item.size === size && 
          item.top_size === topSize && 
          item.bottom_size === bottomSize) {
        return { ...item, qty }
      }
      return item
    }))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.qty), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
