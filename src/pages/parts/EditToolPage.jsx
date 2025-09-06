import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTools } from '../context/ToolsContext'
import { useAuth } from '../context/AuthContext'
import ToolForm from '../components/ToolForm'

export default function EditToolPage(){
  const { id } = useParams()
  const { tools, updateTool } = useTools()
  const { user } = useAuth()
  const navigate = useNavigate()
  if (!user) return <section className="container">Admin only — please login</section>
  const tool = tools.find(t => t.id === id)
  if (!tool) return <section className="container">Tool not found</section>

  const save = (data) => {
    updateTool(id, data)
    navigate(`/tools/${id}`)
  }

  return (
    <section className="container">
      <h1 className="text-2xl neon-title font-bold">Edit Tool</h1>
      <div className="mt-4 neon-card p-6 rounded-2xl">
        <ToolForm initial={tool} onSave={save} />
      </div>
    </section>
  )
}
