import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function AdminReports() {
  const { cars, transactions } = useAuth()
  const sales = transactions.filter(tx => tx.type === 'sale')
  const rents = transactions.filter(tx => tx.type === 'rent')

  return (
    <section style={{padding:24}}>
      <h2>Reportes</h2>
      <p>Obtén un panorama de las ventas y alquileres en la plataforma.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Total vehículos</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{cars.length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Ventas finalizadas</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{sales.filter(tx => tx.status === 'finalizado').length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Alquileres activos</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{rents.filter(tx => tx.status === 'proceso').length}</p>
        </article>
      </div>
    </section>
  )
}
