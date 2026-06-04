import React, { useState, useEffect } from 'react'
import { UserProfile, Role } from '../types'

export default function AdminUsers(){
  const [list, setList] = useState<UserProfile[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('user')

  useEffect(() => {
    const raw = localStorage.getItem('drivepoint_users')
    if (raw) setList(JSON.parse(raw))
  }, [])

  const save = () => {
    const newUser: UserProfile = { id: Math.random().toString(36).slice(2), name, email, role }
    const updated = [...list, newUser]
    localStorage.setItem('drivepoint_users', JSON.stringify(updated))
    setList(updated)
    setName(''); setEmail('')
  }

  return (
    <div style={{display:'grid',gap:12}}>
      <h2>Crear perfil de usuario</h2>
      <div style={{display:'flex',gap:8}}>
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,borderRadius:6}} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:8,borderRadius:6}} />
        <select value={role} onChange={e=>setRole(e.target.value as Role)} style={{padding:8,borderRadius:6}}>
          <option value="user">Usuario</option>
          <option value="dealer">Concesionaria</option>
          <option value="admin">Administrador</option>
        </select>
        <button onClick={save} style={{padding:'8px 12px',background:'#10b981',color:'#020617',borderRadius:6}}>Crear</button>
      </div>

      <h3 style={{marginTop:12}}>Usuarios existentes</h3>
      <ul>
        {list.map(u => (
          <li key={u.id}>{u.name} — {u.email} — {u.role}</li>
        ))}
      </ul>
    </div>
  )
}
