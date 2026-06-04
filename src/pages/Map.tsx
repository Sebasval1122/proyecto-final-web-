import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function MapPage(){
  const { pickupPoints } = useAuth()

  return (
    <section style={{padding:24}}>
      <h1>Mapa de puntos de recogida</h1>
      <p>Selecciona el lugar donde quieres recibir o entregar el vehículo.</p>
      <div style={{height:360,marginTop:24,background:'#0b1220',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b'}}>Mapa interactivo aquí</div>
      <section style={{marginTop:24}}>
        <h2>Puntos de entrega disponibles</h2>
        <div style={{display:'grid',gap:14,marginTop:16}}>
          {pickupPoints.map(point => (
            <article key={point.id} style={{padding:18,background:'#0f172a',borderRadius:12,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,fontWeight:700,color:'#f8fafc'}}>{point.name}</p>
              <p style={{margin:'6px 0 0',color:'#94a3b8'}}>{point.address}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
