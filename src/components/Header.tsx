import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:16,background:'#0b1220',color:'#fff'}}>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/" style={{color:'#10b981',fontWeight:700,textDecoration:'none'}}>DrivePoint</Link>
      </div>
      <nav style={{display:'flex',gap:12}}>
        <Link to="/marketplace" style={{color:'#94a3b8',textDecoration:'none'}}>Marketplace</Link>
        <Link to="/rentals" style={{color:'#94a3b8',textDecoration:'none'}}>Alquileres</Link>
      </nav>
    </header>
  )
}
