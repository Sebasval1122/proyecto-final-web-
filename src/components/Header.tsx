import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useAuth()
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:16,background:'#0b1220',color:'#fff'}}>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/" style={{color:'#10b981',fontWeight:700,textDecoration:'none'}}>DrivePoint</Link>
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
            <Link to={user.role === 'admin' ? '/admin' : user.role === 'dealer' ? '/dealer' : '/account'} style={{color:'#94a3b8',textDecoration:'none'}}>{user.name}</Link>
            <button onClick={logout} style={{padding:'8px 12px',borderRadius:8,background:'#111827',color:'#cbd5e1',border:'none'}}>Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}
