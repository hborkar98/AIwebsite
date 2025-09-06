import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTools } from '../context/ToolsContext'
import { useAuth } from '../context/AuthContext'

export default function ToolCard({ tool }) {
  const { deleteTool, updateTool, toggleFavorite } = useTools()
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: tool.name, description: tool.description, url: tool.url || '' })

  const save = () => {
    updateTool(tool.id, { ...form })
    setEditing(false)
  }

  return (
    <article className="neon-card p-4 rounded-2xl relative">
      <button title={tool.favorite ? 'Unfavorite' : 'Favorite'} onClick={() => toggleFavorite(tool.id)} className="absolute top-3 right-3 text-yellow-400">
        {tool.favorite ? '⭐' : '☆'}
      </button>

      {editing ? (
        <div className="space-y-2">
          <input className="w-full p-2 rounded bg-white/3" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <textarea className="w-full p-2 rounded bg-white/3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <input className="w-full p-2 rounded bg-white/3" value={form.url} onChange={e => setForm({...form, url: e.target.value})} />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-600 rounded" onClick={save}>Save</button>
            <button className="px-3 py-1 bg-gray-600 rounded" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold neon-title">{tool.name}</h3>
          <p className="text-sm text-slate-300 mt-1 line-clamp-4">{tool.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-400">{new Date(tool.dateAdded).toLocaleDateString()}</div>
            <div className="flex gap-2 items-center">
              <Link to={`/tools/${tool.id}`} className="px-3 py-1 btn-neon text-xs">Read</Link>
              {user && <button className="px-3 py-1 btn-neon text-xs" onClick={() => setEditing(true)}>Edit</button>}
              {user && <button className="px-3 py-1 btn-neon text-xs" onClick={() => { if (confirm('Delete?')) deleteTool(tool.id) }}>Delete</button>}
            </div>
          </div>
        </>
      )}
    </article>
  )
}
