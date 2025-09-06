import React from 'react'
import { useTools } from '../../context/ToolsContext'
import ToolCard from '../../components/ToolCard'

export default function ToolsGrid({ limit = 6 }) {
  const { tools } = useTools()
  const list = tools.slice(0, limit)
  return (
    <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {list.map(t => <ToolCard key={t.id} tool={t} />)}
    </div>
  )
}
