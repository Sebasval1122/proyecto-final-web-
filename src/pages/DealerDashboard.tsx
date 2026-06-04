import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useCars } from '../hooks/useCars'
import { useTransactions } from '../hooks/useTransactions'
import { usePickupPoints } from '../hooks/usePickupPoints'
import CarCard from '../components/ui/CarCard'
import PublishCarForm from '../components/forms/PublishCarForm'
import PickupPointForm from '../components/forms/PickupPointForm'

export default function DealerDashboard(){
  const { user } = useAuth()
  const { publishCar, getPublishedCars } = useCars()
  const { getDealsForDealer } = useTransactions()
  const { pickupPoints, addPickupPoint } = usePickupPoints()

  const deals = user ? getDealsForDealer(user.email) : []
  const inProcess = deals.filter(tx => tx.status === 'proceso')
  const finalized = deals.filter(tx => tx.status === 'finalizado')
  const publishedCars = user ? getPublishedCars(user.id) : []

  const name = user?.name || 'Concesionario'
  const highlightedCar = publishedCars[0]

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

  const handleAddPickup = async (name: string, address: string) => {
    if (!user) return
    await addPickupPoint(user.email, name, address)
  }

  return (
    <section style={{padding:24}}>
      <div style={{padding:24,background:'#08101f',borderRadius:20,border:'1px solid rgba(255,255,255,0.08)',marginBottom:24}}>
        <p style={{margin:0,color:'#60a5fa',fontWeight:700}}>Panel Concesionaria</p>
        <h1 style={{margin:'12px 0 0',fontSize:40}}>Hola, {name}</h1>
        <p style={{margin:'14px 0 0',color:'#cbd5e1',lineHeight:1.7}}>
          Publica vehículos, controla los negocios en proceso y finalizados, y gestiona los puntos de entrega de tus clientes.
        </p>
      </div>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Publicaciones activas</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{publishedCars.length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Negocios en proceso</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{inProcess.length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Puntos de entrega</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{pickupPoints.length}</p>
        </article>
      </section>

      {highlightedCar ? (
        <section style={{marginTop:32,padding:24,background:'#0f172a',borderRadius:20,border:'1px solid rgba(255,255,255,0.08)'}}>
          <h2>Plus concesionaria</h2>
          <p style={{margin:'8px 0 0',color:'#cbd5e1'}}>Vehículo destacado para impulsar con promoción especial.</p>
          <article style={{marginTop:18,padding:18,background:'#111827',borderRadius:16}}>
            <p style={{margin:0,color:'#f8fafc',fontWeight:700}}>{highlightedCar.make} {highlightedCar.model} ({highlightedCar.year})</p>
            <p style={{margin:'8px 0 0',color:'#94a3b8'}}>Tipo: {highlightedCar.type === 'sale' ? 'Venta' : 'Alquiler'}</p>
            <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Precio: ${highlightedCar.price}</p>
          </article>
        </section>
      ) : null}

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:24}}>
        <PublishCarForm onSubmit={handlePublish} />
        <PickupPointForm onSubmit={handleAddPickup} />
      </section>

      <section style={{marginTop:32}}>
        <h2>Vehículos publicados</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16,marginTop:16}}>
          {publishedCars.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <section style={{marginTop:32}}>
        <h2>Negocios</h2>
        <div style={{display:'grid',gap:16,marginTop:16}}>
          <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{margin:'0 0 8px 0'}}>En proceso</h3>
            {inProcess.length === 0 ? <p style={{color:'#94a3b8'}}>No hay negocios en proceso.</p> : inProcess.map(tx => (
              <div key={tx.id} style={{marginBottom:12}}>
                <p style={{margin:0,color:'#cbd5e1'}}>{tx.carTitle} • ${tx.amount}</p>
                <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Cliente: {tx.buyerEmail}</p>
              </div>
            ))}
          </article>

          <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{margin:'0 0 8px 0'}}>Finalizados</h3>
            {finalized.length === 0 ? <p style={{color:'#94a3b8'}}>No hay negocios finalizados.</p> : finalized.map(tx => (
              <div key={tx.id} style={{marginBottom:12}}>
                <p style={{margin:0,color:'#cbd5e1'}}>{tx.carTitle} • ${tx.amount}</p>
                <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Cliente: {tx.buyerEmail}</p>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section style={{marginTop:32}}>
        <h2>Puntos de entrega</h2>
        <div style={{display:'grid',gap:14,marginTop:16}}>
          {pickupPoints.map(point => (
            <article key={point.id} style={{padding:18,background:'#0f172a',borderRadius:14,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,color:'#cbd5e1',fontWeight:700}}>{point.name}</p>
              <p style={{margin:'6px 0 0',color:'#94a3b8'}}>{point.address}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
