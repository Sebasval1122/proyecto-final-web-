import React from 'react'
import { useCars } from '../hooks/useCars'
import { useTransactions } from '../hooks/useTransactions'
import CarCard from '../components/ui/CarCard'

export default function AdminDashboard(){
  const { cars } = useCars()
  const { transactions } = useTransactions()
  const sales = transactions.filter(tx => tx.type === 'sale')
  const rents = transactions.filter(tx => tx.type === 'rent')
  const availableCars = cars.filter(car => car.status === 'available')

  const plusMetrics = [
    { label: 'Ventas totales', value: `${sales.length}` },
    { label: 'Alquileres vigentes', value: `${rents.filter(tx => tx.status === 'proceso').length}` },
    { label: 'Autos listados', value: `${availableCars.length}` },
    { label: 'Usuarios clave', value: '3' }
  ]

  return (
    <section style={{padding:24}}>
      <div style={{padding:24,background:'#08101f',borderRadius:20,border:'1px solid rgba(255,255,255,0.08)',marginBottom:24}}>
        <p style={{margin:0,color:'#34d399',fontWeight:700}}>Panel Administrador</p>
        <h1 style={{margin:'12px 0 0',fontSize:40}}>Bienvenido, Admin Drive</h1>
        <p style={{margin:'14px 0 0',color:'#cbd5e1',lineHeight:1.7}}>
          Supervisa las ventas, los alquileres y el inventario disponibles. Aquí puedes revisar todas las transacciones y el estado de la flota.
        </p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Compras finalizadas</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{sales.filter(tx => tx.status === 'finalizado').length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Alquileres en proceso</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{rents.filter(tx => tx.status === 'proceso').length}</p>
        </article>
        <article style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
          <p style={{margin:0,color:'#94a3b8'}}>Autos disponibles</p>
          <p style={{margin:'14px 0 0',fontSize:32,fontWeight:700}}>{availableCars.length}</p>
        </article>
      </div>

      <section style={{marginTop:32}}>
        <h2>Administración Plus</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:16}}>
          {plusMetrics.map(metric => (
            <article key={metric.label} style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,color:'#94a3b8'}}>{metric.label}</p>
              <p style={{margin:'14px 0 0',fontSize:28,fontWeight:700}}>{metric.value}</p>
            </article>
          ))}
        </div>
        <p style={{marginTop:18,color:'#cbd5e1'}}>Plus: aprovecha esta vista para priorizar revisión de transacciones en proceso y mejorar el inventario con una rápida auditoría de stock.</p>
      </section>

      <section style={{marginTop:32}}>
        <h2>Vehículos disponibles</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16,marginTop:16}}>
          {availableCars.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <section style={{marginTop:32}}>
        <h2>Transacciones</h2>
        <div style={{display:'grid',gap:16,marginTop:16}}>
          {transactions.map(tx => (
            <article key={tx.id} style={{padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,color:'#94a3b8'}}>{tx.type === 'sale' ? 'Compra' : 'Alquiler'} - {tx.status}</p>
              <p style={{margin:'10px 0 0',fontSize:18,fontWeight:700}}>{tx.carTitle}</p>
              <p style={{margin:'6px 0 0',color:'#cbd5e1'}}>Cliente: {tx.buyerEmail}</p>
              <p style={{margin:'4px 0 0',color:'#cbd5e1'}}>Vendedor: {tx.sellerEmail}</p>
              <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Total: ${tx.amount} • Fecha: {tx.date}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
