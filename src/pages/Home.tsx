import React from 'react'
import { Link } from 'react-router-dom'

const dashboardCards = [
  {
    title: 'Ventas activas',
    value: '18',
    description: 'Vehículos listados en marketplace.'
  },
  {
    title: 'Reservas hoy',
    value: '12',
    description: 'Solicitudes de prueba y alquileres.'
  },
  {
    title: 'Puntos de retiro',
    value: '5',
    description: 'Ubicaciones disponibles en el mapa.'
  },
  {
    title: 'Usuarios registrados',
    value: '3',
    description: 'Accede con las cuentas de prueba abajo.'
  }
]

const sampleUsers = [
  { role: 'admin', email: 'admin@drivepoint.test', password: 'Admin1234!' },
  { role: 'dealer', email: 'dealer@drivepoint.test', password: 'Dealer1234!' },
  { role: 'user', email: 'user@drivepoint.test', password: 'User1234!' }
]

export default function Home() {
  return (
    <section style={{ padding: 24 }}>
      <header style={{ display: 'grid', gap: 18, maxWidth: 980, margin: '0 auto 24px' }}>
        <div>
          <p style={{ color: '#10b981', fontWeight: 700, margin: 0 }}>DrivePoint</p>
          <h1 style={{ fontSize: 44, margin: '12px 0 0' }}>Administración de ventas, rentas y pickups</h1>
          <p style={{ color: '#cbd5e1', fontSize: 18, margin: '18px 0 0', lineHeight: 1.75 }}>
            Controla tus roles, gestiona inventario y revisa puntos de retiro desde un solo panel. Usa las cuentas de prueba para explorar el flujo de administrador, concesionaria y usuario.
          </p>
          <p style={{ marginTop: 14, color: '#94a3b8' }}>
            Usa los botones de la cabecera para iniciar sesión o registrarte. El contenido de esta página es una vista general del dashboard.
          </p>
        </div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16, marginBottom: 24 }}>
        {dashboardCards.map(card => (
          <article key={card.title} style={{ padding: 22, borderRadius: 18, background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>{card.title}</p>
            <p style={{ margin: '14px 0 0', fontSize: 34, fontWeight: 700 }}>{card.value}</p>
            <p style={{ margin: '10px 0 0', color: '#cbd5e1', fontSize: 14 }}>{card.description}</p>
          </article>
        ))}
      </section>

      <section style={{ display: 'grid', gap: 20, maxWidth: 980, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <article style={{ padding: 24, borderRadius: 20, background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ margin: 0 }}>Resumen rápido</h2>
            <p style={{ marginTop: 12, color: '#cbd5e1' }}>
              Explora distintas secciones con las cuentas de prueba. Puedes acceder a rutas separadas para el administrador, la concesionaria y el usuario final.
            </p>
            <ul style={{ marginTop: 18, paddingLeft: 18, color: '#cbd5e1' }}>
              <li>Administración completa de usuarios y roles.</li>
              <li>Marketplace de vehículos para compra/venta.</li>
              <li>Rutas de alquiler y puntos de retiro en el mapa.</li>
              <li>Dashboard específico por rol con acceso protegido.</li>
            </ul>
          </article>
          <article style={{ padding: 24, borderRadius: 20, background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ margin: 0 }}>Cuentas de prueba</h2>
            <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
              {sampleUsers.map(user => (
                <div key={user.email} style={{ padding: 16, borderRadius: 16, background: '#111827' }}>
                  <p style={{ margin: 0, color: '#cbd5e1', fontWeight: 700 }}>{user.role.toUpperCase()}</p>
                  <p style={{ margin: '8px 0 0', color: '#f8fafc' }}>Email: {user.email}</p>
                  <p style={{ margin: '4px 0 0', color: '#f8fafc' }}>Password: {user.password}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article style={{ padding: 24, borderRadius: 20, background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ margin: 0 }}>Acceso rápido</h2>
          <p style={{ marginTop: 12, color: '#cbd5e1' }}>
            Usa los datos de la sección de cuentas de prueba y ve a la cabecera para iniciar sesión o registrarte.
          </p>
        </article>
      </section>
    </section>
  )
}
