import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCars } from '../hooks/useCars'
import { useTransactions } from '../hooks/useTransactions'
import CarCard from '../components/ui/CarCard'
import PublishCarForm from '../components/forms/PublishCarForm'

export default function UserDashboard(){
  const { user } = useAuth()
  const { getAvailableCars, getPublishedCars, publishCar } = useCars()
  const { getOrdersForUser } = useTransactions()

  const availableCars = getAvailableCars()
  const myOrders = user ? getOrdersForUser(user.email) : []
  const myPublications = user ? getPublishedCars(user.id) : []
  const name = user?.name || 'Usuario'
  const recommended = availableCars[0]

  const handlePublish = async (data: any) => {
    if (!user) return
    await publishCar(user, {
      make: data.make,
      model: data.model,
      year: Number(data.year),
      price: Number(data.price),
      type: data.type as 'sale' | 'rent'
    })
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
        <PublishCarForm onSubmit={handlePublish} />

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
