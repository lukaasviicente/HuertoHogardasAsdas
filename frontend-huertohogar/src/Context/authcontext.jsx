
import React, { createContext, useContext, useState, useEffect } from 'react'
import { registerUser, authenticateUser, getCurrentUser, clearCurrentUser } from '../data/userDb.js'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

/**
 * Proveedor de autenticación.
 * Maneja el usuario conectado y expone helpers para login / logout / registro.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())

  useEffect(() => {
    // Sincroniza cuando cambia el usuario (getCurrentUser ya persiste en userDb)
  }, [user])

  const register = (email, password, role = 'cliente') => {
    const newUser = registerUser(email, password, role)
    setUser(newUser)
    return newUser
  }

  const login = (email, password) => {
    const logged = authenticateUser(email, password)
    setUser(logged)
    return logged
  }

  const logout = () => {
    clearCurrentUser()
    setUser(null)
  }

  const value = { user, register, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
