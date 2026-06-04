import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'dealer'|'user'>('user')
  const [message, setMessage] = useState('')
  const { register } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(name, email, password, role)
    } catch (err) {
      setMessage(String(err))
    }
  }

  return (
    <section style={{maxWidth:400,margin:'80px auto',padding:32,background:'#0f172a',borderRadius:24,border:'1px solid rgba(255,255,255,0.08)'}}>
      <h1 style={{margin:0,fontSize:32,textAlign:'center'}}>Crear cuenta</h1>
      <p style={{textAlign:'center',color:'#94a3b8',marginTop:12}}>Únete a la red de DrivePoint</p>
      
      <form onSubmit={handleRegister} style={{display:'grid',gap:16,marginTop:32}}>
        <div style={{display:'grid',gap:8}}>
          <label style={{color:'#cbd5e1',fontSize:14}}>Nombre completo</label>
          <input value={name} onChange={e => setName(e.target.value)} required style={{padding:12,borderRadius:12,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
        </div>
        <div style={{display:'grid',gap:8}}>
          <label style={{color:'#cbd5e1',fontSize:14}}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{padding:12,borderRadius:12,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
        </div>
        <div style={{display:'grid',gap:8}}>
          <label style={{color:'#cbd5e1',fontSize:14}}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{padding:12,borderRadius:12,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
        </div>
        <div style={{display:'grid',gap:8}}>
          <label style={{color:'#cbd5e1',fontSize:14}}>Tipo de cuenta</label>
          <select value={role} onChange={e => setRole(e.target.value as any)} style={{padding:12,borderRadius:12,background:'#071028',border:'1px solid #334155',color:'#fff'}}>
            <option value="user">Usuario</option>
            <option value="dealer">Concesionaria</option>
          </select>
        </div>
        <button type="submit" style={{marginTop:8,padding:14,borderRadius:12,background:'#10b981',color:'#020617',fontWeight:700,border:'none',cursor:'pointer'}}>Registrarse</button>
      </form>
      {message && <p style={{marginTop:16,color:'#f87171',textAlign:'center'}}>{message}</p>}
      <p style={{marginTop:24,textAlign:'center',color:'#94a3b8'}}>¿Ya tienes cuenta? <Link to="/login" style={{color:'#10b981',textDecoration:'none',fontWeight:700}}>Inicia sesión</Link></p>
    </section>
  )
}
