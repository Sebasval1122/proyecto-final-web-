import React from 'react'
import { Link } from 'react-router-dom'

export default function UserDashboard(){
  return (
    <section style={{padding:24}}>
      <h1>Mi cuenta — DrivePoint</h1>
      <p>Accede a tus compras, ventas, alquileres y mapa de puntos de recogida.</p>
      <div style={{marginTop:24, display:'flex', gap:12}}>
        <Link to="/map" style={{padding:'10px 14px',background:'#10b981',color:'#020617',borderRadius:8,textDecoration:'none'}}>Ver mapa</Link>
        <Link to="/marketplace" style={{padding:'10px 14px',background:'#111827',color:'#cbd5e1',borderRadius:8,textDecoration:'none'}}>Ir al Marketplace</Link>
      </div>
    </section>
  )
}
