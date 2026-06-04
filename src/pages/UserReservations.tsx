import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function UserReservations() {
  const { getOrdersForUser } = useAuth()
  const orders = getOrdersForUser()

  return (
    <section style={{padding:24}}>
      <h2>Mis reservas</h2>
      <p>Revisa el estado de tus compras y reservas actuales.</p>
      {orders.length === 0 ? (
        <p style={{color:'#94a3b8',marginTop:16}}>No tienes reservas ni compras registradas aún.</p>
      ) : (
        <div style={{display:'grid',gap:14,marginTop:16}}>
          {orders.map(order => (
            <article key={order.id} style={{padding:18,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,fontWeight:700,color:'#f8fafc'}}>{order.carTitle}</p>
              <p style={{margin:'8px 0 0',color:'#94a3b8'}}>Tipo: {order.type === 'sale' ? 'Compra' : 'Alquiler'}</p>
              <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Estado: {order.status}</p>
              <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Total: ${order.amount}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
