import React, { useState } from 'react'
import { useTools } from '../context/ToolsContext'
import ToolCard from '../components/ToolCard'

export default function ToolsList(){
  const { tools, exportJSON, importJSON, search } = useTools()
  const [query, setQuery] = useState('')
  const [showFavs, setShowFavs] = useState(false)

  const results = query.trim() ? search(query) : tools
  const displayed = showFavs ? results.filter(t => t.favorite) : results

  const handleImportFile = (e) => {
    const f = e.target.files[0]; if(!f) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const res = importJSON(ev.target.result, { replace: false })
      if (!res.ok) alert('Import failed: ' + (res.message || 'invalid file'))
      else alert('Import successful')
      e.target.value = ''
    }
    reader.readAsText(f)
  }

  return (
    <section className="container">
      <div className="flex gap-3 items-center">
        <input className="flex-1 p-2 rounded bg-white/3" placeholder="Search tools..." value={query} onChange={e=>setQuery(e.target.value)} />
        <button className="px-3 py-2 bg-purple-600 rounded" onClick={() => exportJSON()}>Export</button>
        <label className="px-3 py-2 bg-green-600 rounded cursor-pointer">Import
          <input type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
        </label>
        <button className="px-3 py-2 bg-yellow-500 rounded" onClick={() => setShowFavs(s => !s)}>{showFavs ? 'Show All' : 'Favorites ⭐'}</button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayed.length === 0 ? <div className="text-slate-400">No tools found.</div> : displayed.map(t => <ToolCard key={t.id} tool={t} />)}
      </div>
    </section>
  )
}
