import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import { ToolsProvider } from './context/ToolsContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToolsProvider>
          <App />
        </ToolsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
