import React from 'react'
import { Car } from '../types'

export default function CarCard({ car }: { car: Car }){
  return (
    <article style={{border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,padding:12,background:'#071028'}}>
      <div style={{height:140,background:'#0f1724',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b'}}>Imagen</div>
      <h3 style={{marginTop:12,color:'#fff'}}>{car.make} {car.model}</h3>
      <p style={{color:'#94a3b8'}}>Año: {car.year}</p>
      <p style={{color:'#10b981',fontWeight:700}}>{car.type === 'rent' ? `$${car.price}/día` : `$${car.price}`}</p>
    </article>
  )
}
