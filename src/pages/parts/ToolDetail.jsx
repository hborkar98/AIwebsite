import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTools } from '../context/ToolsContext'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useAuth } from '../context/AuthContext'

export default function ToolDetail(){
  const { id } = useParams()
  const { tools, updateTool } = useTools()
  const { user } = useAuth()
  const navigate = useNavigate()
  const tool = tools.find(t => t.id === id)

  useEffect(()=>{ Prism.highlightAll() }, [tool])

  if (!tool) return <section className="container">Tool not found</section>

  return (
    <section className="container">
      <div className="neon-card p-6 rounded-2xl">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold neon-title">{tool.name}</h1>
            <div className="mt-4 text-slate-300"><ReactMarkdown>{tool.description}</ReactMarkdown></div>

            <div className="mt-6">
              <h3 className="font-semibold">Prompts</h3>
              <ol className="list-decimal pl-6 mt-2">
                {tool.prompts?.map((p,i) => <li key={i} className="mb-2 flex justify-between items-center">{p} <button className="ml-3 px-2 py-1 bg-white/5 rounded text-xs" onClick={()=>navigator.clipboard.writeText(p)}>Copy</button></li>)}
              </ol>
            </div>
          </div>

          <div className="w-80">
            <div className="rounded-lg overflow-hidden">
              <img src={tool.images?.[0] || 'https://images.unsplash.com/photo-1526378724362-ccc5a1f4d46a?w=1200&q=80'} alt={tool.name} className="w-full h-56 object-cover" />
            </div>
            <div className="mt-3 text-slate-400">Added: {new Date(tool.dateAdded).toLocaleString()}</div>
            <div className="mt-3 flex gap-2">
              {user && <button onClick={() => navigate(`/edit/${tool.id}`)} className="px-3 py-2 bg-neonBlue rounded text-black">Edit</button>}
              <button onClick={() => updateTool(tool.id, { views: (tool.views||0)+1 })} className="px-3 py-2 bg-white/3 rounded">Mark Viewed</button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Code Snippets</h3>
          <div className="mt-3 space-y-4">
            {tool.codes?.map((c, idx) => (
              <div key={idx} className="rounded-md overflow-hidden border border-slate-800">
                <pre className="m-0 p-4 language-js"><code className={`language-${c.lang}`}>{c.code}</code></pre>
                <div className="p-3 border-t border-slate-800 flex justify-end">
                  <button className="px-3 py-1 btn-neon text-sm" onClick={()=>navigator.clipboard.writeText(c.code)}>Copy</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
