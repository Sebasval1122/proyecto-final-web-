import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CarCard from '../components/CarCard'

export default function UserDashboard(){
  const { user, getAvailableCars, publishCar, getOrdersForUser, getPublishedCars } = useAuth()
  const availableCars = getAvailableCars()
  const myOrders = getOrdersForUser()
  const myPublications = getPublishedCars()
  const name = user?.name || 'Usuario'
  const recommended = availableCars[0]
  const [form, setForm] = useState({ make: '', model: '', year: '', price: '', type: 'sale' })
  const [message, setMessage] = useState('')

  const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
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
      <div style={{padding:24,background:'#08101f',borderRadius:20,border:'1px solid rgba(255,255,255,0.08)',marginBottom:24}}>
        <p style={{margin:0,color:'#f59e0b',fontWeight:700}}>Panel Usuario</p>
        <h1 style={{margin:'12px 0 0',fontSize:40}}>Bienvenido, {name}</h1>
        <p style={{margin:'14px 0 0',color:'#cbd5e1',lineHeight:1.7}}>
          Explora los autos disponibles, publica tus propios vehículos y revisa el estado de tus compras y alquileres.
        </p>
      </div>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:24}}>
        <article style={{padding:24,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2>Publicar vehículo</h2>
          <form onSubmit={handlePublish} style={{display:'grid',gap:12,marginTop:16}}>
            <input value={form.make} onChange={e => setForm(prev => ({...prev, make:e.target.value}))} placeholder='Marca' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
            <input value={form.model} onChange={e => setForm(prev => ({...prev, model:e.target.value}))} placeholder='Modelo' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
            <input value={form.year} onChange={e => setForm(prev => ({...prev, year:e.target.value}))} placeholder='Año' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
            <input value={form.price} onChange={e => setForm(prev => ({...prev, price:e.target.value}))} placeholder='Precio' style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
            <select value={form.type} onChange={e => setForm(prev => ({...prev, type:e.target.value}))} style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}}>
              <option value='sale'>Venta</option>
              <option value='rent'>Alquiler</option>
            </select>
            <button type='submit' style={{padding:'12px 16px',borderRadius:10,background:'#10b981',color:'#020617',fontWeight:700,border:'none',cursor:'pointer'}}>Publicar</button>
          </form>
          {message ? <p style={{marginTop:16,color:'#a5b4fc'}}>{message}</p> : null}
        </article>

        <article style={{padding:24,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2>Acciones</h2>
          <div style={{display:'grid',gap:12,marginTop:16}}>
            <Link to="/map" style={{padding:'12px 16px',borderRadius:10,background:'#10b981',color:'#020617',textDecoration:'none',fontWeight:700}}>Ver mapa</Link>
            <Link to="/marketplace" style={{padding:'12px 16px',borderRadius:10,background:'#111827',color:'#f8fafc',textDecoration:'none',fontWeight:700}}>Ver autos disponibles</Link>
          </div>
        </article>
      </section>

      {recommended ? (
        <section style={{marginTop:32,padding:24,background:'#0f172a',borderRadius:20,border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2>Plus para ti</h2>
          <p style={{margin:'8px 0 0',color:'#cbd5e1'}}>Te recomendamos este vehículo disponible para tu próxima compra o alquiler.</p>
          <article style={{marginTop:18,padding:18,background:'#111827',borderRadius:16}}>
            <p style={{margin:0,color:'#f8fafc',fontWeight:700}}>{recommended.make} {recommended.model} ({recommended.year})</p>
            <p style={{margin:'8px 0 0',color:'#94a3b8'}}>Tipo: {recommended.type === 'sale' ? 'Compra' : 'Alquiler'}</p>
            <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Precio: ${recommended.price}</p>
          </article>
        </section>
      ) : null}

      <section style={{marginTop:32}}>
        <h2>Carros disponibles</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16,marginTop:16}}>
          {availableCars.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <section style={{marginTop:32}}>
        <h2>Mis publicaciones</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16,marginTop:16}}>
          {myPublications.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <section style={{marginTop:32}}>
        <h2>Mis compras y alquileres</h2>
        <div style={{display:'grid',gap:12,marginTop:16}}>
          {myOrders.length === 0 ? (
            <p style={{color:'#94a3b8'}}>No tienes compras o alquileres registrados.</p>
          ) : myOrders.map(order => (
            <article key={order.id} style={{padding:18,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,color:'#cbd5e1',fontWeight:700}}>{order.carTitle}</p>
              <p style={{margin:'8px 0 0',color:'#94a3b8'}}>Tipo: {order.type === 'sale' ? 'Compra' : 'Alquiler'}</p>
              <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Estado: {order.status}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
