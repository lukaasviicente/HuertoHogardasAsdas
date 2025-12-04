
// Pequeña "base de datos" de usuarios basada en localStorage.

const STORAGE_KEY = 'huertohogar_users'
const CURRENT_KEY = 'huertohogar_current_user'

const SEED_USERS = [
  { id: 1, email: 'admin@huertohogar.cl', password: 'admin123', role: 'admin' },
  { id: 2, email: 'cliente@huertohogar.cl', password: 'cliente123', role: 'cliente' }
]

function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error leyendo localStorage', err)
    return fallback
  }
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('Error escribiendo localStorage', err)
  }
}

export function loadUsers() {
  let users = readStorage(STORAGE_KEY, null)
  if (!users || !Array.isArray(users) || users.length === 0) {
    users = SEED_USERS
    writeStorage(STORAGE_KEY, users)
  }
  return users
}

export function saveUsers(users) {
  writeStorage(STORAGE_KEY, users)
}

export function registerUser(email, password, role = 'cliente') {
  const users = loadUsers()
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    const err = new Error('El correo ya está registrado')
    err.code = 'EMAIL_EXISTS'
    throw err
  }
  const nextId = users.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1
  const user = { id: nextId, email, password, role }
  const updated = [...users, user]
  saveUsers(updated)
  writeStorage(CURRENT_KEY, user)
  return user
}

export function authenticateUser(email, password) {
  const users = loadUsers()
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!user) {
    const err = new Error('Correo o contraseña inválidos')
    err.code = 'INVALID_CREDENTIALS'
    throw err
  }
  writeStorage(CURRENT_KEY, user)
  return user
}

export function getCurrentUser() {
  return readStorage(CURRENT_KEY, null)
}

export function clearCurrentUser() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CURRENT_KEY)
  } catch (err) {
    console.error('Error limpiando usuario actual', err)
  }
}

export function getAllUsers() {
  return loadUsers()
}

// Utilidad para pruebas unitarias (pueden llamarla en Vitest/Jest)
export function resetUserDb() {
  saveUsers(SEED_USERS)
  clearCurrentUser()
}
