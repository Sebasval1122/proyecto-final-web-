import React, { useState } from 'react'

interface PublishCarFormProps {
  onSubmit: (data: { make: string; model: string; year: string; price: string; type: string }) => Promise<void>
}

export default function PublishCarForm({ onSubmit }: PublishCarFormProps) {
  const [form, setForm] = useState({ make: '', model: '', year: '', price: '', type: 'sale' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await onSubmit(form)
      setMessage('Vehículo publicado con éxito')
      setForm({ make: '', model: '', year: '', price: '', type: 'sale' })
    } catch (error) {
      setMessage(String(error))
    }
  }

  return (
    <article style={{padding:24,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
      <h2>Publicar vehículo</h2>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:12,marginTop:16}}>
        <input value={form.make} onChange={e => setForm(prev => ({...prev, make:e.target.value}))} placeholder='Marca' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} required />
        <input value={form.model} onChange={e => setForm(prev => ({...prev, model:e.target.value}))} placeholder='Modelo' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} required />
        <input value={form.year} onChange={e => setForm(prev => ({...prev, year:e.target.value}))} placeholder='Año' type="number" style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} required />
        <input value={form.price} onChange={e => setForm(prev => ({...prev, price:e.target.value}))} placeholder='Precio' type="number" style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} required />
        <select value={form.type} onChange={e => setForm(prev => ({...prev, type:e.target.value}))} style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}}>
          <option value='sale'>Venta</option>
          <option value='rent'>Alquiler</option>
        </select>
        <button type='submit' style={{padding:'12px 16px',borderRadius:10,background:'#10b981',color:'#020617',fontWeight:700,border:'none',cursor:'pointer'}}>Publicar</button>
      </form>
      {message ? <p style={{marginTop:16,color:'#a5b4fc'}}>{message}</p> : null}
    </article>
  )
}
