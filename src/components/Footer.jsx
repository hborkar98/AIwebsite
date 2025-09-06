import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 py-6">
      <div className="container text-center text-slate-400">
        <div className="mb-2">© {new Date().getFullYear()} NeonAI — Built with ❤️ and neon lights</div>
        <div className="text-xs">Deployable to Vercel or GitHub Pages</div>
      </div>
    </footer>
  )
}
