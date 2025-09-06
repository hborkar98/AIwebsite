import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Fuse from 'fuse.js'

const KEY = 'neonai_tools_v1'
const ToolsContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, tools: action.payload }
    case 'ADD':
      return { ...state, tools: [action.payload, ...state.tools] }
    case 'UPDATE':
      return { ...state, tools: state.tools.map(t => t.id === action.payload.id ? action.payload : t) }
    case 'DELETE':
      return { ...state, tools: state.tools.filter(t => t.id !== action.payload) }
    default:
      return state
  }
}

export function ToolsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { tools: [] })

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      dispatch({ type: 'SET', payload: JSON.parse(raw) })
    } else {
      // seed demo
      const demo = [
        {
          id: uuidv4(),
          name: 'NeonPrompt — Text-to-Image',
          description: 'Demo tool for text-to-image.',
          prompts: ['A neon cyberpunk city at night'],
          images: [],
          codes: [],
          examples: [],
          tags: ['Image Gen', 'Demo'],
          dateAdded: new Date().toISOString(),
          lastEdited: new Date().toISOString(),
          favorite: false
        }
      ]
      dispatch({ type: 'SET', payload: demo })
      localStorage.setItem(KEY, JSON.stringify(demo))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state.tools))
  }, [state.tools])

  const addTool = (tool) => {
    const t = { ...tool, id: uuidv4(), dateAdded: new Date().toISOString(), lastEdited: new Date().toISOString(), favorite: false }
    dispatch({ type: 'ADD', payload: t })
    return t
  }

  const updateTool = (id, patch) => {
    const t = state.tools.find(x => x.id === id)
    if (!t) return
    const updated = { ...t, ...patch, lastEdited: new Date().toISOString() }
    dispatch({ type: 'UPDATE', payload: updated })
    return updated
  }

  const deleteTool = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const toggleFavorite = (id) => {
    const t = state.tools.find(x => x.id === id)
    if (!t) return
    updateTool(id, { favorite: !t.favorite })
  }

  // export/import
  const exportJSON = () => {
    const data = JSON.stringify(state.tools, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neonai_tools_backup_${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJSON = (jsonString, { replace = false } = {}) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (!Array.isArray(parsed)) throw new Error('Invalid data')
      if (replace) {
        dispatch({ type: 'SET', payload: parsed })
      } else {
        // avoid id collisions: add new ids
        const merged = [...parsed, ...state.tools].map(p => ({ ...p, id: p.id || uuidv4() }))
        dispatch({ type: 'SET', payload: merged })
      }
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.message || 'Invalid JSON' }
    }
  }

  // search helper
  const fuse = new Fuse(state.tools, { keys: ['name', 'description', 'prompts', 'tags'], threshold: 0.35 })

  const search = (q) => {
    if (!q || !q.trim()) return state.tools
    return fuse.search(q).map(r => r.item)
  }

  return (
    <ToolsContext.Provider value={{
      tools: state.tools,
      addTool,
      updateTool,
      deleteTool,
      toggleFavorite,
      exportJSON,
      importJSON,
      search
    }}>
      {children}
    </ToolsContext.Provider>
  )
}

export const useTools = () => useContext(ToolsContext)
