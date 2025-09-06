import React from 'react'
import { useTools } from '../context/ToolsContext'
import { useAuth } from '../context/AuthContext'
import ToolForm from '../components/ToolForm'
import { useNavigate } from 'react-router-dom'

export default function AddTool(){
  const { addTool } = useTools()
  const { user } = useAuth()
  const navigate = useNavigate()
  if (!user) return <section className="container">Admin only — please login</section>

  const save = (data) => {
    const t = addTool(data)
    navigate(`/tools/${t.id}`)
  }

  return (
    <section className="container">
      <h1 className="text-2xl neon-title font-bold">Add New Tool</h1>
      <div className="mt-4 neon-card p-6 rounded-2xl">
        <ToolForm onSave={save} />
      </div>
    </section>
  )
}
