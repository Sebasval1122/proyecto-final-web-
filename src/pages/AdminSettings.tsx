import React from 'react'

export default function AdminSettings() {
  return (
    <section style={{padding:24}}>
      <h2>Configuración</h2>
      <p>Administra las opciones generales y preferencias de la plataforma.</p>
      <div style={{marginTop:20,padding:20,background:'#0f172a',borderRadius:16,border:'1px solid rgba(255,255,255,0.08)'}}>
        <p style={{margin:0,color:'#94a3b8'}}>Modo de mantenimiento</p>
        <p style={{margin:'8px 0 0',color:'#cbd5e1'}}>Configura políticas, permisos y ajustes de la aplicación desde aquí.</p>
      </div>
    </section>
  )
}
