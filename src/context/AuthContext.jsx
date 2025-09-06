import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('neonai_admin_hash')) {
        const hash = await sha256('ai-tools')
        localStorage.setItem('neonai_admin_hash', hash)
        localStorage.setItem('neonai_admin_user', 'admin')
      }
      const sess = localStorage.getItem('neonai_session')
      if (sess === 'logged') {
        setUser({ username: localStorage.getItem('neonai_admin_user') || 'admin' })
      }
      const savedTheme = localStorage.getItem('neonai_theme')
      if (savedTheme) setTheme(savedTheme)
    })()
  }, [])

  const login = async (username, password) => {
    const storedUser = localStorage.getItem('neonai_admin_user') || 'admin'
    const storedHash = localStorage.getItem('neonai_admin_hash')
    const inputHash = await sha256(password)
    if (username === storedUser && inputHash === storedHash) {
      setUser({ username })
      localStorage.setItem('neonai_session', 'logged')
      return { ok: true }
    }
    return { ok: false, message: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('neonai_session')
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('neonai_theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
