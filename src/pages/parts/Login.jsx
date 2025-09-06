import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const { login } = useAuth()
  const [u, setU] = useState('admin')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    const res = await login(u, p)
    if (res.ok) navigate('/') 
    else setErr(res.message)
  }

  return (
    <section className="container">
      <div className="max-w-md mx-auto neon-card p-6 rounded-2xl">
        <h2 className="text-xl neon-title font-bold">Admin Login</h2>
        <form className="mt-4 space-y-3" onSubmit={handle}>
          <input value={u} onChange={e=>setU(e.target.value)} className="w-full p-3 rounded bg-white/3" />
          <input value={p} onChange={e=>setP(e.target.value)} type="password" className="w-full p-3 rounded bg-white/3" />
          {err && <div className="text-red-400">{err}</div>}
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-neonBlue rounded text-black">Login</button>
            <button type="button" onClick={()=>{ setU('admin'); setP('ai-tools') }} className="px-4 py-2 bg-white/3 rounded">Fill Demo</button>
          </div>
        </form>
      </div>
    </section>
  )
}
