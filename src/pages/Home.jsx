import React from 'react'
import { Link } from 'react-router-dom'
import ToolsGrid from './parts/ToolsGrid'

export default function Home(){
  return (
    <section className="container pt-14">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold neon-title">Explore the <span className="text-neonBlue">Frontier</span> of <span className="text-neonPurple">AI Tools</span></h1>
          <p className="text-slate-300 mt-4 max-w-xl">Curate, test and document AI tools — add one tool a day. Neon UI, prompt snippets, code examples and exports.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/add" className="px-5 py-3 rounded-md bg-neonBlue text-black">Add Tool</Link>
            <Link to="/tools" className="px-5 py-3 rounded-md border border-slate-700">Browse Tools</Link>
          </div>
        </div>

        <div className="neon-card p-4 rounded-2xl">
          <div className="h-56 md:h-72 rounded-xl overflow-hidden flex items-center justify-center">
            <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-neonBlue to-neonPurple animate-spin-slow"></div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold neon-title">Latest Tools</h2>
        <ToolsGrid limit={6} />
      </div>
    </section>
  )
}
