import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Header(){
  const { user, logout } = useAuth()

  const menuItems = !user ? [] : user.role === 'admin' ? [
    { label: 'Dashboard', to: '/admin' },
    { label: 'Usuarios', to: '/admin/users' },
    { label: 'Vehículos', to: '/admin/vehicles' },
    { label: 'Publicaciones pendientes', to: '/admin/pending' },
    { label: 'Reportes', to: '/admin/reports' },
    { label: 'Configuración', to: '/admin/settings' }
  ] : user.role === 'dealer' ? [
    { label: 'Inicio', to: '/dealer' },
    { label: 'Publicar vehículo', to: '/dealer/publish' },
    { label: 'Mis publicaciones', to: '/dealer/publications' },
    { label: 'Solicitudes o reservas', to: '/dealer/requests' },
    { label: 'Estadísticas', to: '/dealer/stats' },
    { label: 'Mi perfil', to: '/dealer/profile' }
  ] : [
    { label: 'Inicio', to: '/marketplace' },
    { label: 'Marketplace', to: '/marketplace' },
    { label: 'Rentas', to: '/rentals' },
    { label: 'Favoritos', to: '/favorites' },
    { label: 'Mis reservas', to: '/reservations' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Mapa', to: '/map' }
  ]

  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:16,background:'#0b1220',color:'#fff',flexWrap:'wrap',gap:12}}>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to='/' style={{color:'#10b981',fontWeight:700,textDecoration:'none'}}>DrivePoint</Link>
        {menuItems.map(item => (
          <Link key={item.to} to={item.to} style={{color:'#94a3b8',textDecoration:'none',padding:'8px 12px',borderRadius:8,background:'#0f172a'}}>{item.label}</Link>
        ))}
      </div>
      <nav style={{display:'flex',gap:12,alignItems:'center'}}>
        {!user ? (
          <>
            <Link
              to="/login"
              style={{padding:'10px 18px', borderRadius:999, background:'#0f172a', color:'#94a3b8', textDecoration:'none', fontWeight:700, border:'1px solid rgba(255,255,255,0.08)'}}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{padding:'10px 18px', borderRadius:999, background:'#10b981', color:'#020617', textDecoration:'none', fontWeight:700}}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to={user.role === 'admin' ? '/admin' : user.role === 'dealer' ? '/dealer' : '/marketplace'} style={{color:'#94a3b8',textDecoration:'none',fontWeight:700}}>{user.name}</Link>
            <button onClick={logout} style={{padding:'8px 12px',borderRadius:8,background:'#111827',color:'#cbd5e1',border:'none',cursor:'pointer'}}>Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}
