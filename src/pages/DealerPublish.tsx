import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function DealerPublish() {
  const { publishCar } = useAuth()
  const [form, setForm] = useState({ make: '', model: '', year: '', price: '', type: 'sale' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await publishCar({
        make: form.make,
        model: form.model,
        year: Number(form.year),
        price: Number(form.price),
        type: form.type as 'sale' | 'rent'
      })
      setMessage('Vehículo publicado con éxito')
      setForm({ make: '', model: '', year: '', price: '', type: 'sale' })
    } catch (error) {
      setMessage(String(error))
    }
  }

  return (
    <section style={{padding:24}}>
      <h2>Publicar vehículo</h2>
      <p>Agrega un nuevo vehículo a tu inventario para venta o alquiler.</p>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:12,marginTop:20,maxWidth:520}}>
        <input value={form.make} onChange={e => setForm(prev => ({ ...prev, make: e.target.value }))} placeholder='Marca' style={{padding:12,borderRadius:10,background:'#0f172a',border:'1px solid #334155',color:'#fff'}} />
        <input value={form.model} onChange={e => setForm(prev => ({ ...prev, model: e.target.value }))} placeholder='Modelo' style={{padding:12,borderRadius:10,background:'#0f172a',border:'1px solid #334155',color:'#fff'}} />
        <input value={form.year} onChange={e => setForm(prev => ({ ...prev, year: e.target.value }))} placeholder='Año' style={{padding:12,borderRadius:10,background:'#0f172a',border:'1px solid #334155',color:'#fff'}} />
        <input value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} placeholder='Precio' style={{padding:12,borderRadius:10,background:'#0f172a',border:'1px solid #334155',color:'#fff'}} />
        <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))} style={{padding:12,borderRadius:10,background:'#0f172a',border:'1px solid #334155',color:'#fff'}}>
          <option value='sale'>Venta</option>
          <option value='rent'>Alquiler</option>
        </select>
        <button type='submit' style={{padding:'12px 18px',borderRadius:10,background:'#10b981',border:'none',color:'#020617',fontWeight:700,cursor:'pointer'}}>Publicar</button>
      </form>
      {message ? <p style={{marginTop:16,color:'#a5b4fc'}}>{message}</p> : null}
    </section>
  )
}
