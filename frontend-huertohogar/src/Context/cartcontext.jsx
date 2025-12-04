import React, { createContext, useContext, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products.js'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

export default function CartProvider({children}){
  const [items, setItems] = useState({}) // {code: qty}
  const [inventory, setInventory] = useState(PRODUCTS) // productos disponibles para vender

  const addProduct = (product) => {
    setInventory(prev => {
      // si ya existe un producto con ese código, lo actualizamos
      const exists = prev.find(p => p.code === product.code)
      if (exists) {
        return prev.map(p => p.code === product.code ? { ...exists, ...product } : p)
      }
      return [...prev, product]
    })
  }

  const add = (code, qty=1) =>
    setItems(prev => ({ ...prev, [code]: (prev[code] || 0) + qty }))

  const remove = (code) =>
    setItems(prev => {
      const n = { ...prev }
      delete n[code]
      return n
    })

  const setQty = (code, qty) =>
    setItems(prev => {
      const value = Math.max(0, qty)
      const n = { ...prev }
      if (value <= 0) {
        delete n[code]
      } else {
        n[code] = value
      }
      return n
    })

  const clearCart = () => setItems({})

  const list = useMemo(
    () =>
      Object.entries(items).map(([code, qty]) => {
        const p = inventory.find(x => x.code === code)
        return { ...p, qty, subtotal: (p?.price || 0) * qty }
      }),
    [items, inventory]
  )

  const count = useMemo(
    () => Object.values(items).reduce((a, b) => a + b, 0),
    [items]
  )
  const total = useMemo(
    () => list.reduce((a, b) => a + b.subtotal, 0),
    [list]
  )

  const value = { items, list, count, total, add, remove, setQty, clearCart, inventory, addProduct }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
