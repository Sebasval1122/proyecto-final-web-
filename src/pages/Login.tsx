import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin'|'dealer'|'user'>('user')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password) {
      setMessage('Por favor completa los campos.')
      return
    }

    login(email, password, role)
      .then(() => {
        setMessage('Inicio de sesión exitoso.')
        const destination = role === 'admin' ? '/admin' : role === 'dealer' ? '/dealer' : '/marketplace'
        setTimeout(() => navigate(destination), 700)
      })
      .catch((err: unknown) => setMessage(String(err)))
  }

  return (
    <section style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      <p>Ingresa tus credenciales para continuar en DrivePoint.</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14, marginTop: 24 }}>
        <label style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@drivepoint.com"
            style={{ padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            style={{ padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
          Rol
          <select value={role} onChange={(e) => setRole(e.target.value as any)} style={{padding:10,borderRadius:8}}>
            <option value="user">Usuario</option>
            <option value="dealer">Concesionaria</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <button
          type="submit"
          style={{ padding: '12px 18px', borderRadius: 8, background: '#10b981', color: '#020617', border: 'none', fontWeight: 700, cursor: 'pointer' }}
        >
          Entrar
        </button>
        {message ? <p style={{ color: '#a5b4fc' }}>{message}</p> : null}
      </form>
    </section>
  )
}
