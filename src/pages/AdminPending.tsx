import React from 'react'

export default function AdminPending() {
  return (
    <section style={{padding:24}}>
      <h2>Publicaciones pendientes</h2>
      <p>Revisa las nuevas publicaciones que requieren aprobación.</p>
      <article style={{marginTop:20,padding:18,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
        <p style={{margin:0,color:'#94a3b8'}}>No hay publicaciones pendientes por revisar en este momento.</p>
      </article>
    </section>
  )
}
