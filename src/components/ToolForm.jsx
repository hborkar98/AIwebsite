import React, { useState } from 'react'

export default function ToolForm({ initial = {}, onSave }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    description: initial.description || '',
    prompts: initial.prompts || [''],
    images: initial.images || [],
    codes: initial.codes || [],
    examples: initial.examples || [],
    tags: initial.tags || []
  })

  // basic file-to-base64 for images
  const handleImageUpload = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setForm(prev => ({ ...prev, images: [...prev.images, e.target.result] }))
    }
    reader.readAsDataURL(file)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Name required')
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Tool name" className="w-full p-2 rounded bg-white/3" />
      <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description (markdown allowed)" className="w-full p-2 rounded bg-white/3 h-28" />

      <div>
        <label className="text-sm">Prompts (press + to add)</label>
        {form.prompts.map((p,i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input value={p} onChange={e => setForm(prev => { const arr=[...prev.prompts]; arr[i]=e.target.value; return {...prev, prompts: arr}})} className="flex-1 p-2 rounded bg-white/3" />
            <button type="button" className="px-3 py-1 bg-red-600 rounded" onClick={() => setForm(prev => ({ ...prev, prompts: prev.prompts.filter((_,idx) => idx !== i) }))}>Del</button>
          </div>
        ))}
        <button type="button" onClick={() => setForm(prev => ({...prev, prompts: [...prev.prompts, '']}))} className="mt-2 px-3 py-1 bg-green-600 rounded">+</button>
      </div>

      <div>
        <label className="text-sm">Images (url or upload)</label>
        <div className="flex gap-2 mt-2">
          <input placeholder="Image URL (press Enter)" onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); setForm(prev => ({...prev, images: [...prev.images, e.target.value]})); e.target.value='' } }} className="flex-1 p-2 rounded bg-white/3" />
          <input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0])} />
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {form.images.map((src, idx) => <div key={idx} className="w-28 h-20 overflow-hidden rounded"><img src={src} alt="" className="w-full h-full object-cover" /></div>)}
        </div>
      </div>

      <div>
        <label className="text-sm">Tags (comma separated)</label>
        <input value={form.tags.join(', ')} onChange={(e)=> setForm(prev => ({...prev, tags: e.target.value.split(',').map(x=>x.trim())}))} className="w-full p-2 rounded bg-white/3" />
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-neonBlue text-black rounded" type="submit">Save</button>
        <button type="button" onClick={() => window.history.back()} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
      </div>
    </form>
  )
}
