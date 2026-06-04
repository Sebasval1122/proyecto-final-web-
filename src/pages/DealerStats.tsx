import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function DealerStats() {
  const { getPublishedCars, getDealsForDealer, pickupPoints } = useAuth()
  const published = getPublishedCars()
  const deals = getDealsForDealer()
  const ongoing = deals.filter(tx => tx.status === 'proceso').length
  const closed = deals.filter(tx => tx.status === 'finalizado').length

  return (
    <section style={{padding:24}}>
      <h2>Estadísticas</h2>
      <p>Revisa el desempeño de tus publicaciones y la evolución de tus reservas.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Publicaciones</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{published.length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Reservas activas</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{ongoing}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Reservas finalizadas</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{closed}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Puntos de entrega</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{pickupPoints.length}</p>
        </article>
      </div>
    </section>
  )
}
