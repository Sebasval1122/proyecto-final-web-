import React, { useState } from 'react'

interface PickupPointFormProps {
  onSubmit: (name: string, address: string) => Promise<void>
}

export default function PickupPointForm({ onSubmit }: PickupPointFormProps) {
  const [form, setForm] = useState({ name: '', address: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await onSubmit(form.name, form.address)
      setMessage('Punto de entrega agregado')
      setForm({ name: '', address: '' })
    } catch (error) {
      setMessage(String(error))
    }
  }

  return (
    <article style={{padding:24,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
      <h2 style={{margin:0}}>Puntos de entrega</h2>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:12,marginTop:16}}>
        <input value={form.name} onChange={e => setForm(prev => ({...prev, name:e.target.value}))} placeholder='Nombre del punto' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} required />
        <input value={form.address} onChange={e => setForm(prev => ({...prev, address:e.target.value}))} placeholder='Dirección' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} required />
        <button type='submit' style={{padding:'12px 16px',borderRadius:10,background:'#10b981',color:'#020617',fontWeight:700,border:'none',cursor:'pointer'}}>Agregar punto</button>
      </form>
      {message ? <p style={{marginTop:20,color:'#a5b4fc'}}>{message}</p> : null}
    </article>
  )
}
