import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout, toggleTheme, theme } = useAuth()
  const navigate = useNavigate()
  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-md bg-black/40 border-b border-slate-800">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-neonBlue to-neonPurple">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/90">
              <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1" fill="none" />
              <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5 5l1.5 1.5M18.5 18.5L20 20M18.5 5L20 6.5M5 19l1.5-1.5" />
              </g>
            </svg>
          </div>
          <div>
            <div className="neon-title font-bold">NeonAI</div>
            <div className="text-xs text-slate-400">tools • knowledge base</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <NavLink to="/" className={({isActive})=>isActive ? 'text-white px-3 py-2' : 'text-slate-300 px-3 py-2'}>Home</NavLink>
          <NavLink to="/tools" className={({isActive})=>isActive ? 'text-white px-3 py-2' : 'text-slate-300 px-3 py-2'}>Tools</NavLink>
          <NavLink to="/add" className="text-slate-300 px-3 py-2">Add New</NavLink>
          <button onClick={toggleTheme} className="px-3 py-2 text-xs bg-white/3 rounded">{theme === 'dark' ? 'Light' : 'Dark'}</button>
          {user ? (
            <>
              <div className="text-sm text-slate-200 px-3 py-1 rounded bg-white/3">{user.username}</div>
              <button onClick={() => { logout(); navigate('/') }} className="px-3 py-2 bg-white/3 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-2 bg-white/3 rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
