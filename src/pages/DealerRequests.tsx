import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function DealerRequests() {
  const { getDealsForDealer, markDealFinalized } = useAuth()
  const deals = getDealsForDealer()

  return (
    <section style={{padding:24}}>
      <h2>Solicitudes y reservas</h2>
      <p>Gestiona las solicitudes de compra y alquiler recibidas a través de tu perfil.</p>
      {deals.length === 0 ? (
        <p style={{color:'#94a3b8',marginTop:16}}>No tienes solicitudes nuevas en este momento.</p>
      ) : (
        <div style={{display:'grid',gap:14,marginTop:16}}>
          {deals.map(deal => (
            <article key={deal.id} style={{padding:18,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{margin:0,fontWeight:700,color:'#f8fafc'}}>{deal.carTitle}</p>
              <p style={{margin:'8px 0 0',color:'#94a3b8'}}>Cliente: {deal.buyerEmail}</p>
              <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Tipo: {deal.type === 'sale' ? 'Compra' : 'Alquiler'}</p>
              <p style={{margin:'4px 0 0',color:'#94a3b8'}}>Estado: {deal.status}</p>
              {deal.status === 'proceso' ? (
                <button onClick={() => markDealFinalized(deal.id)} style={{marginTop:12,padding:'10px 14px',borderRadius:10,background:'#10b981',border:'none',color:'#020617',fontWeight:700,cursor:'pointer'}}>Marcar como finalizado</button>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
