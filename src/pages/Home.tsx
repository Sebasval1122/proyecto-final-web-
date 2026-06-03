import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section style={{ padding: 24 }}>
      <div style={{ background: '#fff', color: '#000', borderRadius: 12, padding: 32, minHeight: 300 }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>DEBUG — DrivePoint</h1>
        <p style={{ fontSize: 20, marginTop: 12 }}>Si ves este panel, React está montando correctamente. Si la pantalla sigue en negro, revisa la consola del navegador para errores.</p>
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <Link to="/login" style={{ padding: '10px 14px', background: '#10b981', color: '#020617', borderRadius: 8, textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ padding: '10px 14px', background: '#111827', color: '#cbd5e1', borderRadius: 8, textDecoration: 'none' }}>Register</Link>
          <Link to="/map" style={{ padding: '10px 14px', background: '#0b1220', color: '#cbd5e1', borderRadius: 8, textDecoration: 'none' }}>Mapa</Link>
        </div>
      </div>
    </section>
  )
}
