import React, { useState } from 'react'
import { Role } from '../types'
import { useUsers } from '../hooks/useUsers'

export default function AdminUsers(){
  const { users, addUser } = useUsers()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('user')

  const save = () => {
    addUser({ 
      id: Math.random().toString(36).slice(2), 
      name, 
      email, 
      role,
      password: 'User1234!' // Default password for new users
    })
    setName(''); setEmail('')
  }

  return (
    <section style={{padding:24}}>
      <h2>Crear perfil de usuario</h2>
      <div style={{display:'flex',gap:8,marginTop:16,flexWrap:'wrap'}}>
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}} />
        <select value={role} onChange={e=>setRole(e.target.value as Role)} style={{padding:12,borderRadius:8,background:'#071028',border:'1px solid #334155',color:'#fff'}}>
          <option value="user">Usuario</option>
          <option value="dealer">Concesionaria</option>
          <option value="admin">Administrador</option>
        </select>
        <button onClick={save} style={{padding:'12px 24px',background:'#10b981',color:'#020617',borderRadius:10,fontWeight:700,border:'none',cursor:'pointer'}}>Crear</button>
      </div>

      <h3 style={{marginTop:32}}>Usuarios existentes</h3>
      <div style={{display:'grid',gap:12,marginTop:16}}>
        {users.map(u => (
          <article key={u.id} style={{padding:16,background:'#0f172a',borderRadius:12,border:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{margin:0,color:'#f8fafc',fontWeight:700}}>{u.name}</p>
            <p style={{margin:'4px 0 0',color:'#94a3b8'}}>{u.email} — {u.role}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
