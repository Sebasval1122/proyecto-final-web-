import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function DealerProfile() {
  const { user } = useAuth()

  return (
    <section style={{padding:24}}>
      <h2>Mi perfil</h2>
      <p>Revisa tu información de concesionaria y datos de contacto.</p>
      <div style={{marginTop:20,padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
        <p style={{margin:0,color:'#94a3b8'}}>Nombre</p>
        <p style={{margin:'6px 0 0',fontWeight:700,color:'#f8fafc'}}>{user?.name || 'Concesionaria'}</p>
        <p style={{margin:'12px 0 0',color:'#94a3b8'}}>Email</p>
        <p style={{margin:'6px 0 0',fontWeight:700,color:'#f8fafc'}}>{user?.email || 'No registrado'}</p>
        <p style={{margin:'12px 0 0',color:'#94a3b8'}}>Rol</p>
        <p style={{margin:'6px 0 0',fontWeight:700,color:'#f8fafc'}}>{user?.role}</p>
      </div>
    </section>
  )
}
