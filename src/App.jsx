import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ToolsList from './pages/ToolsList'
import ToolDetail from './pages/ToolDetail'
import AddTool from './pages/AddTool'
import EditToolPage from './pages/EditToolPage'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#041026] via-[#051233] to-[#060217] text-slate-100">
      <Header />
      <main className="pt-20 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolsList />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
          <Route path="/add" element={<AddTool />} />
          <Route path="/edit/:id" element={<EditToolPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
